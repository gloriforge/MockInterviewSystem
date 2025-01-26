import Header from "@/app/dashboard/_components/Header";
import { SignIn } from "@clerk/nextjs";
import { CheckCircle, Monitor, Mic, FileText, Star, Code } from "lucide-react";
import AnimationStage from "@/app/(auth)/_components/AnimationStage";

const interviewElements = [
  { icon: Mic, text: "Mock Interview", color: "text-indigo-600" },
  { icon: Code, text: "Tech Prep", color: "text-purple-600" },
  { icon: FileText, text: "AI Powered Review", color: "text-green-600" },
  { icon: Star, text: "Skill Assessment", color: "text-yellow-500" },
];

export default function Page() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-220px)]">
      <Header />

      <section className="flex-grow bg-white">
        <div className="lg:grid lg:h-full lg:grid-cols-12">
          {/* Left section with black background and text at the bottom */}
          <section className="relative flex flex-col justify-end bg-gray-900 lg:col-span-5 lg:min-h-[calc(100vh-165px)] xl:col-span-6 p-12 items-end">
            <div className="lg:block">
              {/* Left-side content with text aligned at the bottom */}

              <AnimationStage />

              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to AI-Powered Interview Preparation
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Prepare yourself for success with personalized practice sessions that enhance your interview skills and boost your confidence.
              </p>
            </div>
          </section>

          {/* Right section with the sign-in form */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              {/* Importing sign-in authentication from clerk */}
              <SignIn
                appearance={{
                  layout: {
                    unsafe_disableDevelopmentModeWarnings: true,
                  },
                  elements: {
                    footerPagesLink: "hidden",
                  },
                }}
              />
            </div>
          </main>
        </div>
      </section>

      {/* Footer or other components would go below */}
    </div>
  );
}