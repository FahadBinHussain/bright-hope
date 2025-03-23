"use client";

import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { Heart, Users, Globe, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { supabaseService } from "@/lib/services/supabase";
import FallbackImage from "@/components/ui/fallback-image";

const stats = [
  {
    icon: Heart,
    value: "10,000+",
    label: "Lives Impacted",
  },
  {
    icon: Users,
    value: "500+",
    label: "Active Volunteers",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Communities Served",
  },
  {
    icon: Target,
    value: "95%",
    label: "Success Rate",
  },
];

const team = [
  {
    name: "Mahir Abdullah",
    role: "Executive Director",
    imagePath: "team/sarah.jpg",
  },
  {
    name: "Fahad Bin Hussain",
    role: "Lead Developer",
    imagePath: "team/michael.jpg",
  },
  {
    name: "Abrar Fahim",
    role: "Finance Director",
    imagePath: "team/emma.jpg",
  },
  {
    name: "Asibur Rahman Rakib",
    role: "Communications Manager",
    imagePath: "team/emma.jpg",
  },
];

export default function AboutPage() {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch hero image
        const { data: heroData } = supabaseService.supabase.storage
          .from('assets')
          .getPublicUrl('hero/home-hero.jpg');

        // Fetch mission image
        const { data: missionData } = supabaseService.supabase.storage
          .from('assets')
          .getPublicUrl('about/mission.jpg');

        // Fetch team images
        const teamImages: Record<string, string> = {};
        for (const member of team) {
          const { data } = supabaseService.supabase.storage
            .from('assets')
            .getPublicUrl(member.imagePath);
          if (data?.publicUrl) {
            teamImages[member.imagePath] = data.publicUrl;
          }
        }

        setImages({
          hero: heroData?.publicUrl || '',
          mission: missionData?.publicUrl || '',
          ...teamImages,
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {images.hero ? (
          <Image
            src={images.hero}
            alt="Volunteers helping the community"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400">Loading hero image...</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Bright Hope</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Empowering communities through sustainable development and humanitarian aid
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Bright Hope, we believe in the power of community and the potential of every individual. 
                Our mission is to create lasting positive change by empowering communities through sustainable 
                development initiatives and humanitarian aid.
              </p>
              <p className="text-gray-600">
                We work tirelessly to provide resources, education, and support to those in need, 
                while fostering a culture of giving and volunteerism that strengthens the fabric of our society.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100">
              {images.mission ? (
                <Image
                  src={images.mission}
                  alt="Our mission in action"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Loading mission image...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-gray-600">
                We approach every situation with empathy and understanding, ensuring our actions 
                reflect our commitment to human dignity.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-gray-600">
                We focus on creating measurable, sustainable change that transforms lives and 
                communities for the better.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We implement solutions that are environmentally conscious and ensure long-term 
                benefits for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  {images[member.imagePath] ? (
                    <FallbackImage
                      src={images[member.imagePath]}
                      alt={member.name}
                      fill
                      className="object-cover"
                      fallbackText={member.name}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-400">Loading team photo...</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the change. Whether you want to volunteer, donate, or partner with us, 
            there are many ways to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/main/volunteer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Become a Volunteer
            </a>
            <a
              href="/main/donate"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 