"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Compass, label: 'Explore', href: '/posts' },
    { icon: Plus, label: 'Post', href: '/create', isAction: true },
    { icon: Bell, label: 'Alerts', href: '/notifications' },
    { icon: User, label: 'Account', href: '/dashboard' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 z-50 bg-white/90 dark:bg-[#030712]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-2 pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-full max-w-md mx-auto relative pt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          if (item.isAction) {
            return (
              <div key={item.label} className="relative -top-8 flex flex-col items-center">
                <Link
                  href={item.href}
                  className="w-14 h-14 bg-gradient-to-tr from-primary via-primary to-secondary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/40 ring-[6px] ring-white dark:ring-[#030712] transform hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Plus size={28} strokeWidth={3} className="drop-shadow-sm" />
                </Link>
                <div className="absolute -bottom-6 w-1 h-1 bg-primary rounded-full opacity-0" />
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <div className={`relative ${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                {isActive && (
                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full border-2 border-white dark:border-[#030712]" />
                )}
              </div>
              <span className={`text-[10px] font-black mt-1.5 transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
