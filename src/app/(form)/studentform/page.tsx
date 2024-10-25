"use client";
import {
  topCollegesInMumbai,
  topLocationsInMumbai,
  flatmatePreferences,
  studentBudgetForFlats,
} from "@/lib/userneeds";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronDown, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import MultiSelect from "react-select";
import {
  Form,
  FormControl,
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
import router from "next/router";

const formSchema = z.object({
  name: z.string().min(2, "name must be of atleast 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  college: z.string(),
  preflocation: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Please select at least one location"),
  preferences: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Please select at least one preference"),
  budget: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, "Please select at least one preference"),
  profileImage: z.string(),
});

const StudentForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      college: "",
      preflocation: [],
      preferences: [],
      budget: [],
      profileImage: "",
      description: "",
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mumbuddy");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/diybc1lun/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
      form.setValue("profileImage", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");

      console.log("Submitting data:", data);

      const response = await axios.post("/api/students", data);

      toast.success("Profile created successfully!");
      form.reset();
      setImageUrl("");
      router.push("/student/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to create profile"
        : "Failed to create profile";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100/30 py-12 px-4">
      <Toaster position="top-center" />
      <Card className="max-w-3xl mx-auto shadow-xl border-violet-200 backdrop-blur-sm bg-white/90">
        <CardHeader className="space-y-2 bg-gradient-to-r from-violet-100 to-violet-50 rounded-t-lg border-b border-violet-100 px-8 py-6">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-violet-900 to-violet-700 bg-clip-text text-transparent">
            Create Your Profile
          </CardTitle>
          <p className="text-violet-600 text-center text-lg font-medium">
            Find Your Perfect Flatmate Match
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Image Section */}
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-4">
                    <FormLabel className="text-violet-800 text-lg font-semibold">
                      Profile Photo
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-40 h-40 rounded-full border-4 border-violet-200 overflow-hidden bg-violet-50 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Upload className="w-12 h-12 text-violet-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageUpload"
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              document.getElementById("imageUpload")?.click()
                            }
                            disabled={uploading}
                            className="bg-violet-100 hover:bg-violet-200 text-violet-700 font-medium rounded-full px-6 py-2 transition-colors"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploading ? "Uploading..." : "Upload Photo"}
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Personal Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="college"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-violet-800 font-medium">
                        College
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between rounded-lg border-violet-200 hover:border-violet-300 hover:bg-violet-50 transition-colors",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? topCollegesInMumbai.find(
                                    (clg) => clg.value === field.value
                                  )?.label
                                : "Select college"}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className="rounded-lg border border-violet-100">
                            <CommandInput
                              placeholder="Search college..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No college found.</CommandEmpty>
                              <CommandGroup>
                                {topCollegesInMumbai.map((clg) => (
                                  <CommandItem
                                    key={clg.value}
                                    value={clg.label}
                                    onSelect={() => {
                                      form.setValue("college", clg.value);
                                    }}
                                    className="hover:bg-violet-50"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        clg.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {clg.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preferences Section */}
              <div className="space-y-6">
                <div className="bg-violet-50 p-6 rounded-xl space-y-6">
                  <h3 className="text-xl font-semibold text-violet-800 mb-4">
                    Your Preferences
                  </h3>
                  <FormField
                    control={form.control}
                    name="preflocation"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-violet-800 font-medium">
                          Preferred Locations
                        </FormLabel>
                        <MultiSelect
                          isMulti
                          value={field.value}
                          onChange={field.onChange}
                          options={topLocationsInMumbai}
                          className="rounded-lg"
                          classNamePrefix="select"
                          placeholder="Select locations..."
                        />
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-violet-800 font-medium">
                          Flatmate Preferences
                        </FormLabel>
                        <MultiSelect
                          isMulti
                          value={field.value}
                          onChange={field.onChange}
                          options={flatmatePreferences}
                          className="rounded-lg"
                          classNamePrefix="select"
                          placeholder="Select preferences..."
                        />
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-violet-800 font-medium">
                          Budget Range
                        </FormLabel>
                        <MultiSelect
                          isMulti
                          value={field.value}
                          onChange={field.onChange}
                          options={studentBudgetForFlats}
                          className="rounded-lg"
                          classNamePrefix="select"
                          placeholder="Select budget range..."
                        />
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description Section */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-violet-800 font-medium">
                      About You
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself, your interests, and what you're looking for in a flatmate..."
                        className="resize-none min-h-[150px] rounded-lg border-violet-200 focus:border-violet-400 focus:ring-violet-400 hover:border-violet-300 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-6 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Profile..." : "Create Profile"}
              </Button>
              {submitError && (
                <p className="text-red-500 text-center mt-2">{submitError}</p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForm;
