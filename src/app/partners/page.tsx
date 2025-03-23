"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FallbackImage from "@/components/ui/fallback-image";

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
          name: "Grameen Solutions",
          logo: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          description: "Provides technology infrastructure and digital solutions to enhance our operational efficiency and reach in rural Bangladesh.",
          website: "https://example.com",
        },
        {
          name: "Bengal Green Industries",
          logo: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
          description: "Supports our environmental sustainability initiatives with funding and technical expertise for climate adaptation projects.",
          website: "https://example.com",
        },
        {
          name: "Bangladesh Community Bank",
          logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          description: "Offers financial services and education programs for communities we serve across the country.",
          website: "https://example.com",
        },
        {
          name: "Dhaka Health Services",
          logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          description: "Provides medical supplies and professional expertise for our health programs in underserved regions.",
          website: "https://example.com",
        },
      ],
    },
    {
      title: "Nonprofit Partners",
      description: "Organizations that collaborate with us to expand our reach and enhance our programs through shared resources and expertise.",
      partners: [
        {
          name: "Bangladesh Education Foundation",
          logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80",
          description: "Collaborates on educational initiatives in underserved communities across Bangladesh.",
          website: "https://example.com",
        },
        {
          name: "Sylhet Water Initiative",
          logo: "https://images.unsplash.com/photo-1527689638836-411945a2b57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80",
          description: "Works with us to implement water sanitation projects in flood-prone rural communities.",
          website: "https://example.com",
        },
        {
          name: "Bangladesh Rural Health Network",
          logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
          description: "Partners on healthcare access programs and medical training initiatives in remote areas.",
          website: "https://example.com",
        },
      ],
    },
    {
      title: "Institutional Partners",
      description: "Government agencies, foundations, and academic institutions that support our work through grants, research, and policy advocacy.",
      partners: [
        {
          name: "Bangladesh Rural Development Board",
          logo: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
          description: "Government agency that collaborates on large-scale development projects in multiple districts.",
          website: "https://example.com",
        },
        {
          name: "University of Dhaka Research Center",
          logo: "https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
          description: "Academic research partner that helps evaluate and improve our program effectiveness across Bangladesh.",
          website: "https://example.com",
        },
        {
          name: "Bangladesh Climate Change Trust",
          logo: "https://images.unsplash.com/photo-1680582521209-d4a3ed97d2d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          description: "Supporting innovative approaches to sustainable development and climate resilience in vulnerable coastal areas.",
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
                  <div className="relative h-40">
                    <FallbackImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain py-4"
                      fallbackText={partner.name}
                    />
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