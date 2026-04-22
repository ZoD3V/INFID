import { Attachment } from '@/types/posts';

import {  Paperclip } from 'lucide-react';
import { useLocale } from 'next-intl';

const AttachmentList = ({ attachments }: { attachments: Attachment[] }) => {
    const locale = useLocale();
    const getFileName = (path: string) => {
        return path.split('/').pop();
    };

    if (!attachments || attachments.length === 0) {
        return;
    }

    return (
        <div className='flex flex-col gap-4 pt-4'>
            <h2 className='text-base font-bold text-slate-900'>
                {locale === 'id' ? 'Lampiran terkait' : 'Related attachments'}
            </h2>

            <ul className='space-y-4'>
                {attachments.map((file) => (
                    <li key={file.id} className='group flex items-center'>
                        <Paperclip className='text-primary-500 mr-2 h-5 w-5 shrink-0' />

                        <a
                            href={file.file_path}
                            download
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-sm font-medium text-slate-900 underline decoration-1 underline-offset-4 transition-colors hover:text-primary-500'>
                            {getFileName(file.file_path)}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttachmentList;
