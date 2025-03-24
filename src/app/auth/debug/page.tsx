"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AuthDebugPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const checkAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/auth/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to check account status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      // Call the Supabase client directly to resend verification
      const { data, error } = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "signup" }),
      }).then(res => res.json());
      
      if (error) throw new Error(error.message);
      
      setResult({
        ...result,
        message: "Verification email has been resent. Please check your inbox."
      });
    } catch (error) {
      console.error("Error resending verification:", error);
      setError(error instanceof Error ? error.message : "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Auth Debugger</CardTitle>
          <CardDescription>
            Check your account status and troubleshoot login issues
          </CardDescription>
        </CardHeader>
        <form onSubmit={checkAccount}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="debug-email">Email</Label>
              <Input
                id="debug-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {result && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Account Status:</h3>
                <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                
                {result.exists === true && result.email_confirmed === false && (
                  <div className="mt-4">
                    <p className="text-sm text-amber-600 mb-2">
                      Your email has not been confirmed. 
                      Click below to resend the verification email.
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleResendVerification}
                      disabled={loading}
                    >
                      Resend Verification Email
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Checking..." : "Check Account Status"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 