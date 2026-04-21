import { cn } from '@/lib/utils';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const CardContent = ({ content, className = 'line-clamp-2' }: { content: string; className?: string }) => {
    return (
        <article className={cn('prose prose-slate xl:prose-base max-w-none', className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    img: () => null,

                    a: ({ href, children }) => {
                        const isPdf = href?.toLowerCase().endsWith('.pdf');

                        if (isPdf) {
                            return null;
                        }

                        return (
                            <a href={href} target='_blank' rel='noopener noreferrer'>
                                {children}
                            </a>
                        );
                    },

                    p: ({ children }) => {
                        return <p>{children}</p>;
                    }
                }}>
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default CardContent;
