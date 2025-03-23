"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import MainLayout from "@/components/layout/MainLayout";
import { Volunteer } from "@/lib/services/supabase";
import { supabaseService } from "@/lib/services/supabase";
import { format } from "date-fns";
import { Users } from "lucide-react";

export default function VolunteerPage() {
  const { user } = useSupabase();
  const [volunteerWork, setVolunteerWork] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteerWork = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabaseService.supabase
          .from('volunteers')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching volunteer work:', JSON.stringify(error));
          throw error;
        }
        setVolunteerWork(data || []);
      } catch (error) {
        console.error('Error fetching volunteer work:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerWork();
  }, [user]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Volunteer Work</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : volunteerWork.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">You haven't registered for any volunteer work yet.</p>
            <a
              href="/main/volunteer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Find volunteer opportunities
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {volunteerWork.map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span className="text-xl font-semibold">
                      {work.role}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">
                    {format(new Date(work.created_at), 'MMMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Thank you for volunteering!</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 