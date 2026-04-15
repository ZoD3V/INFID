'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { ArrowRight, Loader2, Mail, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const STORAGE_KEY = 'home-floating-card-closed';

export default function HomeFloatingCard() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOnHomePage, setIsOnHomePage] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations('home-floating');
    const p = useTranslations('placeholder');
    const b = useTranslations('button');

    useEffect(() => {
        setIsMounted(true);
        if (!pathname) return;

        const segments = pathname.split('/').filter(Boolean);

        const isLocalizedHome = segments.length === 1;
        if (isLocalizedHome) {
            setIsOnHomePage(true);
            return;
        } else {
            setIsOnHomePage(false);
        }
    }, [pathname]);

    const handleToggle = (state: boolean) => {
        setIsVisible(state);
        if (!state) {
            localStorage.setItem(STORAGE_KEY, 'true');
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const API_KEY = process.env.NEXT_MAILCHIMP_API_KEY;
        const LIST_ID = process.env.NEXT_MAILCHIMP_LIST_ID;
        const DATACENTER = process.env.NEXT_MAILCHIMP_DATACENTER;

        try {
            const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${btoa(`user:${API_KEY}`)}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'subscribed'
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Success subscribe!');
                handleToggle(false);
                setEmail('');
            } else {
                console.error('Mailchimp Error:', data);
            }
        } catch (err) {
            console.error('Network Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isMounted) return null;

    return (
        <>
            {isOnHomePage && (
                <div className='fixed right-5.5 bottom-20 z-50' aria-label='Subscription Newsletter button'>
                    {isVisible ? (
                        <div
                            className={cn(
                                'w-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl',
                                'animate-in fade-in zoom-in duration-300'
                            )}>
                            {/* Close Button */}
                            <button
                                onClick={() => handleToggle(false)}
                                aria-label='Close button'
                                className='absolute top-3 right-3 p-2 text-slate-400 transition-colors hover:text-slate-600'>
                                <X size={20} />
                            </button>

                            <div className='mb-4 flex justify-center pt-8'>
                                <img
                                    src='/logo/logo-floating-card.png'
                                    alt='Logo'
                                    className='h-10 w-auto object-contain'
                                />
                            </div>

                            <p className='text-primary-900 mb-6 text-center text-sm font-semibold'>{t('home')}</p>

                            <form className='flex w-full flex-col items-center gap-3' onSubmit={onSubmit}>
                                <Input
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={p('insertEmail')}
                                    className='rounded-full border-slate-200 bg-slate-50'
                                    disabled={isLoading}
                                />
                                <Button
                                    type='submit'
                                    size='sm'
                                    variant='secondary'
                                    className='w-full rounded-full'
                                    disabled={isLoading}>
                                    {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : b('subscribe')}
                                    {!isLoading && <ArrowRight className='ml-2 h-4 w-4' />}
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleToggle(true)}
                            className={cn(
                                'bg-primary flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-95',
                                'animate-in fade-in slide-in-from-bottom-4'
                            )}>
                            <Mail className='text-white' size={24} />
                            {/* Dot Notifikasi (Opsional) */}
                            {/* <span className='absolute top-0 right-0 flex h-3 w-3'>
                                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                                <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
                            </span> */}
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
