'use client';

import React, { useEffect, useState } from 'react';

import { Link as LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon
} from 'react-share';
import { toast } from 'sonner';

interface ArticleShareBarProps {
    categoryName?: string;
    title?: string;
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({ categoryName, title }) => {
    const [shareUrl, setShareUrl] = useState('');
    const t = useTranslations('news');

    useEffect(() => {
        setShareUrl(window.location.href);
    }, []);

    const handleCopy = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link successfully copied to clipboard');
        }
    };

    return (
        <div className='flex w-full flex-col items-start justify-between gap-4 border-y border-dashed py-5 md:flex-row md:items-center'>
            {/* Category Name */}
            <h3 className='text-secondary-300 font-bold uppercase'>{categoryName || 'General'}</h3>

            <div className='flex items-center gap-4'>
                <p className='text-primary-900 text-sm md:text-base'>{t('content.article_share')}</p>

                <div className='flex items-center gap-2' role='group' aria-label='Share this article'>
                    {/* Facebook */}
                    <FacebookShareButton url={shareUrl} title={title}>
                        <FacebookIcon size={32} round aria-hidden='true' />
                        <span className='sr-only'>Share on Facebook</span>
                    </FacebookShareButton>

                    {/* Twitter / X */}
                    <TwitterShareButton url={shareUrl} title={title}>
                        <XIcon size={32} round aria-hidden='true' />
                        <span className='sr-only'>Share on X (Twitter)</span>
                    </TwitterShareButton>

                    {/* Whatsapp */}
                    <WhatsappShareButton url={shareUrl} title={title} separator=':: '>
                        <WhatsappIcon size={32} round aria-hidden='true' />
                        <span className='sr-only'>Share on WhatsApp</span>
                    </WhatsappShareButton>

                    {/* Copy Link */}
                    <button
                        type='button'
                        className='focus-visible:ring-primary-500 cursor-pointer rounded-full bg-gray-200 p-2 transition-all outline-none hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-offset-2'
                        onClick={handleCopy}
                        title='Copy Link'>
                        <LinkIcon className='h-4 w-4 text-slate-600' aria-hidden='true' />
                        <span className='sr-only'>Copy link to clipboard</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
