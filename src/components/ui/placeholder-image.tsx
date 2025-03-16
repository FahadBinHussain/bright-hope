"use client";

import { cn } from "@/lib/utils";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PlaceholderImage({
  alt,
  width = 400,
  height = 300,
  className,
  ...props
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {alt}
    </div>
  );
} 