import Link from "next/link"
import { ArrowRight, Building, GraduationCap } from "lucide-react"

export default function AccountType() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-violet-100 to-indigo-200 border border-t-primary p-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-800 tracking-tight">
        Choose Your Account Type
      </h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <Link href="/agentform" className="flex-1">
          <div className="bg-white shadow-xl text-primary h-full p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-2xl hover:scale-105">
            <Building className="w-16 h-16 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Agent</h2>
            <p className="text-gray-700 mb-6">
              Post available flats and connect with students looking for accommodation in Mumbai. Share detailed listings with rent, location, amenities, and images to help students find their perfect place.
            </p>
            <span className="inline-flex items-center text-indigo-600 font-semibold">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>
        </Link>
        <Link href="/studentform" className="flex-1">
          <div className="bg-white shadow-xl text-primary h-full p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-2xl hover:scale-105">
            <GraduationCap className="w-16 h-16 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-indigo-800">Student</h2>
            <p className="text-gray-700 mb-6">
              Browse through a variety of flat listings and get in touch with agents directly. Find your ideal accommodation in Mumbai, filter by location, budget, and amenities, and schedule visits through our platform.
            </p>
            <span className="inline-flex items-center text-indigo-600 font-semibold">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}