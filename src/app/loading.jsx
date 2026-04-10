"use client";

import Loader from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div className="relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden relative">
                <Loader />
            </div>
            <div className="mt-8 flex flex-col items-center space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] animate-pulse">
                    DevJournal
                </h3>
                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest">
                    Initializing Environment
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
