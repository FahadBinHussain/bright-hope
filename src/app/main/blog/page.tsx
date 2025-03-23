import React from "react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Temporary data for blog posts
// Commented out as it's defined but not used
/*
const blogPosts = [
  {
    id: "1",
    slug: "making-a-difference",
    title: "Making a Difference: How Small Actions Create Big Impact",
    excerpt:
      "Discover how individual contributions can lead to significant positive changes in communities around the world.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Mahir Abdullah",
      role: "Community Outreach Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    date: "August 15, 2023",
    readTime: "5 min read",
  },
  // ... more blog posts
];
*/

// Commented out as it's defined but not used
/*
const categories = [
  "All",
  "Community Development",
  "Education",
  "Health",
  "Environment",
  "Disaster Response",
  "Technology",
];
*/

// Blog posts data
const blogPostsData = {
  "power-of-community": {
    title: "The Power of Community",
    excerpt: "How community-led disaster response is saving lives in flood-prone Bangladesh",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Md. Rafiqul Islam",
      role: "Community Resilience Coordinator",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
    },
    date: "October 15, 2023",
    readTime: "8 min read",
    isFeatured: true
  },
  "sustainable-development": {
    title: "Sustainable Development in Challenging Environments",
    excerpt: "Innovative approaches to sustainable agriculture in climate-vulnerable regions of Bangladesh",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Dr. Asif Khan",
      role: "Agricultural Program Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    date: "August 15, 2023",
    readTime: "9 min read",
    isFeatured: false
  },
  "education-empowerment": {
    title: "Education as a Tool for Empowerment",
    excerpt: "Transforming lives and creating opportunities through accessible education in underserved communities",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80",
    author: {
      name: "Tanvir Ahmed",
      role: "Education Program Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    date: "September 28, 2023",
    readTime: "10 min read",
    isFeatured: false
  },
  "making-a-difference": {
    title: "Making a Difference: How Small Actions Create Big Impact",
    excerpt: "Discover how a coastal community in Bangladesh is transforming itself through grassroots initiatives",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Nadia Rahman",
      role: "Community Engagement Specialist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    date: "July 22, 2023",
    readTime: "7 min read",
    isFeatured: false
  }
};

export default function BlogPage() {
  // Featured post (first entry only)
  const featuredPost = Object.entries(blogPostsData)
    .filter(([, post]) => post.isFeatured)
    .map(([slug, post]) => ({ slug, ...post }))
    .slice(0, 1)[0];

  // Regular posts (excluding featured)
  const regularPosts = Object.entries(blogPostsData)
    .filter(([, post]) => !post.isFeatured)
    .map(([slug, post]) => ({ slug, ...post }));

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-700 mb-8">
              Get the latest updates on our work, stories from the field, and
              insights about sustainable development.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 bg-white rounded-2xl shadow-xl overflow-hidden transform -translate-y-16">
              <div className="md:w-1/2 relative">
                <div className="relative h-full min-h-[400px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <div className="absolute top-6 left-6 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold shadow-lg">
                    FEATURED STORY
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{featuredPost.title}</h2>
                <p className="text-lg text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={featuredPost.author.image}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{featuredPost.author.name}</div>
                    <div className="text-sm text-gray-500">{featuredPost.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Link
                  href={`/main/blog/${featuredPost.slug}`}
                  className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold self-start group"
                >
                  Read Full Story
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Recent Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/main/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-60">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{post.author.name}</div>
                      <div className="text-xs text-gray-500">{post.author.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Stay Updated</h2>
            <p className="text-gray-600 mb-8">Subscribe to our newsletter to receive the latest stories and updates about our work.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full sm:w-auto"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 