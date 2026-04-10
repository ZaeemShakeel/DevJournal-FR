"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, LogIn } from 'lucide-react';
import Loader from '@/components/ui/Loader';

const LoginRequiredModal = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      {/* Modal Card */}
      <div className="relative bg-[#121212] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden group">
        {/* Animated Background Gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 blur-[60px] rounded-full group-hover:bg-secondary/30 transition-all duration-700" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="bg-primary/10 p-4 rounded-2xl ring-1 ring-primary/20">
            <Lock className="w-12 h-12 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Protected Dashboard</h2>
            <p className="text-gray-400">
              You need to be logged in to access this page. We're taking you to the login screen.
            </p>
          </div>

          {/* Loader Placeholder */}
          <div className="py-6 w-full flex justify-center">
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
              <Loader />
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/5">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">Redirecting in</span>
            <span className="text-3xl font-mono font-bold text-primary">{countdown}s</span>
          </div>

          <button 
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-black hover:bg-gray-200 rounded-2xl font-semibold transition-all"
          >
            <LogIn className="w-5 h-5" />
            Go to Login Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
