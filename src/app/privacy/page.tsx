"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Bright Hope";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              At Bright Hope, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">The Information We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes payment card details for donations.</li>
              <li><strong>Transaction Data</strong> includes details about donations and other financial contributions you have made to us.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To register you as a donor or volunteer</li>
              <li>To process and deliver your donation</li>
              <li>To manage our relationship with you</li>
              <li>To improve our website, services, and communications</li>
              <li>To make suggestions and recommendations to you about campaigns that may interest you</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
            <p>
              We may share your personal data with third parties, including payment processors, 
              website hosting providers, analytics providers, and email service providers. 
              We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
              used or accessed in an unauthorized way, altered or disclosed. We also limit access to your personal data to those employees, 
              agents, contractors and other third parties who have a business need to know.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, 
              please contact us at{" "}
              <a href="mailto:info@brighthope.org" className="text-primary hover:underline">
                info@brighthope.org
              </a>
              {" "}or write to us at: 123 Hope Street, Charity City, CA 90210, United States.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
} 