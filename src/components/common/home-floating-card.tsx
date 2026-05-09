'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeAction } from '@/hooks/subscribe';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import SubmitButton from './submit-button';
import { Mail, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

const STORAGE_KEY = 'home-floating-card-closed';

export default function HomeFloatingCard() {
    const locale = useLocale();
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

    async function handleAction(formData: FormData) {
        setIsLoading(true);
        const result = await subscribeAction(formData);

        if (result?.error) {
            toast.success(result.error);
        } else {
            toast.success('Success Subscribe');
        }
        setIsLoading(false);
    }

    if (!isMounted) return null;

    return (
        <>
            {isOnHomePage && (
                <aside className='fixed right-5.5 bottom-20 z-50' aria-label='Subscription Newsletter'>
                    {isVisible ? (
                        <div
                            role='dialog'
                            aria-modal='false'
                            aria-labelledby='newsletter-title'
                            className={cn(
                                'w-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl',
                                'animate-in fade-in zoom-in duration-300'
                            )}>
                            {/* Close Button */}
                            <button
                                onClick={() => handleToggle(false)}
                                aria-label='Close subscription card'
                                className='focus-visible:ring-primary-500 absolute top-3 right-3 rounded-full p-2 text-slate-400 transition-colors outline-none hover:text-slate-600 focus-visible:ring-2'>
                                <X size={20} aria-hidden='true' />
                                <span className='sr-only'>
                                    {locale == 'id' ? 'Tutup dialog langganan' : 'Close subscription dialog'}
                                </span>
                            </button>

                            <div className='mb-4 flex justify-center pt-8'>
                                <img
                                    src='/logo/logo-floating-card.png'
                                    alt=''
                                    aria-hidden='true'
                                    className='h-10 w-auto object-contain'
                                />
                            </div>

                            <p
                                id='newsletter-title'
                                className='text-primary-900 mb-6 text-center text-sm font-semibold'>
                                {t('home')}
                            </p>

                            <form className='flex w-full flex-col items-center gap-3' action={handleAction}>
                                <div className='w-full'>
                                    <VisuallyHidden>
                                        <label htmlFor='newsletter-email'>Email Address</label>
                                    </VisuallyHidden>
                                    <Input
                                        id='newsletter-email'
                                        name='email'
                                        type='email'
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={p('insertEmail')}
                                        className='rounded-full border-slate-200 bg-slate-50'
                                        disabled={isLoading}
                                    />
                                </div>

                                <SubmitButton
                                    label={b('subscribe')}
                                    className='group focus-visible:text-primary-900 underline-offset-2 focus-visible:bg-blue-100 focus-visible:underline'
                                />
                            </form>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleToggle(true)}
                            aria-label='Open newsletter subscription'
                            aria-expanded='false'
                            className={cn(
                                'bg-primary focus-visible:ring-primary-500 flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95',
                                'animate-in fade-in slide-in-from-bottom-4'
                            )}>
                            <Mail className='text-white' size={24} aria-hidden='true' />
                            <span className='sr-only'>
                                {locale === 'id' ? 'Buka dialog langganan' : 'Open newsletter subscription'}
                            </span>
                        </button>
                    )}
                </aside>
            )}
        </>
    );
}
