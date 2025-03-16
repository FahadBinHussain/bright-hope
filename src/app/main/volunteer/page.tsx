"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Users, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import Image from "next/image";

// Temporary data for volunteer opportunities
const volunteerOpportunities = [
  {
    id: "1",
    title: "Community Outreach Volunteer",
    description:
      "Help us connect with local communities to raise awareness about our programs and services.",
    image: "/images/volunteer/outreach.jpg",
    location: "Various Locations",
    commitment: "4-6 hours per week",
    skills: ["Communication", "Interpersonal", "Organization"],
  },
  {
    id: "2",
    title: "Event Coordinator",
    description:
      "Assist in planning and executing fundraising events, awareness campaigns, and community gatherings.",
    image: "/images/volunteer/event.jpg",
    location: "Main Office + Remote",
    commitment: "8-10 hours per month",
    skills: ["Event Planning", "Leadership", "Time Management"],
  },
  {
    id: "3",
    title: "Digital Marketing Assistant",
    description:
      "Help manage our social media presence, create content, and engage with our online community.",
    image: "/images/volunteer/digital.jpg",
    location: "Remote",
    commitment: "3-5 hours per week",
    skills: ["Social Media", "Content Creation", "Digital Marketing"],
  },
  {
    id: "4",
    title: "Program Support Volunteer",
    description:
      "Provide direct support to our program staff in delivering services to communities in need.",
    image: "/images/volunteer/program.jpg",
    location: "Various Program Sites",
    commitment: "6-8 hours per week",
    skills: ["Adaptability", "Teamwork", "Problem Solving"],
  },
];

const volunteerFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  interests: z.string().min(1, { message: "Please share your interests" }),
  experience: z.string().optional(),
  availability: z.string().min(1, { message: "Please indicate your availability" }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export default function VolunteerPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      interests: "",
      experience: "",
      availability: "",
    },
  });

  async function onSubmit(data: VolunteerFormValues) {
    setIsLoading(true);

    try {
      // In a real application, this would call an API endpoint
      console.log("Volunteer application submitted:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Your volunteer application has been submitted!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative h-[400px] w-full">
          <Image
            src="/images/hero/volunteer-hero.jpg"
            alt="Volunteer with us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Volunteer With Us
              </h1>
              <p className="text-xl text-gray-300">
                Make a difference in your community and around the world. Join our
                team of dedicated volunteers and help us create lasting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Volunteer With Us?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Volunteering with Bright Hope offers a meaningful way to give back
              and make a tangible impact in communities that need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Join a Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals who share your passion for
                making a difference.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Opportunities</h3>
              <p className="text-gray-600">
                Find volunteer roles that fit your schedule, skills, and
                interests.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Make an Impact</h3>
              <p className="text-gray-600">
                See the direct results of your contributions in the communities
                we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id="opportunities" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our current volunteer positions and find the perfect fit for
              your skills and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row"
              >
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image
                    src={opportunity.image}
                    alt={opportunity.title}
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{opportunity.commitment}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opportunity.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <Button asChild>
                    <a href="#apply">Apply Now</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Volunteer Application</h2>
              <p className="text-lg text-gray-600">
                Ready to get started? Fill out the form below and we'll be in
                touch soon to discuss how you can get involved.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 md:p-8 shadow-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email address"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your phone number"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of Interest</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What volunteer opportunities are you interested in?"
                            className="min-h-[100px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Experience</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about any relevant skills or experience you have (optional)"
                            className="min-h-[100px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="When are you available to volunteer? (days, times, frequency)"
                            className="min-h-[100px]"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Volunteer Stories</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Hear from some of our dedicated volunteers about their experiences
              and the impact they've made.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="italic mb-4">
                "Volunteering with Bright Hope has been one of the most
                rewarding experiences of my life. I've met amazing people and
                seen firsthand the difference we're making."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-400">Community Outreach</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="italic mb-4">
                "I started volunteering to give back, but I've gained so much
                more than I've given. The skills I've developed and the
                connections I've made are invaluable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-400">Event Coordinator</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="italic mb-4">
                "As a digital marketing volunteer, I've been able to use my
                professional skills to amplify the organization's message and
                reach more people who want to help."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Aisha Patel</h4>
                  <p className="text-sm text-gray-400">Digital Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 