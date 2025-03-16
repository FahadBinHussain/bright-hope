"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import { CheckCircle, Share, Download } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function DonationSuccessPage() {
  useEffect(() => {
    // Track donation in analytics
    // This would typically call an API endpoint
    console.log("Donation completed successfully");
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "I just donated to Bright Hope!",
          text: "I just made a donation to help Bright Hope's mission. Join me in making a difference!",
          url: window.location.origin,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.origin);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleDownloadReceipt = () => {
    // In a real application, this would generate and download a receipt
    toast.info("Your receipt will be emailed to you shortly.");
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6"
            >
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
            </motion.div>

            <h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your generosity helps us continue our mission to create lasting
              change in communities around the world.
            </p>

            <div className="border-t border-gray-200 pt-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
              <ul className="text-left space-y-4 mb-6">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>
                    You'll receive a confirmation email with details of your
                    donation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>
                    Your donation will be put to work immediately to support our
                    programs.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>
                    You'll receive updates about the impact of your contribution.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={handleShare}
              >
                <Share className="mr-2 h-4 w-4" />
                Share Your Support
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                onClick={handleDownloadReceipt}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold mb-4">
                Want to Make an Even Bigger Impact?
              </h2>
              <p className="text-gray-600 mb-6">
                Consider becoming a monthly donor or volunteering your time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/main/donate">Become a Monthly Donor</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/main/volunteer">Volunteer With Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 