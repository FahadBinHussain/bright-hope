"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function AccessibilityPage() {
  useEffect(() => {
    document.title = "Accessibility | Bright Hope";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p>
              Bright Hope is committed to ensuring digital accessibility for people with disabilities. 
              We are continuously improving the user experience for everyone, and applying the relevant 
              accessibility standards.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers 
              to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, 
              Level AA, and Level AAA.
            </p>
            <p className="mt-4">
              Bright Hope's website is partially conformant with WCAG 2.1 level AA. Partially conformant means 
              that some parts of the content do not fully conform to the accessibility standard.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
            <p>Our website includes the following accessibility features:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Semantic HTML structure for improved screen reader experience</li>
              <li>Keyboard navigation for all interactive elements</li>
              <li>Alt text for all meaningful images</li>
              <li>Adequate color contrast for text and important visual elements</li>
              <li>Resizable text without loss of functionality</li>
              <li>Clear heading structure and consistent navigation</li>
              <li>Focus indicators for keyboard users</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitations and Alternatives</h2>
            <p>
              Despite our best efforts to ensure accessibility of the Bright Hope website, there may be some limitations. 
              Below is a description of known limitations, and potential solutions:
            </p>
            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li>
                <strong>PDFs and other documents:</strong> Some of our older PDF documents may not be fully accessible. 
                We are working on remediation of these documents. If you need access to information in these documents, 
                please contact us and we will provide the information in an alternate format.
              </li>
              <li>
                <strong>Videos:</strong> Some of our older videos may not have captions or audio descriptions. 
                We are working to add these features. If you need access to information in these videos, 
                please contact us and we will provide the information in an alternate format.
              </li>
              <li>
                <strong>Interactive maps:</strong> Some of our interactive maps may not be fully accessible. 
                We provide the same information in an accessible text format alongside the maps.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Feedback and Contact Information</h2>
            <p>
              We welcome your feedback on the accessibility of the Bright Hope website. 
              Please let us know if you encounter accessibility barriers:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                Email:{" "}
                <a href="mailto:accessibility@brighthope.org" className="text-primary hover:underline">
                  accessibility@brighthope.org
                </a>
              </li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Hope Street, Charity City, CA 90210, United States</li>
            </ul>
            <p className="mt-4">
              We try to respond to feedback within 3 business days.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Assessment Approach</h2>
            <p>
              Bright Hope assesses the accessibility of its website by the following approaches:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Self-evaluation</li>
              <li>External evaluation by accessibility experts</li>
              <li>User testing with assistive technologies</li>
              <li>Regular automated testing using accessibility evaluation tools</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Improvement and Future Plans</h2>
            <p>
              Bright Hope is committed to continually improving the accessibility of our website. 
              We are in the process of implementing an ongoing accessibility audit program, and we 
              will be making the following improvements in the near future:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Ongoing training for our content creators and web developers on accessibility best practices</li>
              <li>Regular accessibility audits as part of our quality assurance process</li>
              <li>Engaging with users with disabilities to gather feedback on our website</li>
              <li>Developing an accessibility roadmap for ongoing improvements</li>
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
} 