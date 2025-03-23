import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import FallbackImage from "@/components/ui/fallback-image";

// Team members data
const teamMembers = [
  {
    id: "1",
    name: "Mahir Abdullah",
    role: "Executive Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    bio: "Mahir leads our organization with passion and strategic vision. With extensive experience in nonprofit management, he ensures that Bright Hope continues to create meaningful impact in communities around the world.",
  },
  {
    id: "2",
    name: "Fahad Bin Hussain",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    bio: "Fahad is the lead developer of Bright Hope, overseeing the technical architecture and implementation of our digital platform. His expertise in software engineering ensures our online presence effectively supports our mission and community initiatives.",
  },
  {
    id: "3",
    name: "Abrar Fahim",
    role: "Finance Director",
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    bio: "Abrar manages our organization&apos;s finances with precision and integrity. His expertise ensures that donations are used effectively and transparently to maximize our impact in communities we serve.",
  },
  {
    id: "4",
    name: "Asibur Rahman Rakib",
    role: "Communications Manager",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    bio: "Asibur leads our communications and outreach efforts. His creative approach and strategic thinking help share our story and amplify our message to supporters and communities worldwide.",
  },
];

// Timeline data
const timeline = [
  {
    year: "2005",
    title: "Our Beginning",
    description:
      "Bright Hope was founded with a mission to create lasting change in communities around the world.",
  },
  {
    year: "2010",
    title: "Expanding Impact",
    description:
      "We expanded our programs to reach communities across Africa and Asia.",
  },
  {
    year: "2015",
    title: "Sustainable Development",
    description:
      "Launched our sustainable development initiatives focusing on education, healthcare, and clean water.",
  },
  {
    year: "2020",
    title: "Global Response",
    description:
      "Mobilized resources and volunteers to respond to global challenges and emergencies.",
  },
  {
    year: "2025",
    title: "Future Vision",
    description:
      "Committed to expanding our impact and reaching more communities in need.",
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative h-[400px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1469524714134-1fd56ead1196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80"
            alt="About Bright Hope"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-300">
                Bright Hope was founded with a simple mission: to empower
                communities through sustainable development, education, and
                healthcare initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We believe that every person deserves access to basic necessities,
                education, and healthcare. Our mission is to create lasting change
                by working with communities to develop sustainable solutions to
                their challenges.
              </p>
              <p className="text-gray-600 mb-8">
                Through partnerships with local organizations and the dedication of
                our volunteers, we&apos;re making a difference in communities around the
                world.
              </p>
              <Button asChild>
                <Link href="/volunteer" className="flex items-center">
                  Join Our Mission <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our mission in action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community-Led</h3>
              <p className="text-gray-600">
                We work with communities to develop solutions that address their
                specific needs and challenges.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sustainable Impact</h3>
              <p className="text-gray-600">
                Our programs focus on creating lasting change through sustainable
                development initiatives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Long-Term Commitment</h3>
              <p className="text-gray-600">
                We maintain long-term partnerships with communities to ensure
                sustainable development and lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative h-64">
                  <FallbackImage
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    fallbackText={member.name}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our History</h2>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full" />
                <div className="absolute left-1.5 top-4 bottom-0 w-0.5 bg-gray-200 last:hidden" />
                <div>
                  <div className="text-primary font-bold mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1.2M+</div>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-gray-600">Volunteers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have questions about our work or want to get involved? We&apos;d love to
            hear from you.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Your support can help us create lasting change in communities around
            the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/donate" className="flex items-center">
                Donate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/volunteer" className="flex items-center">
                Volunteer With Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 