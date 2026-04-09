"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getInitials } from '@/utils/textTruncate';
import ThemeToggle from './ThemeToggle';
import { Search, Menu, X, Settings, LogOut, LayoutDashboard, User, Bell } from 'lucide-react';

const MobileHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-4 pointer-events-none">
        <div className={`mx-auto max-w-md w-full h-14 flex items-center justify-between px-3 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-white/5 rounded-full transition-all duration-500 pointer-events-auto shadow-2xl shadow-black/5 ${scrolled ? 'scale-95' : 'scale-100'}`}>
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center focus:outline-none"
            >
              {isAuthenticated ? (
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-black ring-2 ring-primary/20 shadow-lg">
                  {getInitials(user?.name)}
                </div>
              ) : (
                <div className="p-2.5 text-slate-600 dark:text-slate-400">
                  <Menu size={22} />
                </div>
              )}
            </button>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-black text-[11px] shadow-lg shadow-primary/20">
              DJ
            </div>
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">
              DevJournal
            </span>
          </Link>

          <div className="flex items-center">
            <button className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors focus:outline-none">
              <Search size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-slate-950 z-[70] md:hidden transition-transform duration-300 ease-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-black text-slate-900 dark:text-white">Account Info</span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400">
              <X size={24} />
            </button>
          </div>

          {isAuthenticated ? (
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-xl font-black mb-4 shadow-lg shadow-primary/20">
                {getInitials(user?.name)}
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{user?.name}</h3>
              <p className="text-sm text-slate-500 truncate mb-4">{user?.email}</p>
              
              <div className="flex gap-4">
                <div>
                  <span className="font-black text-slate-900 dark:text-white">124</span>
                  <span className="text-xs text-slate-500 ml-1">Following</span>
                </div>
                <div>
                  <span className="font-black text-slate-900 dark:text-white">1.2K</span>
                  <span className="text-xs text-slate-500 ml-1">Followers</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-4">Join the community to start sharing your journey.</p>
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsSidebarOpen(false)} className="w-full py-3 px-4 bg-primary text-white text-center rounded-xl font-bold text-sm shadow-lg shadow-primary/20">
                  Log in
                </Link>
                <Link href="/signup" onClick={() => setIsSidebarOpen(false)} className="w-full py-3 px-4 border border-slate-200 dark:border-white/10 text-center rounded-xl font-bold text-sm">
                  Sign up
                </Link>
              </div>
            </div>
          )}

          <div className="mb-6 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Theme mode</span>
            <ThemeToggle />
          </div>

          <nav className="flex-grow space-y-1">
            {[
              { label: 'Profile', href: '/dashboard', icon: User, color: 'text-primary' },
              { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-secondary' },
              { label: 'Notifications', href: '/notifications', icon: Bell, color: 'text-accent' },
              { label: 'Settings', href: '/settings', icon: Settings, color: 'text-slate-400' },
            ].map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-4 px-4 py-3 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors"
              >
                <item.icon size={22} className={item.color} /> {item.label}
              </Link>
            ))}
          </nav>

          {isAuthenticated && (
            <button 
              onClick={() => { logout(); setIsSidebarOpen(false); }}
              className="mt-6 flex items-center gap-4 px-4 py-4 text-error font-black border-t border-slate-100 dark:border-white/5"
            >
              <LogOut size={22} /> Log out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
