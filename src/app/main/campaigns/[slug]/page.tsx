"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

// Image component with error handling
function CampaignHeroImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="relative h-[400px] w-full bg-gray-700">
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
          {hasError ? 
            <p className="text-gray-300">Image not available</p> :
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          }
        </div>
      )}
      <Image
        src={hasError ? "/images/placeholder.svg" : src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}

// Temporary data for the campaign - using placeholder image
const campaign = {
  id: "1",
  slug: "clean-water-initiative",
  title: "Clean Water Initiative",
  description:
    "Help us provide clean water to communities in need. Your donation can save lives.",
  image: "/images/placeholder.svg",
  goal: 50000,
  raised: 32500,
  daysLeft: 15,
  story: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
  `,
};

export default function CampaignPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <Suspense fallback={<div className="h-[400px] w-full bg-gray-700 animate-pulse"></div>}>
          <CampaignHeroImage src={campaign.image} alt={campaign.title} />
        </Suspense>
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-3xl">
              <Link
                href="/main/campaigns"
                className="inline-flex items-center text-white/80 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Campaigns
              </Link>
              <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{campaign.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    ${campaign.raised.toLocaleString()} raised of $
                    {campaign.goal.toLocaleString()}
                  </span>
                  <span>
                    {Math.round((campaign.raised / campaign.goal) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{
                      width: `${Math.min(
                        (campaign.raised / campaign.goal) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-white/80">
                  {campaign.daysLeft} days left
                </span>
                <Button size="lg" asChild>
                  <Link href="/main/donate">Donate Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Story */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: campaign.story }}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 