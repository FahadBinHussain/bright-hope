"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  useEffect(() => {
    document.title = "Our Partners | Bright Hope";
  }, []);

  const partnerCategories = [
    {
      title: "Corporate Partners",
      description: "Businesses that support our mission through financial contributions, in-kind donations, and employee engagement.",
      partners: [
        {
          name: "Global Tech Solutions",
          logo: "/images/partners/partner1.jpg",
          description: "Provides technology infrastructure and digital solutions to enhance our operational efficiency.",
          website: "https://example.com",
        },
        {
          name: "Eco Friendly Industries",
          logo: "/images/partners/partner2.jpg",
          description: "Supports our environmental sustainability initiatives with funding and technical expertise.",
          website: "https://example.com",
        },
        {
          name: "Community Bank Group",
          logo: "/images/partners/partner3.jpg",
          description: "Offers financial services and education programs for communities we serve.",
          website: "https://example.com",
        },
        {
          name: "Horizon Healthcare",
          logo: "/images/partners/partner4.jpg",
          description: "Provides medical supplies and professional expertise for our health programs.",
          website: "https://example.com",
        },
      ],
    },
    {
      title: "Nonprofit Partners",
      description: "Organizations that collaborate with us to expand our reach and enhance our programs through shared resources and expertise.",
      partners: [
        {
          name: "Education First Alliance",
          logo: "/images/partners/partner5.jpg",
          description: "Collaborates on educational initiatives in underserved communities worldwide.",
          website: "https://example.com",
        },
        {
          name: "Clean Water Coalition",
          logo: "/images/partners/partner6.jpg",
          description: "Works with us to implement water sanitation projects in rural communities.",
          website: "https://example.com",
        },
        {
          name: "Global Health Network",
          logo: "/images/partners/partner7.jpg",
          description: "Partners on healthcare access programs and medical training initiatives.",
          website: "https://example.com",
        },
      ],
    },
    {
      title: "Institutional Partners",
      description: "Government agencies, foundations, and academic institutions that support our work through grants, research, and policy advocacy.",
      partners: [
        {
          name: "International Development Agency",
          logo: "/images/partners/partner8.jpg",
          description: "Provides grant funding for large-scale development projects in multiple countries.",
          website: "https://example.com",
        },
        {
          name: "Center for Social Innovation",
          logo: "/images/partners/partner9.jpg",
          description: "Academic research partner that helps evaluate and improve our program effectiveness.",
          website: "https://example.com",
        },
        {
          name: "Global Change Foundation",
          logo: "/images/partners/partner10.jpg",
          description: "Supporting innovative approaches to sustainable development and climate resilience.",
          website: "https://example.com",
        },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to work with a diverse network of partners who share our vision for a better world. 
            Together, we amplify our impact and create lasting change in communities around the globe.
          </p>
        </div>
        
        {partnerCategories.map((category, index) => (
          <div key={category.title} className={`mb-20 ${index % 2 === 1 ? 'bg-gray-50 py-12 -mx-4 px-4' : ''}`}>
            <h2 className="text-2xl font-bold mb-3 text-center">{category.title}</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
              {category.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.partners.map((partner) => (
                <div key={partner.name} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center p-6">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-6"
                        onError={(e) => {
                          // Hide the image on error
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-xl font-bold text-gray-400">{partner.name}</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                    <p className="text-gray-600 mb-4">{partner.description}</p>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Partner with Us Section */}
        <div className="bg-primary/10 rounded-lg p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-gray-700 mb-6">
            Interested in partnering with Bright Hope? We're always looking for organizations that share our values and mission.
            Together, we can make a greater impact and transform more lives.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Contact Us to Partner
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 