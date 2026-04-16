import React from 'react';

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
                    p: ({ children }) => {
                        const hasPreviewer = React.Children.toArray(children).some((child) => {
                            if (React.isValidElement(child)) {
                                const props = child.props as { href?: string };
                                return props.href?.toLowerCase().endsWith('.pdf');
                            }
                            return false;
                        });

                        return hasPreviewer ? <div className='mb-4'>{children}</div> : <p>{children}</p>;
                    },
                    a: ({ href, children }) => {
                        return (
                            <a href={href} target='_blank' rel='noopener noreferrer'>
                                {children}
                            </a>
                        );
                    }
                }}>
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default CardContent;
