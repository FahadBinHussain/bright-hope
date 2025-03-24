"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import MainLayout from "@/components/layout/MainLayout";
import { supabaseService } from "@/lib/services/supabase";
import { Donation, Volunteer } from "@/lib/services/supabase";
import { DollarSign, Users, UserCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function DashboardPage() {
  const { user } = useSupabase();
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalVolunteerWork: 0,
    recentDonations: [] as Donation[],
    recentVolunteerWork: [] as Volunteer[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        console.log('No user found, skipping data fetch');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching donations for user:', user.email, 'with ID:', user.id);
        // Fetch donations with retry mechanism
        let donations = null;
        let donationsError = null;
        let attempts = 0;
        
        while (attempts < 3 && donations === null) {
          attempts++;
          try {
            const { data, error } = await supabaseService.supabase
              .from('donations')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(5);
            
            if (error) {
              console.error(`Attempt ${attempts}: Error fetching donations:`, JSON.stringify(error));
              donationsError = error;
            } else {
              donations = data || [];
              console.log(`Successfully fetched ${donations.length} donations on attempt ${attempts}`);
              
              // Debug log each donation
              donations.forEach((donation, index) => {
                console.log(`Donation ${index + 1}:`, {
                  id: donation.id,
                  amount: donation.amount,
                  created_at: donation.created_at
                });
              });
            }
          } catch (e) {
            console.error(`Attempt ${attempts}: Exception fetching donations:`, e);
          }
          
          if (donations === null && attempts < 3) {
            // Wait a bit before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        if (donations === null) {
          throw new Error(`Failed to fetch donations after ${attempts} attempts: ${donationsError?.message || 'Unknown error'}`);
        }

        console.log('Fetching volunteer work for user:', user.email);
        // Fetch volunteer work
        const { data: volunteerWork, error: volunteerError } = await supabaseService.supabase
          .from('volunteers')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (volunteerError) {
          console.error('Error fetching volunteer work:', JSON.stringify(volunteerError));
          throw new Error(`Failed to fetch volunteer work: ${volunteerError.message}`);
        }

        // Calculate total donations
        const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0) || 0;
        console.log('Total donations calculated:', totalDonations);

        setStats({
          totalDonations,
          totalVolunteerWork: volunteerWork?.length || 0,
          recentDonations: donations,
          recentVolunteerWork: volunteerWork || [],
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Function to format the date for "Member Since"
  const formatMemberSince = () => {
    if (!user || !user.created_at) return 'Unknown';
    
    try {
      return format(new Date(user.created_at), 'MMM yyyy');
    } catch (error) {
      console.error('Error formatting created_at date:', error);
      return 'Unknown';
    }
  };

  const dashboardLinks = [
    {
      title: "My Donations",
      description: "View your donation history and impact",
      href: "/main/dashboard/donations",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Volunteer Work",
      description: "Track your volunteer activities",
      href: "/main/dashboard/volunteer",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "My Profile",
      description: "Manage your account settings",
      href: "/main/dashboard/profile",
      icon: UserCircle,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading dashboard data...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-600">
            Welcome back, {user?.email}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Total Donations</h3>
                <p className="text-2xl font-bold text-blue-500">
                  ${stats.totalDonations.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Volunteer Activities</h3>
                <p className="text-2xl font-bold text-green-500">
                  {stats.totalVolunteerWork}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Member Since</h3>
                <p className="text-2xl font-bold text-purple-500">
                  {formatMemberSince()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${link.color} bg-opacity-10`}>
                  <link.icon className={`h-6 w-6 ${link.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
            {stats.recentDonations.length === 0 ? (
              <p className="text-gray-600">No recent donations</p>
            ) : (
              <div className="space-y-4">
                {stats.recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">${donation.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(donation.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <DollarSign className="h-5 w-5 text-blue-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Volunteer Work */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Volunteer Work</h2>
            {stats.recentVolunteerWork.length === 0 ? (
              <p className="text-gray-600">No recent volunteer work</p>
            ) : (
              <div className="space-y-4">
                {stats.recentVolunteerWork.map((work) => (
                  <div key={work.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{work.role}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(work.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 