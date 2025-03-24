"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import MainLayout from "@/components/layout/MainLayout";
import { Donation } from "@/lib/services/supabase";
import { supabaseService } from "@/lib/services/supabase";
import { format } from "date-fns";
import { DollarSign, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DonationsPage() {
  const { user } = useSupabase();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger refetch

  const fetchDonations = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching donations for user ID:', user.id);
      
      const { data, error } = await supabaseService.supabase
        .from('donations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching donations:', error);
        setError(`Failed to fetch donations: ${error.message}`);
        return;
      }
      
      console.log(`Successfully fetched ${data?.length || 0} donations`);
      
      // Debug log each donation
      if (data && data.length > 0) {
        data.forEach((donation, index) => {
          console.log(`Donation ${index + 1}:`, {
            id: donation.id,
            amount: donation.amount,
            created_at: donation.created_at,
            user_id: donation.user_id
          });
        });
      } else {
        console.log('No donations found for this user');
      }
      
      setDonations(data || []);
    } catch (error) {
      console.error('Exception fetching donations:', error);
      setError(`An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [user, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1); // This will trigger a refetch
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Donations</h1>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={handleRefresh} 
                className="text-sm text-red-600 hover:underline mt-2"
              >
                Try again
              </button>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading your donations...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-lg shadow">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">You haven&apos;t made any donations yet.</p>
            <a
              href="/main/donate"
              className="text-blue-600 font-medium hover:underline inline-block"
            >
              Make your first donation
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800">
                <span className="font-medium">Total Donations: </span> 
                ${donations.reduce((sum, donation) => sum + donation.amount, 0).toFixed(2)}
              </p>
            </div>
            
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-lg shadow p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-xl font-semibold">
                      ${donation.amount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {format(new Date(donation.created_at), 'MMMM d, yyyy')}
                  </p>
                  {donation.campaign_id && (
                    <p className="text-xs text-gray-500 mt-1">
                      Campaign ID: {donation.campaign_id}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Thank you for your support!</p>
                  {donation.message && (
                    <p className="text-xs italic text-gray-500 mt-1 max-w-[200px] truncate">
                      "{donation.message}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 