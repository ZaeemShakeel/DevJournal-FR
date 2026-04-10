"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';

export default function NotFound() {
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-xl text-center space-y-12">
        {/* Loader Section */}
        <div className="flex flex-col items-center py-6">
          <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden relative">
            <Loader />
          </div>
          <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] font-bold animate-pulse">
            Searching Database
          </p>
        </div>

        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            Error 404 — Page Not Found
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            You seem to be <span className="text-gradient-primary">lost.</span>
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
            The path you're following doesn't exist. Let's get you back where you belong.
          </p>
        </div>

        {/* Countdown Area */}
        <div className="flex flex-col items-center pt-8">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent mb-8" />
            
            <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-primary font-mono tracking-tighter">{countdown}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Seconds</span>
                </div>
                
                <div className="h-10 w-[1px] bg-slate-200 dark:bg-white/10" />
                
                <div className="text-left">
                    <p className="text-sm font-bold text-slate-900 dark:text-white mb-0 uppercase tracking-wider">Automatic Redirect</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Taking you to the login screen...</p>
                </div>
            </div>

            <button 
                onClick={() => router.push('/login')}
                className="mt-12 text-sm font-black text-primary hover:text-secondary uppercase tracking-[0.2em] transition-all border-b-2 border-primary/20 hover:border-secondary/40 pb-1"
            >
                Login Manually
            </button>
        </div>
      </div>
    </div>
  );
}
