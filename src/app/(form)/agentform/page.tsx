"use client";
import { topLocationsInMumbai } from "@/lib/userneeds";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Check, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MultiSelect from "react-select";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  agency: z
    .string()
    .min(2, "Agency name must be at least 2 characters")
    .optional(),
});

const AgentForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      agency: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      const response = await axios.post("/api/agents", data);

      toast.success("Profile created successfully!");
      form.reset();

      toast.success("Registration successful!");
      // Optionally redirect to another page
      // router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to register. Please try again.");
      toast.error("Failed to register");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100/30 py-12 px-4">
      <Toaster position="top-center" />
      <Card className="max-w-2xl mx-auto shadow-xl border-violet-200 backdrop-blur-sm bg-white/90">
        <CardHeader className="space-y-2 bg-gradient-to-r from-violet-100 to-violet-50 rounded-t-lg border-b border-violet-100 px-8 py-6">
          <div className="flex items-center justify-center mb-2">
            <Building2 className="w-12 h-12 text-violet-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-violet-900 to-violet-700 bg-clip-text text-transparent">
            Agent Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-violet-800 font-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 hover:border-violet-300 transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-violet-800 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 hover:border-violet-300 transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-violet-800 font-medium">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 hover:border-violet-300 transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agency"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-violet-800 font-medium">
                        Agency Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Real Estate Agency"
                          {...field}
                          className="rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 hover:border-violet-300 transition-colors"
                        />
                      </FormControl>
                      <FormDescription className="text-violet-600 text-sm">
                        Optional - Leave blank if you're an independent agent
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-6 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Registering..." : "Register as Agent"}
                </Button>
                {submitError && (
                  <p className="text-red-500 text-center mt-2">{submitError}</p>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentForm;
