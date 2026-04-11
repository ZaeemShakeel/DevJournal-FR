"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Menu, X, LogOut, LayoutDashboard, Home, User as UserIcon, LogIn, UserPlus, Search, Compass } from 'lucide-react';
import Button from '../ui/Button';
import { getInitials } from '@/utils/textTruncate';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Feed', href: '/posts', icon: Compass },
    ...(isAuthenticated ? [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }] : []),
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg transform group-hover:rotate-12 transition-transform">
              DJ
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DevJournal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    pathname === link.href ? 'text-primary' : 'text-text-light dark:text-text-dark'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-border-light dark:bg-border-dark" />

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="relative group hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  className="pl-10 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs focus:ring-2 focus:ring-primary/50 outline-none w-48 transition-all focus:w-64"
                />
              </div>

              <ThemeToggle />

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full border border-border-light dark:border-border-dark hover:shadow-md transition-all">
                    {user?.profilePic ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm">
                        <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {getInitials(user?.name)}
                      </div>
                    )}
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-card-light dark:bg-card-dark rounded-xl shadow-xl border border-border-light dark:border-border-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                    <div className="p-3 border-b border-border-light dark:border-border-dark">
                      <p className="text-sm font-bold">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <LayoutDashboard size={16} /> My Dashboard
                      </Link>
                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-error rounded-lg hover:bg-error/10 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="p-2 text-text-light dark:text-text-dark"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 top-[76px] bg-white dark:bg-slate-900 z-50 md:hidden transition-all duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-bold p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <link.icon size={20} className="text-primary" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-border-light dark:bg-border-dark" />

          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                {user?.profilePic ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                    <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                    {getInitials(user?.name)}
                  </div>
                )}
                <div>
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 p-4 text-error font-bold rounded-xl bg-error/10"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="secondary" className="w-full">Login</Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="primary" className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
