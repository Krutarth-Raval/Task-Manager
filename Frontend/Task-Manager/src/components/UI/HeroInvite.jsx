import React from "react";
import { Zap, Eye, Users2 } from "lucide-react";

const HeroInvite = () => {
  return (
    <section className="relative px-4 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-red-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                🚀 Invitation Required
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  Exclusive
                </span>
                <span className="block">Workspace</span>
              </h1>

              <p className="text-xl text-color-light font-light leading-relaxed max-w-md">
                Elite task management for invited members only. Where
                productivity meets precision.
              </p>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                <span className="text-sm font-semibold text-white">
                  FOCUSED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping delay-200"></div>
                <span className="text-sm font-semibold text-white">
                  CONNECTED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-ping delay-500"></div>
                <span className="text-sm font-semibold text-white">
                  SECURE
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Visual elements */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Precision Vision
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Crystal clear task visibility
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 mt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Users2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Elite Teams
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Handpicked collaborators
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105 col-span-2">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Lightning Fast
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Turbocharged productivity workflows
                </p>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 animate-bounce delay-1000"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-full text-white dark:text-gray-900 font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Ready for your invitation code?</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroInvite;
