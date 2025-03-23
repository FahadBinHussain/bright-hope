"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Suspense, useState } from "react";

// Image components with event handlers need to be Client Components
function CampaignImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="relative h-48 bg-gray-200">
      {(isLoading || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {hasError ? 
            <p className="text-gray-500">Image not available</p> :
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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

// Reduced static campaign data - using local images instead of remote Unsplash URLs
const campaigns = [
  {
    id: "1",
    slug: "clean-water-initiative",
    title: "Clean Water Initiative",
    description:
      "Help us provide clean water to communities in need. Your donation can save lives and improve health outcomes for thousands of people.",
    image: "/images/placeholder.svg",
    category: "Health",
    goal: 50000,
    raised: 32500,
    daysLeft: 15,
  },
  {
    id: "2",
    slug: "education-for-all",
    title: "Education for All",
    description:
      "Support our mission to bring quality education to underprivileged children around the world. Education is the key to breaking the cycle of poverty.",
    image: "/images/placeholder.svg",
    category: "Education",
    goal: 75000,
    raised: 45000,
    daysLeft: 30,
  },
  {
    id: "3",
    slug: "healthcare-access",
    title: "Healthcare Access",
    description:
      "Join us in providing essential healthcare services to remote communities. We&apos;re building clinics and training local healthcare workers.",
    image: "/images/placeholder.svg",
    category: "Health",
    goal: 100000,
    raised: 68000,
    daysLeft: 45,
  },
  {
    id: "4",
    slug: "sustainable-agriculture",
    title: "Sustainable Agriculture",
    description:
      "Help farmers in developing regions implement sustainable farming practices that increase yields while protecting the environment.",
    image: "/images/placeholder.svg",
    category: "Environment",
    goal: 60000,
    raised: 28000,
    daysLeft: 60,
  },
  {
    id: "5",
    slug: "womens-empowerment",
    title: "Women&apos;s Empowerment",
    description:
      "Support programs that provide women with skills training, microloans, and resources to start businesses and achieve financial independence.",
    image: "/images/placeholder.svg",
    category: "Social Justice",
    goal: 80000,
    raised: 52000,
    daysLeft: 25,
  },
  {
    id: "6",
    slug: "disaster-relief-fund",
    title: "Disaster Relief Fund",
    description:
      "Help us respond quickly to natural disasters with emergency supplies, shelter, and support for affected communities.",
    image: "/images/placeholder.svg",
    category: "Emergency",
    goal: 120000,
    raised: 95000,
    daysLeft: 10,
  },
];

const categories = [
  "All Categories",
  "Health",
  "Education",
  "Environment",
  "Social Justice",
  "Emergency",
];

export default function CampaignsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Our Current Campaigns
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Join us in making a difference. Browse our active campaigns and
              find a cause that resonates with you.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <Suspense fallback={<div className="h-48 bg-gray-200 animate-pulse"></div>}>
                  <CampaignImage 
                    src={campaign.image} 
                    alt={campaign.title} 
                  />
                </Suspense>
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  {campaign.category}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>

                  <div className="mb-4">
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

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {campaign.daysLeft} days left
                    </span>
                    <Button asChild>
                      <Link href={`/main/campaigns/${campaign.slug}`}>
                        Donate
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Own Campaign</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have a cause you&apos;re passionate about? Start your own fundraising
            campaign and rally your community to make a difference.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/main/campaigns/create" className="flex items-center">
              Start a Campaign <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
} 