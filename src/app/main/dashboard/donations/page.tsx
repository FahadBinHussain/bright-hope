"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import MainLayout from "@/components/layout/MainLayout";
import { Donation } from "@/lib/services/supabase";
import { supabaseService } from "@/lib/services/supabase";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";

export default function DonationsPage() {
  const { user } = useSupabase();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabaseService.supabase
          .from('donations')
          .select('*')
          .eq('donor_email', user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDonations(data || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Donations</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : donations.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-600">You haven&apos;t made any donations yet.</p>
            <a
              href="/main/donate"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Make your first donation
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-primary mr-2" />
                    <span className="text-xl font-semibold">
                      ${donation.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {format(new Date(donation.created_at), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Thank you for your support!</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 