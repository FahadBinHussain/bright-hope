import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Temporary data for the campaign
const campaign = {
  id: "1",
  slug: "clean-water-initiative",
  title: "Clean Water Initiative",
  description:
    "Help us provide clean water to communities in need. Your donation can save lives.",
  image: "/images/campaigns/water.jpg",
  goal: 50000,
  raised: 32500,
  daysLeft: 15,
  story: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `,
};

export default function CampaignPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative h-[400px] w-full">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
        </div>
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
    </div>
  );
} 