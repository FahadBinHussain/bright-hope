import Image from "next/image";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post | Bright Hope",
  description: "Read our latest blog post about our work and impact.",
};

// Use the URL slug to dynamically determine which blog post to display
export default function BlogPostPage() {
  return (
    <MainLayout>
      <article className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full bg-gray-900 mb-20">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Blog post hero image"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/main/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Making a Difference: How Small Actions Lead to Big Impact
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm mt-10">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  March 15, 2024
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  5 min read
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg mx-auto space-y-8"
              dangerouslySetInnerHTML={{
                __html: `
                <p>In the heart of rural Bangladesh, Bright Hope has been working with local communities to implement sustainable development projects that empower residents and create lasting change.</p>
                
                <h2 class="mt-12 mb-6">The Power of Community-Led Initiatives</h2>
                <p>Our approach centers on the belief that the most effective solutions come from within communities themselves. By providing resources, training, and support, we enable local leaders to drive projects that address their most pressing needs.</p>
                
                <p>In Patharghata village, a group of women started a microfinance cooperative with initial support from Bright Hope. Today, that cooperative has grown to include over 200 members and has funded the start-up of dozens of small businesses.</p>
                
                <h2 class="mt-12 mb-6">Measuring Real Impact</h2>
                <p>We believe in measuring our success not by the number of projects undertaken, but by the tangible improvements in people's lives. Our impact assessment framework tracks key indicators like:</p>
                
                <ul>
                  <li>Household income growth</li>
                  <li>Educational attainment</li>
                  <li>Access to healthcare</li>
                  <li>Food security</li>
                  <li>Community resilience to natural disasters</li>
                </ul>
                
                <p>Through rigorous monitoring and evaluation, we ensure that our efforts are truly making a difference where it matters most.</p>
                
                <h2 class="mt-12 mb-6">Looking Ahead</h2>
                <p>As we continue our work, we remain committed to our core principles of community empowerment, sustainability, and measurable impact. We invite you to join us in this journey and be part of creating positive change in some of the world's most vulnerable communities.</p>
              `,
              }}
            />
          </div>
        </div>
      </article>
    </MainLayout>
  );
} 