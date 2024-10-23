"use client";
import {
  topCollegesInMumbai,
  topLocationsInMumbai,
  flatmatePreferences,
  studentBudgetForFlats,
} from "@/lib/userneeds";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check, ChevronDown, Upload } from "lucide-react";
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
import { useState } from "react";

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
      formData.append("upload_preset", "mumbuddy"); // Replace with your upload preset

      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/diybc1lun/image/upload`, // Replace with your cloud name
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enter Your Details</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>College</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
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
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preflocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your preffered Locations</FormLabel>
                <MultiSelect
                  isMulti
                  value={field.value}
                  onChange={field.onChange}
                  options={topLocationsInMumbai}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Locations"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your Flatmate Preferences</FormLabel>
                <MultiSelect
                  isMulti
                  value={field.value}
                  onChange={field.onChange}
                  options={flatmatePreferences}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Your Preferences"
                />
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select your preffered Budget</FormLabel>
                <MultiSelect
                  isMulti
                  value={field.value}
                  onChange={field.onChange}
                  options={studentBudgetForFlats}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Budget"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center gap-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    )}
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
                        variant="outline"
                        onClick={() =>
                          document.getElementById("imageUpload")?.click()
                        }
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload Image"}
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
