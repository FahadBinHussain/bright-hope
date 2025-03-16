import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

// Temporary data for blog posts
const blogPosts = [
  {
    id: "1",
    slug: "making-a-difference",
    title: "Making a Difference: How Small Actions Create Big Impact",
    excerpt:
      "Discover how individual contributions can lead to significant positive changes in communities around the world.",
    image: "/images/blog/post-1.jpg",
    author: {
      name: "Sarah Johnson",
      role: "Community Outreach Director",
      image: "/images/blog/author-1.jpg",
    },
    date: "March 14, 2024",
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "sustainable-development",
    title: "Sustainable Development: Building a Better Future",
    excerpt:
      "Learn about our approach to sustainable development and how it's helping communities thrive.",
    image: "/images/blog/post-2.jpg",
    author: {
      name: "Michael Chen",
      role: "Sustainability Director",
      image: "/images/blog/author-2.jpg",
    },
    date: "March 12, 2024",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "education-empowerment",
    title: "Education as a Tool for Empowerment",
    excerpt:
      "Explore how education is transforming lives and creating opportunities in underserved communities.",
    image: "/images/blog/post-3.jpg",
    author: {
      name: "Emily Rodriguez",
      role: "Education Program Manager",
      image: "/images/blog/author-3.jpg",
    },
    date: "March 10, 2024",
    readTime: "6 min read",
  },
];

const categories = [
  "All",
  "Impact Stories",
  "Programs",
  "Volunteer Stories",
  "News",
  "Events",
];

export default function BlogPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-gray-300 mb-6">
              Stay updated with our latest news, stories, and insights about our
              work in communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/blog/featured-post.jpg"
              alt="Featured blog post"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-6">
            <h2 className="text-3xl font-bold mb-4">
              The Power of Community: Stories of Hope and Change
            </h2>
            <p className="text-gray-600 mb-6">
              Join us as we share inspiring stories of communities coming together
              to create lasting positive change.
            </p>
            <Button asChild>
              <Link href="/main/blog/power-of-community">Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-t border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href={`/main/blog?category=${category.toLowerCase()}`}>
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author.image}
                          alt={`${post.author.name}'s profile picture`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" asChild>
                      <Link href={`/main/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, stories,
            and ways to get involved.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Subscribe</Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
} 