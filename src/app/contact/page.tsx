"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Bright Hope";
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our work? Want to get involved? We'd love to hear from you.
            Use the form below or contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="donation">Donation Question</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Main Office */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Main Office</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium">123 Hope Street</p>
                    <p className="text-gray-600">Charity City, CA 90210</p>
                    <p className="text-gray-600">United States</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <a href="tel:+11234567890" className="hover:text-primary">
                    +1 (123) 456-7890
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <a href="mailto:info@brighthope.org" className="hover:text-primary">
                    info@brighthope.org
                  </a>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Regional Offices</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg">East Coast Office</h3>
                  <p className="text-gray-600">456 Prosperity Lane</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600">
                    <a href="mailto:eastcoast@brighthope.org" className="hover:text-primary">
                      eastcoast@brighthope.org
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">Midwest Office</h3>
                  <p className="text-gray-600">789 Community Blvd</p>
                  <p className="text-gray-600">Chicago, IL 60601</p>
                  <p className="text-gray-600">
                    <a href="mailto:midwest@brighthope.org" className="hover:text-primary">
                      midwest@brighthope.org
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">International Office</h3>
                  <p className="text-gray-600">25 Global Avenue</p>
                  <p className="text-gray-600">London, UK NW1 6XE</p>
                  <p className="text-gray-600">
                    <a href="mailto:international@brighthope.org" className="hover:text-primary">
                      international@brighthope.org
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">How can I make a donation?</h3>
              <p className="text-gray-600">
                You can make a donation through our website's donation page, by mail to our main office address, or by phone. We accept various payment methods including credit cards, bank transfers, and checks.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">How can I volunteer with Bright Hope?</h3>
              <p className="text-gray-600">
                Visit our Volunteer page to learn about current opportunities and complete our volunteer application form. We have various positions available both locally and internationally.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-2">Do you provide tax receipts for donations?</h3>
              <p className="text-gray-600">
                Yes, we provide tax receipts for all donations. For online donations, you'll receive an email receipt immediately. For mail donations, we'll send a receipt within 2-3 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 