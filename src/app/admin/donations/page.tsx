'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

export default function DonationsAdminPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeduplicating, setIsDeduplicating] = useState(false);
  const [dedupeResult, setDedupeResult] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Load donations function
  const loadDonations = async () => {
    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getSession();
      if (!userData.session) {
        router.push('/auth/login');
        return;
      }
      
      // Fetch donations
      let query = supabase
        .from('donations')
        .select(`
          id, 
          amount, 
          created_at, 
          campaign_id, 
          user_id, 
          anonymous, 
          message,
          order_id,
          payment_intent_id,
          user_profiles(full_name, email),
          campaigns(title)
        `)
        .order('created_at', { ascending: false });
        
      // Apply filters if needed
      if (filter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query = query.gte('created_at', today.toISOString());
      } else if (filter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('created_at', weekAgo.toISOString());
      } else if (filter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('created_at', monthAgo.toISOString());
      }
        
      const { data, error } = await query;
      
      if (error) throw error;
      
      setDonations(data || []);
    } catch (err) {
      console.error('Error loading donations:', err);
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  // Load donations on component mount and when filter changes
  useEffect(() => {
    loadDonations();
  }, [router, supabase, filter]);

  // Handle search with debounce
  const debouncedSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
  }, 300);

  // Filter donations based on search term
  const filteredDonations = donations.filter(donation => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const userName = donation.user_profiles?.full_name || 'Anonymous';
    const campaignName = donation.campaigns?.title || 'No Campaign';
    
    return (
      userName.toLowerCase().includes(searchLower) ||
      campaignName.toLowerCase().includes(searchLower) ||
      donation.amount.toString().includes(searchLower) ||
      (donation.order_id && donation.order_id.toLowerCase().includes(searchLower))
    );
  });

  // Group donations by user, amount, and day to find potential duplicates
  const findPotentialDuplicates = () => {
    const groups = new Map();
    
    for (const donation of donations) {
      const date = new Date(donation.created_at);
      const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const groupKey = `${donation.user_id}_${donation.amount}_${dayKey}`;
      
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      
      groups.get(groupKey).push(donation);
    }
    
    const duplicates = [];
    
    for (const [key, group] of groups.entries()) {
      if (group.length > 1) {
        duplicates.push(group);
      }
    }
    
    return duplicates;
  };

  // Find potential duplicates
  const potentialDuplicates = findPotentialDuplicates();

  // Add handler for deduplication
  const handleDeduplicate = async () => {
    try {
      setIsDeduplicating(true);
      setDedupeResult(null);
      
      // Get session for auth
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      
      if (!token) {
        toast.error('Authentication error. Please login again.');
        return;
      }
      
      // Call the cleanup API
      const response = await fetch('/api/admin/cleanup-donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to clean up duplicates');
      }
      
      setDedupeResult(result);
      
      // Show success message
      if (result.duplicatesRemoved > 0) {
        toast.success(`Removed ${result.duplicatesRemoved} duplicate donations`);
      } else {
        toast.info('No duplicate donations found');
      }
      
      // Refresh the donation list
      loadDonations();
    } catch (error) {
      console.error('Error deduplicating donations:', error);
      toast.error('Failed to clean up duplicates');
      setError('Failed to clean up duplicates');
    } finally {
      setIsDeduplicating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Donation Management</h1>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pb-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded ${filter === 'today' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setFilter('week')}
              className={`px-4 py-2 rounded ${filter === 'week' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              This Week
            </button>
            <button 
              onClick={() => setFilter('month')}
              className={`px-4 py-2 rounded ${filter === 'month' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              This Month
            </button>
          </div>
          
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search donations..."
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>
        </div>
        
        {/* Deduplication section */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Donation Cleanup</h2>
              <p className="text-sm text-gray-600">
                Remove duplicate donations created by simultaneous payments
              </p>
            </div>
            <button
              onClick={handleDeduplicate}
              disabled={isDeduplicating}
              className={`px-4 py-2 rounded bg-blue-500 text-white ${isDeduplicating ? 'opacity-75' : 'hover:bg-blue-600'}`}
            >
              {isDeduplicating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Cleaning...
                </span>
              ) : (
                'Clean Duplicates'
              )}
            </button>
          </div>
          
          {dedupeResult && (
            <div className={`mt-2 p-2 rounded text-sm ${dedupeResult.duplicatesRemoved > 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {dedupeResult.message}
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Donations table */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-500 mb-2">
              Showing {filteredDonations.length} of {donations.length} donations
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Donor</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Campaign</th>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map(donation => (
                    <tr key={donation.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{new Date(donation.created_at).toLocaleString()}</td>
                      <td className="px-4 py-2">{donation.anonymous ? 'Anonymous' : (donation.user_profiles?.full_name || 'Unknown')}</td>
                      <td className="px-4 py-2">${donation.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{donation.campaigns?.title || 'General'}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{donation.order_id || '-'}</td>
                      <td className="px-4 py-2 text-sm text-gray-600">{donation.payment_intent_id || '-'}</td>
                    </tr>
                  ))}
                  
                  {filteredDonations.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                        No donations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 