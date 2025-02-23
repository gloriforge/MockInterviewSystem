import Header from "@/app/dashboard/_components/Header";
import { SignUp } from "@clerk/nextjs";
import AnimationStage from "@/app/(auth)/_components/AnimationStage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-165px)]">
      <Header />

      <section className="flex-grow bg-white">
        <div className="lg:grid lg:min-h-full lg:grid-cols-12">
          {/* Left section with black background and text at the bottom */}
          <section className="relative flex flex-col justify-end bg-gray-900 lg:col-span-5 lg:min-h-[calc(100vh-165px)] xl:col-span-6 p-12">
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

          {/* Right section with the sign-up form */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              {/* Importing sign-up authentication from Clerk */}
              <SignUp />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
