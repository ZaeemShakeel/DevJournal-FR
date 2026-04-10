import React from 'react';
import Link from 'next/link';
import { Twitter, Github, Linkedin, Mail, Heart, Globe, Zap, ShieldCheck, Cpu } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Latest Posts', href: '/' },
        { name: 'Trending Feed', href: '#' },
        { name: 'Developer Network', href: '#' },
        { name: 'Newsletter', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Community Guide', href: '#' },
        { name: 'Open Source', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Use', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Code of Conduct', href: '#' },
        { name: 'Cookie settings', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-white' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-primary' },
  ];

  return (
    <footer className="bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16 overflow-hidden border border-slate-200 dark:border-white/5">
          {/* Left Column: Sharp Square Image with Massive Text Overlay */}
          <div className="relative group h-[500px] bg-slate-100 dark:bg-slate-900">
            <img 
              src="/images/community_hero.png" 
              alt="DevJournal Community" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 dark:brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <h2 className="text-6xl md:text-8xl font-black text-white/90 tracking-tighter leading-none select-none">
                DevJournal<span className="text-primary italic">.</span>
              </h2>
            </div>
          </div>

          {/* Right Column: Content with SVG Canvas Background */}
          <div className="relative flex flex-col justify-between py-12 px-8 md:px-16 bg-white dark:bg-[#030712] overflow-hidden border-l border-slate-100 dark:border-white/5">
            {/* SVG Canvas Background Overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-6 max-w-sm">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary via-indigo-500 to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      DJ
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                      DevJournal<span className="text-primary tracking-normal">.</span>
                    </span>
                  </Link>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    The modern ecosystem for high-performance developers. Documenting the future of software engineering, one journal at a time.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {footerLinks.slice(0, 2).map((group) => (
                    <div key={group.title}>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-primary">
                        {group.title}
                      </h4>
                      <ul className="space-y-2">
                        {group.links.slice(0, 3).map((link) => (
                          <li key={link.name}>
                            <Link href={link.href} className="text-[11px] font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#030712] bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 60}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">120+ Specialists Online</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pl-3.5">Active Contributors</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center py-8 gap-6 px-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
              © {currentYear}
            </span>
            <div className="h-3 w-px bg-slate-200 dark:bg-white/10" />
            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
              DevJournal<span className="text-primary italic">.</span>
            </span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest pl-2">
              Systems Inc.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6 pr-8 border-r border-slate-100 dark:border-white/5">
              {['Privacy', 'Cookies', 'Security'].map(item => (
                <Link key={item} href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6">
              {['FAQs', 'Terms', 'Careers'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-primary transition-colors hover:translate-y-[-1px] transform duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

