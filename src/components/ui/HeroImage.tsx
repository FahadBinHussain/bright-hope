"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";

type HeroImageProps = {
  src: string;
  alt: string;
  height?: string;
  fallbackSrc?: string;
  children?: ReactNode;
};

export default function HeroImage({ 
  src, 
  alt, 
  height = "h-[400px]", 
  fallbackSrc = "/images/hero/home-hero.jpg",
  children 
}: HeroImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className={`relative w-full ${height} overflow-hidden bg-gray-900`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError ? (
        <>
          {fallbackSrc ? (
            <>
              <Image
                src={fallbackSrc}
                alt={alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                onError={() => {
                  console.error(`Failed to load fallback image: ${fallbackSrc}`);
                  // If even the fallback fails, show the error message
                  setHasError(true);
                }}
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="absolute inset-0">{children}</div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-lg">Image not available</p>
              <div className="absolute inset-0 bg-black/70" />
              <div className="absolute inset-0">{children}</div>
            </div>
          )}
        </>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            quality={90}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              console.error(`Failed to load image: ${src}`);
              setIsLoading(false);
              setHasError(true);
            }}
          />
          
          {/* Only show overlay and content when image is loaded or if there's an error */}
          {(!isLoading || hasError) && (
            <>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0">{children}</div>
            </>
          )}
        </>
      )}
    </div>
  );
} 