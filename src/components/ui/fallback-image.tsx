"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type FallbackImageProps = ImageProps & {
  fallbackText?: string;
};

export default function FallbackImage({
  fallbackText,
  alt,
  ...props
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  return (
    <>
      {error ? (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">{fallbackText || alt}</span>
        </div>
      ) : (
        <Image
          alt={alt}
          {...props}
          onError={() => setError(true)}
        />
      )}
    </>
  );
} 