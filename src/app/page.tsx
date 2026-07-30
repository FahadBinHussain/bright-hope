import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Heart, Users, Calendar } from "lucide-react";
import { supabaseService } from "@/lib/services/supabase";

export const dynamic = "force-dynamic";

// Server component to fetch data
async function getData() {
  try {
    const [campaigns, impactStats] = await Promise.all([
      supabaseService.getCampaigns(),
      supabaseService.getImpactStats()
    ]);
    return { campaigns, impactStats };
  } catch {
    return { campaigns: [], impactStats: [] };
  }
}

export default async function Home() {
  const { campaigns, impactStats } = await getData();

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'heart':
        return <Heart className="h-8 w-8 text-primary" />;
      case 'users':
        return <Users className="h-8 w-8 text-primary" />;
      case 'calendar':
        return <Calendar className="h-8 w-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative h-[600px] w-full">
          <Image
            src="/images/hero/home-hero.jpg"
            alt="Hero background showing community service"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Together, We Can Make a{" "}
                <span className="text-primary">Difference</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Join our mission to create lasting change through compassion,
                action, and hope. Your support can transform lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/main/donate">Donate Now</Link>
                </Button>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                  <Link href="/main/volunteer">Become a Volunteer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="mb-4">{getIconComponent(stat.icon)}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Campaigns</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Support our current initiatives and help us create lasting change in
              communities around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={campaign.image_url}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {campaign.days_left} days left
                    </span>
                    <Button asChild>
                      <Link href={`/main/campaigns/${campaign.slug}`}>
                        Learn More
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
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your support can transform lives and communities. Join us today in
            our mission to create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/main/donate">Donate Now</Link>
            </Button>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
              <Link href="/main/volunteer">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
