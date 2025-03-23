"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function TermsOfServicePage() {
  useEffect(() => {
    document.title = "Terms of Service | Bright Hope";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Bright Hope. These Terms of Service ("Terms") govern your use of our website 
              (the "Service") operated by Bright Hope ("us", "we", or "our").
            </p>
            <p className="mt-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree 
              with any part of the terms, you may not access the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use of the Service</h2>
            <p>
              Our Service allows you to learn about our charitable activities, make donations, and volunteer 
              for our causes. By using our Service, you agree to use it only for lawful purposes and in a way 
              that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
            </p>
            <p className="mt-4">
              Prohibited behavior includes harassing or causing distress or inconvenience to any person, 
              transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Donations</h2>
            <p>
              When you make a donation through our Service, you agree to provide accurate and complete information 
              about yourself and your payment method. You understand that all donations are final and non-refundable.
            </p>
            <p className="mt-4">
              We strive to ensure all funds are used for the intended charitable purposes, and we maintain 
              transparency about fund allocation. However, we reserve the right to redirect funds to other 
              charitable purposes in exceptional circumstances when original purposes are no longer feasible.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Volunteering</h2>
            <p>
              By signing up to volunteer through our Service, you agree to provide accurate information 
              about your skills, availability, and background. You understand that submitting a volunteer 
              application does not guarantee placement, and all placements are subject to our approval.
            </p>
            <p className="mt-4">
              As a volunteer, you agree to abide by our volunteer policies and guidelines, maintain 
              confidentiality of sensitive information, and represent our organization in a positive manner.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the 
              exclusive property of Bright Hope. Our Service is protected by copyright, trademark, and 
              other laws of both the United States and foreign countries.
            </p>
            <p className="mt-4">
              Our trademarks and trade dress may not be used in connection with any product or service 
              without the prior written consent of Bright Hope.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, 
              and current at all times. Failure to do so constitutes a breach of the Terms, which may result 
              in immediate termination of your account on our Service.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password that you use to access the Service and for 
              any activities or actions under your password. You agree not to disclose your password to any 
              third party and to notify us immediately upon becoming aware of any breach of security or 
              unauthorized use of your account.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall Bright Hope, nor its directors, employees, partners, agents, suppliers, or 
              affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days' notice prior to any new 
              terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mt-4">
              By continuing to access or use our Service after those revisions become effective, you agree 
              to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:info@brighthope.org" className="text-primary hover:underline">
                info@brighthope.org
              </a>.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
} 