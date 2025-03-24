"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { 
    orderId: string;
  };
}

export default function DonationSuccessRedirect({ params }: PageProps) {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the proper success page with the order_id as a query parameter
    router.replace(`/main/donate/success?order_id=${params.orderId}`);
  }, [params.orderId, router]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-lg">Processing your donation...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we redirect you.</p>
      </div>
    </div>
  );
} 