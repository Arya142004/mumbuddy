import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignInButton } from "@clerk/nextjs";
import { MapPin, GraduationCap, IndianRupee } from "lucide-react";



export default function Homepage() {
 
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-primary">
        <h1 className="text-4xl font-bold mb-4 text-primary-foreground">
          Find Your Perfect Flatmate in Mumbai
        </h1>
        <p className="text-xl mb-8 text-primary-foreground/80">
          Connect with like-minded students and share your living space
        </p>
        <Button size="lg" variant="secondary" className="text-primary">
          <SignInButton>
          Get Started
          </SignInButton>
        </Button>
      </section>

      {/* Search Bar */}
      <section className="py-10 px-4 bg-violet-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="andheri">Andheri</SelectItem>
                <SelectItem value="bandra">Bandra</SelectItem>
                <SelectItem value="powai">Powai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
                <SelectItem value="15000+">₹15,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">University of Mumbai</SelectItem>
                <SelectItem value="iit">IIT Bombay</SelectItem>
                <SelectItem value="nmims">NMIMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Search</Button>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 px-4 bg-slate-100">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary">
          Popular Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Powai",
              rate: "₹12,000",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSrFTkgtEKbhZW0kBDEEZGLy2otC3lF52jw&s",
            },
            {
              name: "Bandra",
              rate: "₹15,000",
              image:
                "https://www.thehivehostels.com/uploads/gallery/PHOTO-2023-06-18-11-12-42.jpg",
            },
            {
              name: "Andheri",
              rate: "₹10,000",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDS4STw6j7EhNasF-zRugFSqgsnzmGPy5Ow&s",
            },
            {
              name: "Juhu",
              rate: "₹18,000",
              image:
                "https://www.thehivehostels.com/uploads/gallery/PHOTO-2023-06-18-11-12-44.jpg",
            },
            {
              name: "Dadar",
              rate: "₹14,000",
              image:
                "https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-mumbai/PRT555/room-on-rent-in-mumbai/pg-in-santacruz-east_1722852861.jpg",
            },
            {
              name: "Chembur",
              rate: "₹11,000",
              image:
                "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1648467631/Website/CMS-Uploads/c8jfbhtx2nr0h9j9jfyx.jpg",
            },
          ].map((location, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  {location.name}
                </h3>
                <p className="text-sm text-violet-400 flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1" /> {location.rate} /
                  month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-violet-100">
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary">
          What Our Users Say
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center ">
              <p className="text-lg  mb-4">
                "I found my best friend and perfect flatmate through this
                website. It's been an amazing experience!"
              </p>
              <p className="text-sm font-semibold text-primary">
                - Aisha, Mumbai University
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm mb-4 sm:mb-0">
            © 2024 Mumbai Flatmate Finder. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm hover:text-primary-foreground/80 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary-foreground/80 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
