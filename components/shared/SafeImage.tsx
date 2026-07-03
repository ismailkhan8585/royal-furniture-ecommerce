'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { FALLBACK_IMAGE } from '@/lib/media';

type SafeImageProps = Omit<ImageProps, 'src' | 'alt' | 'onError'> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: SafeImageProps) {
  const normalizedSrc = src && src.trim().length > 0 ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
  }, [normalizedSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
