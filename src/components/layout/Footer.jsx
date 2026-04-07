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
    <footer className="relative bg-white dark:bg-[#030712] border-t border-slate-200 dark:border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-50" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-indigo-500 to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                DJ
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                DevJournal<span className="text-primary text-5xl leading-none">.</span>
              </span>
            </Link>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              The next-generation community for high-performance developers. Sharing deep insights, system architectures, and the future of tech.
            </p>

            <div className="flex items-center gap-3 py-4 border-y border-slate-100 dark:border-white/5">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#030712] bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + 50}`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <span className="text-primary">120+</span> Devs online
              </div>
            </div>

            <div className="flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-slate-400 dark:text-slate-500 ${social.color} transition-all duration-300 transform hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-slate-400 dark:text-slate-600">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all flex items-center group"
                      >
                        <span className="w-0 h-[1.5px] bg-primary group-hover:w-3 transition-all mr-0 group-hover:mr-2" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 pb-4 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
              © {currentYear} <Link href="/" className="text-primary hover:text-secondary transition-colors">DevJournal</Link> Systems
            </p>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden lg:block" />
            <Link href="/about" className="text-[9px] font-black uppercase text-slate-500 hover:text-primary tracking-[0.1em] transition-colors">
              Meet the Founder
            </Link>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden lg:block" />
            <div className="flex items-center gap-2 px-3 py-1 bg-success/5 border border-success/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase text-success tracking-widest">System Operational</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
             <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
               <ShieldCheck size={13} className="text-secondary opacity-70" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
               <Cpu size={13} className="text-primary opacity-70" />
               <span className="text-[10px] font-bold uppercase tracking-widest">v2.4.0</span>
             </div>
             <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 flex items-center gap-1.5 uppercase tracking-widest">
               Crafted with <Heart size={12} className="text-primary fill-primary animate-pulse" /> by DJ
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

