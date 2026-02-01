'use client';

import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        (window as any).ACCESSIBILITY_WIDGET_CONFIG = {
            widgetPosition: {
                side: 'left',
                left: '25px',
                bottom: '25px'
            },
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
