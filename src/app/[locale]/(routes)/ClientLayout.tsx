'use client';

import { useEffect } from 'react';

import Footer from '@/components/common/footer';
import LanguageSwitcher from '@/components/common/language-switcher';
import { Navbar } from '@/components/common/navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        (window as any).ACCESSIBILITY_WIDGET_CONFIG = {
            widgetPosition: {
                side: 'left',
                left: '25px',
                bottom: '25px'
            },
            // ===== Button Styling =====
            button: {
                size: '40px',
                borderRadius: '100px',
                iconSize: '40px'
            }
        };

        import('accessibility-widgets/widget.js');
    }, []);

    return <>{children}</>;
}
