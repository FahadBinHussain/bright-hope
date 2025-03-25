'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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

  // Load donations
  useEffect(() => {
    async function loadDonations() {
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
    }
    
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

  // Handle deduplicate action
  const handleDeduplicate = async () => {
    try {
      setIsDeduplicating(true);
      
      const response = await fetch('/api/admin/cleanup-donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to deduplicate donations');
      }
      
      const result = await response.json();
      setDedupeResult(result);
      
      // Reload the page after deduplication
      if (result.donationsDeleted > 0) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (err) {
      console.error('Error deduplicating donations:', err);
      setError('Failed to deduplicate donations');
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
        {potentialDuplicates.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-4">
            <h2 className="text-xl font-semibold text-amber-800">Potential Duplicates Found</h2>
            <p className="mb-2">
              We found {potentialDuplicates.length} potential duplicate donation groups. 
              These are donations made by the same user, for the same amount, on the same day.
            </p>
            
            <div className="mb-4">
              <h3 className="font-medium">Duplicate groups:</h3>
              <ul className="list-disc pl-6">
                {potentialDuplicates.slice(0, 3).map((group, idx) => (
                  <li key={idx}>
                    {group.length} donations of ${group[0].amount} by {group[0].user_profiles?.full_name || 'User'} on {new Date(group[0].created_at).toLocaleDateString()}
                  </li>
                ))}
                {potentialDuplicates.length > 3 && (
                  <li>...and {potentialDuplicates.length - 3} more</li>
                )}
              </ul>
            </div>
            
            <button
              onClick={handleDeduplicate}
              disabled={isDeduplicating}
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
            >
              {isDeduplicating ? 'Cleaning up...' : 'Clean up duplicates'}
            </button>
            
            {dedupeResult && (
              <div className="mt-2 text-sm">
                {dedupeResult.donationsDeleted > 0 ? (
                  <p className="text-green-600">
                    Successfully removed {dedupeResult.donationsDeleted} duplicate donations! Page will reload shortly.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    No donations were deleted. This may mean the duplicates were already cleaned up.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
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