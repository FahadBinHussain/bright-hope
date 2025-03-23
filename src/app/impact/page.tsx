"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Heart, Users, Globe, Home, Backpack, Leaf } from "lucide-react";
import Image from "next/image";
import FallbackImage from "@/components/ui/fallback-image";

export default function ImpactPage() {
  useEffect(() => {
    document.title = "Our Impact | Bright Hope";
  }, []);

  const impactStats = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "120,000+",
      label: "Lives Impacted",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      value: "64",
      label: "Districts Reached",
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      value: "৳4.2Cr+",
      label: "Donations Raised",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      value: "150+",
      label: "Projects Completed",
    },
  ];

  const impactStories = [
    {
      title: "Clean Water Initiative",
      location: "Sunamganj, Sylhet",
      description: "Our team installed water filtration systems in 12 villages affected by frequent flooding, providing clean drinking water to over 5,000 people. This initiative has reduced waterborne illnesses by 80% in the region.",
      image: "https://images.unsplash.com/photo-1563073362-28580517760e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Education for All",
      location: "Kurigram, Rangpur",
      description: "We built 3 new schools and provided educational materials to 8 existing schools in northern Bangladesh, giving over 2,500 children access to quality education. Literacy rates have improved by 45% since the program began.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    },
    {
      title: "Healthcare Access",
      location: "Chars of Brahmaputra, Jamalpur",
      description: "Our mobile health clinics have provided medical care to 15,000 people in remote char areas. We've also trained 50 local healthcare workers to ensure sustainable healthcare delivery in these isolated communities.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      title: "Sustainable Farming",
      location: "Coastal Areas, Khulna",
      description: "We've helped 400 farming families in saline-affected coastal areas adopt climate-resilient agriculture practices, increasing crop yields by 60% while ensuring food security in the region.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Impact</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Bright Hope, we measure our success by the positive change we create. 
            Here's how our work is transforming lives and communities around the world.
          </p>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-lg shadow p-6 text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Annual Reports */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Annual Impact Reports</h2>
          <p className="text-center text-gray-600 mb-8">
            We are committed to transparency. Our annual reports provide detailed information about our programs, 
            finances, and the impact of your generous support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[2023, 2022, 2021].map((year) => (
              <a 
                key={year}
                href={`#`}
                className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{year} Impact Report</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive overview of our initiatives and achievements in {year}.
                </p>
                <div className="text-primary font-medium">Download PDF →</div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Impact Stories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Stories of Change</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactStories.map((story) => (
              <div key={story.title} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-72 rounded-t-lg overflow-hidden">
                  <FallbackImage
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    fallbackText={story.title}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{story.title}</h3>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {story.location}
                    </span>
                  </div>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* SDG Alignment */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Aligned with Sustainable Development Goals
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Our work contributes to the United Nations Sustainable Development Goals. 
            We're proud to be part of the global effort to create a better future for all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 6, 13].map((goal) => (
              <div key={goal} className="w-16 h-16 bg-white rounded-lg shadow flex items-center justify-center font-bold text-primary">
                SDG {goal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 