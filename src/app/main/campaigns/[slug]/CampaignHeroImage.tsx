"use client";

import Image from "next/image";
import { useState } from "react";

export default function CampaignHeroImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Determine image path - if it already starts with slash, use it directly
  // Otherwise, assume it's a filename and add the path prefix
  const imagePath = src.startsWith('/') 
    ? src 
    : `/images/campaigns/${src}`;

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-600">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError ? (
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
          <p className="text-lg">Campaign image not available</p>
        </div>
      ) : (
        <Image
          src={imagePath}
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
            console.error(`Failed to load image: ${imagePath}`);
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
} 