'use client';

import { useEffect, useState } from 'react';

import Image, { ImageProps } from 'next/image';

type PlaceholderType = 'square' | 'portrait' | 'landscape';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
    src: string | null | undefined;
    placeholderType?: PlaceholderType;
}

const OptimizedImage = ({
    src,
    alt,
    placeholderType = 'square',
    className,
    fill = true,
    ...props
}: OptimizedImageProps) => {
    const placeholders: Record<PlaceholderType, string> = {
        square: '/images/placeholder-square.png',
        portrait: '/images/placeholder-potrait.png',
        landscape: '/images/placeholder-landscape.png'
    };

    const fallback = placeholders[placeholderType];

    const [currentSrc, setCurrentSrc] = useState(src || fallback);

    useEffect(() => {
        if (src) {
            setCurrentSrc(src);
        } else {
            setCurrentSrc(fallback);
        }
    }, [src, fallback]);

    return (
        <Image
            {...props}
            src={currentSrc && currentSrc.trim() !== '' ? currentSrc : fallback}
            alt={alt || 'Image'}
            fill={fill}
            className={className}
            onError={() => {
                if (currentSrc !== fallback) {
                    setCurrentSrc(fallback);
                }
            }}
            placeholder={props.blurDataURL ? 'blur' : 'empty'}
        />
    );
};

export default OptimizedImage;
