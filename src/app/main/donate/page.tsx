"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Heart, DollarSign } from "lucide-react";
import { supabaseService } from "@/lib/services/supabase";

const donationSchema = z.object({
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a number",
    })
    .refine((val) => Number(val) >= 5, {
      message: "Minimum donation amount is $5",
    }),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const predefinedAmounts = [10, 25, 50, 100, 250, 500];

export default function DonatePage() {
  const router = useRouter();
  const { user } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "25",
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount.toString());
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    form.setValue("amount", e.target.value);
  };

  async function onSubmit(data: DonationFormValues) {
    if (!user) {
      toast.error("Please sign in to make a donation");
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      // Get the current session to extract the access token
      const { data: sessionData } = await supabaseService.supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      
      if (!accessToken) {
        throw new Error("Unable to get authentication token");
      }
      
      // Get current origin to create dynamic success/cancel URLs
      const origin = window.location.origin;
      console.log("Current origin for donation return URLs:", origin);
      
      // Call the ShurjoPay checkout API with the authorization header
      const response = await fetch("/api/shurjopay/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: parseFloat(data.amount),
          // Use dynamic origin to create return URLs
          successUrl: `${origin}/main/donate/success`,
          cancelUrl: `${origin}/main/donate`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create checkout session");
      }

      // Log the payment ID for debugging
      console.log("Payment initiated with order ID:", result.orderId);

      // Redirect to ShurjoPay checkout
      window.location.href = result.url;
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Make a Donation
              </h1>
              <p className="text-lg text-gray-600">
                Your generosity helps us create lasting change in communities
                around the world. Every donation, no matter the size, makes a
                difference.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Select Donation Amount
                    </h2>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={
                            selectedAmount === amount ? "default" : "outline"
                          }
                          className="h-14"
                          onClick={() => handleAmountSelect(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <Input
                                type="text"
                                placeholder="Enter amount"
                                className="pl-10"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleCustomAmount(e);
                                }}
                                value={field.value}
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Minimum donation amount is $5
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Processing..."
                        : `Donate ${
                            form.getValues("amount") || "0"
                          }`}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p className="mb-2">
                Your donation is tax-deductible to the extent allowed by law.
              </p>
              <p>
                Bright Hope is a registered 501(c)(3) nonprofit organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 