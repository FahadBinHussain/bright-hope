"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { Check, ArrowLeft, UserCircle, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { supabaseService } from "@/lib/services/supabase";

export default function DonationSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [specificError, setSpecificError] = useState<string | null>(null);
  const [debug, setDebug] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);
  const { user } = useSupabase();
  
  // Define verifyDonation outside useEffect so it can be referenced elsewhere
  const verifyDonation = async () => {
    setLoading(true);
    setSpecificError(null);
    try {
      // Get order_id from search params (this might be malformed)
      const rawOrderId = searchParams.get('order_id');
      
      // Handle case where order_id has another '?order_id=' in it 
      // (malformed URL like ?order_id=SP-5c3daedb?order_id=SP67e10a228d927)
      let order_id = rawOrderId;
      if (rawOrderId && rawOrderId.includes('?order_id=')) {
        // Extract the second order_id which is likely the correct one
        const parts = rawOrderId.split('?order_id=');
        order_id = parts[1] || parts[0]; // Use the second part if it exists, otherwise first part
        console.log('Fixed malformed order_id:', {original: rawOrderId, fixed: order_id});
      }
      
      // Collect debug information
      const debugInfo = {
        url: window.location.href,
        origin: window.location.origin,
        search: window.location.search,
        pathname: window.location.pathname,
        isLoggedIn: !!user,
        userId: user?.id,
        userEmail: user?.email,
        orderId: order_id,
        rawOrderId: rawOrderId
      };
      setDebug(debugInfo);
      
      // Check the URL again as one more precaution
      console.log("In verifyDonation:", debugInfo);
      
      // Alternative way to get the order_id from URL to ensure we get a clean value
      const urlParams = new URLSearchParams(window.location.search);
      const urlOrderId = urlParams.get('order_id');
      
      // If the URL parameter is malformed, parse it manually
      let manualOrderId = null;
      const searchStr = window.location.search;
      if (searchStr.includes('?order_id=')) {
        // Find the last occurrence of ?order_id= which is likely the correct one
        const lastIndex = searchStr.lastIndexOf('?order_id=');
        if (lastIndex !== -1) {
          const afterOrderId = searchStr.substring(lastIndex + '?order_id='.length);
          // Take everything up to the next & or ? if present
          manualOrderId = afterOrderId.split(/[?&]/)[0];
          console.log('Manually extracted order_id:', manualOrderId);
        }
      }
      
      // Use whichever order_id we can find, prioritizing manual extraction for malformed URLs
      const finalOrderId = manualOrderId || order_id || urlOrderId || window.location.pathname.split('/').pop();
      
      if (!finalOrderId) {
        console.error('No order_id found in URL');
        setLoading(false);
        setVerificationResult({ success: false, error: 'No order ID found in URL' });
        return;
      }
      
      console.log('Verifying donation with order_id:', finalOrderId);
      
      // First check if user is logged in, if not try to recover session
      if (!user) {
        console.log('User not logged in, trying to recover session');
        try {
          const { data: sessionData } = await supabaseService.supabase.auth.getSession();
          console.log('Session recovery result:', sessionData);
          // Continue with verification even if session recovery fails
        } catch (sessionError) {
          console.error('Error recovering session:', sessionError);
        }
      }
      
      // Call our API to verify payment and ensure it's saved
      let response;
      try {
        response = await fetch('/api/shurjopay/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_id: finalOrderId }),
        });
      } catch (fetchError) {
        console.error('Network error during fetch:', fetchError);
        setDebug((prev: any) => ({ 
          ...prev, 
          fetchError: fetchError instanceof Error ? fetchError.message : 'Unknown network error'
        }));
        setVerificationResult({ 
          success: false, 
          error: 'Network error while verifying payment. Please check your connection and try again.'
        });
        return;
      }
      
      // Check if the request was successful at a network level
      if (!response.ok) {
        // Try to get the error details if possible
        let errorDetails;
        try {
          // Try to parse as JSON, but it might not be JSON
          errorDetails = await response.json();
        } catch (parseError) {
          // If we can't parse as JSON, get the text
          try {
            errorDetails = await response.text();
          } catch (textError) {
            errorDetails = `Status: ${response.status} ${response.statusText}`;
          }
        }
        
        console.error('Error response from server:', errorDetails);
        setDebug((prev: any) => ({ 
          ...prev, 
          responseError: `HTTP ${response.status}: ${response.statusText}`,
          responseDetails: errorDetails
        }));
        
        // Check for specific error types
        if (errorDetails && typeof errorDetails === 'object' && errorDetails.error === "Missing user ID in payment data") {
          setSpecificError("missing_user_id");
        }
        
        setVerificationResult({ 
          success: false, 
          error: errorDetails && typeof errorDetails === 'object' ? errorDetails.error : `Server error: ${response.status} ${response.statusText}`
        });
        return;
      }
      
      // Check if the response content type is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Handle the case where we didn't get a JSON response
        let responseText;
        try {
          responseText = await response.text();
        } catch (textError) {
          responseText = "Could not read response body";
        }
        
        console.error('Non-JSON response received:', responseText);
        setDebug((prev: any) => ({ 
          ...prev, 
          responseError: 'Non-JSON response received',
          responseText
        }));
        
        setVerificationResult({ 
          success: false, 
          error: 'Server returned an invalid response format. Please try again later.'
        });
        return;
      }
      
      // Now parse the JSON, this should be safe since we've verified it's JSON
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        setDebug((prev: any) => ({ 
          ...prev, 
          jsonError: jsonError instanceof Error ? jsonError.message : 'Unknown JSON parsing error'
        }));
        setVerificationResult({ 
          success: false, 
          error: 'Error processing server response. Please try again later.'
        });
        return;
      }
      
      console.log('Verification response:', JSON.stringify(responseData));
      setDebug((prev: any) => ({ ...prev, responseData }));
      
      // Handle successful verification
      if (responseData.success) {
        console.log('Payment verification successful');
        setVerificationResult({ success: true });
        
        // Wait a moment to ensure backend processing completes
        // before redirecting to the donations page
        setTimeout(() => {
          // Use router for Next.js navigation
          router.push('/main/dashboard/donations');
        }, 3000);
      } else {
        console.error('Payment verification failed:', responseData.error);
        
        // Check for specific error types
        if (responseData.error === "Missing user ID in payment data") {
          setSpecificError("missing_user_id");
        }
        
        setVerificationResult({ 
          success: false, 
          error: responseData.error || 'Payment verification failed' 
        });
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      
      // Store the full error information for debugging
      const errorDetail = error instanceof Error 
        ? { message: error.message, stack: error.stack, name: error.name } 
        : 'Unknown error structure';
      
      setDebug((prev: any) => ({ 
        ...prev, 
        error: errorDetail,
        errorType: error instanceof SyntaxError ? 'SyntaxError' : error instanceof Error ? error.constructor.name : typeof error
      }));
      
      setVerificationResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during verification'
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    document.title = "Donation Successful | Bright Hope";
    
    // Fix malformed URL where order_id contains another ?order_id=
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const orderIdParam = searchParams.get('order_id');
    
    if (orderIdParam && orderIdParam.includes('?order_id=')) {
      // Extract the correct order_id (likely the second one)
      const parts = orderIdParam.split('?order_id=');
      const correctOrderId = parts[1] || parts[0];
      
      // Create a clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('order_id');
      url.searchParams.append('order_id', correctOrderId);
      
      // Replace the URL in the browser without refreshing
      window.history.replaceState({}, '', url.toString());
    }
    
    // Check if we were redirected to port 10000 and fix it
    if (window.location.port === "10000") {
      // Save the order_id
      const order_id = searchParams.get('order_id');
      
      // Redirect to port 3000 with the same path and parameters
      const correctUrl = `http://localhost:3000${window.location.pathname}${window.location.search}`;
      window.location.href = correctUrl;
      return;
    }
    
    // First, check if user is logged in if there's a missing user ID error
    if (specificError === "missing_user_id" && !user) {
      // If we're showing a "missing user ID" error and there's no user,
      // prompt them to log in
      router.push('/auth/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }
    
    // Call the verification function when component mounts
    verifyDonation();
  }, [searchParams, router, specificError, user]);
  
  // Helper function to get an appropriate error message
  const getErrorMessage = () => {
    if (!verificationResult?.error) {
      return "Your donation is being processed. If you have any questions, please contact our support team.";
    }
    
    if (specificError === "missing_user_id") {
      return "We couldn't associate this donation with your account. Please ensure you're logged in with the same account you used during donation.";
    }
    
    return verificationResult.error;
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your generous support helps us continue our mission of making a positive impact in communities around the world.
          </p>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <p className="mt-4 text-blue-600">Verifying your donation...</p>
            </div>
          ) : verificationResult?.success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 inline-block">
              <p className="text-green-700">Your donation has been successfully processed.</p>
              <p className="text-sm mt-2">Redirecting to your donations page...</p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 inline-block">
              <p className="text-yellow-700">
                {getErrorMessage()}
              </p>
              
              {specificError === "missing_user_id" && user && (
                <div className="mt-3 text-sm">
                  <p className="text-gray-700 mb-2">
                    Your payment may have been processed, but we couldn't link it to your account.
                  </p>
                  <div className="flex justify-center space-x-3 mt-2">
                    <Button onClick={() => router.push('/main/profile')} variant="outline" size="sm" className="flex items-center">
                      <UserCircle className="mr-1 h-4 w-4" />
                      Check Profile
                    </Button>
                  </div>
                </div>
              )}
              
              <Button onClick={() => verifyDonation()} className="mt-3 bg-yellow-500 hover:bg-yellow-600">
                Try Again
              </Button>
              
              <div className="mt-3 text-xs text-gray-500">
                <button 
                  onClick={() => setShowDebug(!showDebug)} 
                  className="flex items-center justify-center mx-auto text-gray-500 hover:text-gray-700"
                >
                  <Bug className="h-3 w-3 mr-1" /> 
                  {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
                </button>
                
                {showDebug && debug && (
                  <div className="mt-2 bg-gray-100 p-2 rounded text-left overflow-auto max-h-60">
                    <pre className="text-xs">{JSON.stringify(debug, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <Button onClick={() => router.push('/main/donate')} variant="outline" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Make Another Donation</span>
          </Button>
          
          <Button onClick={() => router.push('/main/dashboard/donations')} variant="secondary" className="flex items-center space-x-2">
            <span>View My Donations</span>
          </Button>
          
          <Button onClick={() => router.push('/main')} variant="link" className="text-primary">
            Return to Home
          </Button>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-semibold mb-4">What Your Donation Supports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Community Development</h3>
              <p className="text-gray-600 text-sm">Supporting infrastructure and resources for communities in need.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Education Programs</h3>
              <p className="text-gray-600 text-sm">Providing learning opportunities for children and adults.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Healthcare Initiatives</h3>
              <p className="text-gray-600 text-sm">Improving access to healthcare services in underserved areas.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 