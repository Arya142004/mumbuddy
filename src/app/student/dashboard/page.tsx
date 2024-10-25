// app/student/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Student from "@/Models/StudentModel";
import { Connection } from "@/Database/connection";

export default async function StudentDashboard() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  await Connection();
  const studentData = await Student.findOne({ clerkId: user.id });

  if (!studentData) {
    redirect("/studentform");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-violet-100/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={studentData.profileImage || "/default-avatar.png"}
              alt={studentData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-violet-200"
            />
            <div>
              <h1 className="text-3xl font-bold text-violet-900">
                Welcome, {studentData.name}
              </h1>
              <p className="text-violet-600">{studentData.college}</p>
            </div>
          </div>

          {/* Add your dashboard content here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Details */}
            <div className="bg-violet-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-violet-800 mb-4">
                Your Profile
              </h2>
              {/* Add profile details */}
            </div>

            {/* Preferences */}
            <div className="bg-violet-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-violet-800 mb-4">
                Your Preferences
              </h2>
              {/* Add preferences */}
            </div>

            {/* Actions */}
            <div className="bg-violet-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-violet-800 mb-4">
                Quick Actions
              </h2>
              {/* Add action buttons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}