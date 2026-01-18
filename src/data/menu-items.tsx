import { Banknote, ChartLine } from 'lucide-react';

export const menuItems = [
    {
        text: 'Dashboard Neraca',
        url: '/',
        icon: <ChartLine className='h-5 w-5' />
    },
    {
        text: 'Dashboard Harga',
        url: '/price-table',
        icon: <Banknote className='h-5 w-5' />
    }
];
