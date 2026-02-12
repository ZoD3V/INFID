'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { ArrowRight, X } from 'lucide-react';

const STORAGE_KEY = 'home-floating-card-closed';

export default function HomeFloatingCard() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!pathname) return;

        const segments = pathname.split('/').filter(Boolean);

        const isLocalizedHome = segments.length === 1;

        if (!isLocalizedHome) {
            setIsVisible(false); // ✅ IMPORTANT FIX
            return;
        }

        const isClosed = localStorage.getItem(STORAGE_KEY);

        if (!isClosed) {
            setIsVisible(true);
        }
    }, [pathname]);

    if (!isVisible) return null;

    const handleClose = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsVisible(false);
    };

    return (
        <div
            className={cn(
                'fixed right-4 bottom-6 z-50',
                'w-80 rounded-lg border border-slate-200 bg-white shadow-lg',
                'p-6'
            )}>
            {/* Close Button */}
            <button onClick={handleClose} className='text-primary-900 absolute top-3 right-3 p-3' aria-label='Close'>
                <X size={22} />
            </button>

            {/* Logo Center */}
            <div className='mb-4 flex justify-center pt-12'>
                <img src='/logo/logo-floating-card.png' alt='Logo' className='h-10 w-auto object-contain' />
            </div>

            <p className='text-primary-900 mb-4 text-center text-sm font-semibold'>
                Stay update with our latest news and get involved!
            </p>

            <form className='flex w-full flex-col items-center gap-3' onSubmit={(e) => e.preventDefault()}>
                <Input
                    type='email'
                    placeholder='Masukan Email Kamu'
                    className='rounded-full border-slate-200 bg-slate-50 text-sm text-white placeholder:text-slate-500'
                />

                <Button type='submit' size='sm' variant='secondary' className='w-full rounded-full'>
                    Berlangganan
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </form>
        </div>
    );
}
