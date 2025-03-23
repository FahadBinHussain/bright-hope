"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function TeamPage() {
  useEffect(() => {
    document.title = "Our Team | Bright Hope";
  }, []);

  const teamMembers = [
    {
      name: "Mahir Abdullah",
      role: "Executive Director",
      bio: "Mahir leads our organization with passion and strategic vision. With extensive experience in nonprofit management, he ensures that Bright Hope continues to create meaningful impact in communities around the world.",
      image: "/images/team/sarah.jpg",
      social: {
        linkedin: "https://linkedin.com/in/mahirabdullah",
        twitter: "https://twitter.com/mahirabdullah",
      },
    },
    {
      name: "Fahad Bin Hussain",
      role: "Lead Developer",
      bio: "Fahad is the lead developer of Bright Hope, overseeing the technical architecture and implementation of our digital platform. His expertise in software engineering ensures our online presence effectively supports our mission and community initiatives.",
      image: "/images/team/michael.jpg",
      social: {
        github: "https://github.com/FahadBinHussain",
        facebook: "https://facebook.com/FahadBinHussainn",
        website: "http://oangrybird.onrender.com/",
      },
    },
    {
      name: "Abrar Fahim",
      role: "Finance Director",
      bio: "Abrar manages our organization's finances with precision and integrity. His expertise ensures that donations are used effectively and transparently to maximize our impact in communities we serve.",
      image: "/images/team/amara.jpg",
      social: {
        linkedin: "https://linkedin.com/in/abrarfahim",
      },
    },
    {
      name: "Asibur Rahman Rakib",
      role: "Communications Manager",
      bio: "Asibur leads our communications and outreach efforts. His creative approach and strategic thinking help share our story and amplify our message to supporters and communities worldwide.",
      image: "/images/team/james.jpg",
      social: {
        twitter: "https://twitter.com/asiburrrahman",
        facebook: "https://facebook.com/asiburrahman",
      },
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who lead Bright Hope's mission to create positive change in communities around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{member.name}</span>
                </div>
                {/* Fallback for missing images */}
                {member.image && (
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      // Hide the image on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold">{member.name}</h2>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`Twitter profile of ${member.name}`}
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a 
                      href={member.social.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`Facebook profile of ${member.name}`}
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`GitHub profile of ${member.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                    </a>
                  )}
                  {member.social.website && (
                    <a 
                      href={member.social.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary transition-colors"
                      aria-label={`Website of ${member.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Join Our Team</h2>
          <p className="text-gray-600 mb-6 text-center">
            We're always looking for passionate individuals to join our mission. Check our current openings or send us your resume.
          </p>
          <div className="flex justify-center">
            <a 
              href="/careers" 
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              View Opportunities
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 