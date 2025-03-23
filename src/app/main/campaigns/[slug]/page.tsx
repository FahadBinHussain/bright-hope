"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

const CampaignHeroImage = ({ src, alt }: { src: string; alt: string }) => {
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
          onError={(e) => {
            console.error(`Failed to load image: ${imagePath}`, e);
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

// Temporary data for the campaign - using simple filenames for images
const campaignData: Record<string, {
  title: string;
  description: string;
  image: string;
  category: string;
  goal: number;
  raised: number;
  daysLeft: number;
  details: string;
}> = {
  "clean-water-initiative": {
    title: "Clean Water Initiative",
    description: "Help us provide clean water to communities in need.",
    image: "water.jpg",
    category: "Health",
    goal: 50000,
    raised: 32500,
    daysLeft: 15,
    details: `Clean water is a fundamental human right, yet millions around the world lack access to this essential resource. Our Clean Water Initiative aims to address this critical need by implementing sustainable water solutions in underserved communities.

With your support, we will:

1. Install water filtration systems in villages with contaminated water sources
2. Drill wells and establish community water points in areas without reliable access
3. Provide education on water conservation and hygiene practices
4. Train local technicians to maintain and repair water infrastructure

Your donation will directly impact families who currently walk miles each day to collect water or risk illness from consuming contaminated sources. Clean water not only improves health outcomes but also allows children to attend school instead of collecting water and enables adults to pursue livelihood opportunities.

Join us in making a tangible difference in the lives of thousands of people. Every donation, regardless of size, brings us closer to our goal of ensuring clean water access for all.`,
  },
  "education-for-all": {
    title: "Education for All",
    description: "Support our mission to bring quality education to underprivileged children.",
    image: "education.jpg",
    category: "Education",
    goal: 75000,
    raised: 45000,
    daysLeft: 30,
    details: `Education is the most powerful tool we can use to change the world. Yet, millions of children around the globe are denied this basic right due to poverty, conflict, discrimination, or lack of infrastructure.

Our Education for All campaign aims to break down these barriers by:

1. Building and renovating schools in underserved communities
2. Providing scholarships to students who cannot afford school fees
3. Training and supporting qualified teachers
4. Supplying essential learning materials and resources
5. Implementing innovative teaching methodologies

We believe that every child deserves the opportunity to learn, grow, and reach their full potential. With quality education, children not only acquire knowledge and skills but also develop confidence, critical thinking abilities, and the capacity to contribute positively to society.

Your support will help us reach more communities and transform more lives through the power of education. Together, we can create a future where all children have access to quality education, regardless of their background or circumstances.`,
  },
  "healthcare-access": {
    title: "Healthcare Access",
    description: "Join us in providing essential healthcare services to remote communities.",
    image: "healthcare.jpg",
    category: "Health",
    goal: 100000,
    raised: 68000,
    daysLeft: 45,
    details: `Access to healthcare is a fundamental right, yet millions of people in remote and underserved communities face significant barriers to obtaining even basic medical services. Our Healthcare Access initiative aims to bridge this gap by bringing essential healthcare directly to those who need it most.

With your support, we will:

1. Establish mobile clinics that can reach remote villages
2. Train community health workers from local populations
3. Provide essential medications and medical supplies
4. Offer preventive care services including vaccinations and health screenings
5. Implement telemedicine solutions to connect patients with specialists

Many preventable deaths occur simply because people cannot access healthcare in time. By bringing services closer to communities, we can save lives, treat conditions before they become severe, and improve overall health outcomes.

Your contribution will help us expand our reach and ensure that more people receive the care they desperately need. Join us in creating a world where quality healthcare is accessible to everyone, regardless of where they live.`,
  },
  "sustainable-agriculture": {
    title: "Sustainable Agriculture",
    description: "Help farmers implement sustainable farming practices that increase yields while protecting the environment.",
    image: "agriculture.jpg",
    category: "Environment",
    goal: 60000,
    raised: 28000,
    daysLeft: 60,
    details: `Climate change and environmental degradation pose serious threats to agricultural productivity and food security worldwide. Our Sustainable Agriculture project aims to equip farmers with the knowledge and tools they need to adapt to changing conditions while protecting natural resources.

Through this initiative, we will:

1. Train farmers in climate-smart agricultural techniques
2. Provide drought-resistant seeds and efficient irrigation systems
3. Establish demonstration farms for hands-on learning
4. Create farmer networks for knowledge sharing and support
5. Develop market linkages to ensure fair prices for sustainably grown produce

Sustainable farming practices not only help farmers increase their yields and income but also contribute to environmental conservation by reducing soil erosion, conserving water, and preserving biodiversity. This creates a positive cycle that benefits both people and the planet.

Your support will enable us to reach more farming communities and spread sustainable practices that ensure food security while protecting our environment for future generations. Together, we can create a more resilient and sustainable food system.`,
  },
  "womens-empowerment": {
    title: "Women's Empowerment",
    description: "Support programs that provide women with skills training, microloans, and resources.",
    image: "women.jpg",
    category: "Social Justice",
    goal: 80000,
    raised: 52000,
    daysLeft: 25,
    details: `Women and girls around the world continue to face significant barriers to equality, including limited access to education, economic opportunities, and decision-making power. Our Women's Empowerment program aims to break down these barriers and create pathways for women to achieve their full potential.

With your support, we will:

1. Provide vocational training and business skills development
2. Establish microfinance programs with low-interest loans
3. Create mentorship networks connecting established entrepreneurs with beginners
4. Offer literacy and financial education classes
5. Support advocacy efforts for women's rights and gender equality

When women are empowered economically, the benefits extend to their families and entire communities. Studies consistently show that women reinvest up to 90% of their income in their families, improving health, nutrition, and education outcomes for the next generation.

Your contribution will help us reach more women with the tools and resources they need to build sustainable livelihoods and become agents of change in their communities. Join us in creating a more equitable world where all women have the opportunity to thrive.`,
  },
  "disaster-relief-fund": {
    title: "Disaster Relief Fund",
    description: "Help us respond quickly to natural disasters with emergency supplies and support.",
    image: "disaster.jpg",
    category: "Emergency",
    goal: 120000,
    raised: 95000,
    daysLeft: 10,
    details: `When natural disasters strike, immediate response can mean the difference between life and death. Our Disaster Relief Fund enables us to act quickly when emergencies occur, providing critical support to affected communities during their most vulnerable moments.

Your contribution to this fund will help us:

1. Deploy rapid response teams to disaster zones
2. Distribute emergency supplies including food, water, and shelter
3. Provide medical assistance to the injured
4. Support evacuation efforts and temporary housing solutions
5. Begin early recovery initiatives to help communities rebuild

Unlike project-specific fundraising, maintaining a disaster relief fund allows us to respond immediately when disasters occur, without waiting for funds to be raised. This means we can be on the ground helping survivors within hours rather than days or weeks.

Natural disasters are increasing in both frequency and intensity due to climate change, making this fund more important than ever. By contributing today, you're helping ensure that when the next earthquake, hurricane, flood, or wildfire occurs, we'll be ready to help those affected.

Your support saves lives. Join us in building a more effective disaster response system that reaches those in need when they need it most.`,
  },
};

export default function CampaignDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  
  // Get campaign data based on slug or show a fallback if not found
  const campaign = campaignData[slug] || campaignData["clean-water-initiative"];

  return (
    <MainLayout>
      <div className="min-h-screen">
        <section className="relative bg-gray-900 text-white">
          <Suspense fallback={<div className="h-[400px] w-full bg-gray-700 animate-pulse"></div>}>
            <CampaignHeroImage src={campaign.image} alt={campaign.title} />
          </Suspense>
          <div className="absolute inset-0 bg-black/50">
            <div className="container mx-auto px-4 h-full flex items-end pb-10">
              <div className="max-w-3xl">
                <Link
                  href="/main/campaigns"
                  className="inline-flex items-center text-white mb-4 hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
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
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full"
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
                    <Link href={`/main/campaigns/${slug}/donate`}>Donate Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 border-b pb-4">About this Campaign</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: campaign.details }}
              />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 