"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageSquare, Heart, Sparkles, Zap } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';
import PostCard from './PostCard';

const slides = [
  {
    id: 1,
    image: '/images/community_hero.png',
    tag: 'Community',
    title: 'The Modern Hub for Developers',
    description: 'Join a thousand-strong community of builders sharing their daily journey in tech.',
    accent: 'primary'
  },
  {
    id: 2,
    image: '/images/hero1.png',
    tag: 'Knowledge',
    title: 'Flow with Digital Insights',
    description: 'Document your discoveries, from micro-services to front-end performance.',
    accent: 'secondary'
  },
  {
    id: 3,
    image: '/images/hero2.png',
    tag: 'Innovation',
    title: 'Focus. Write. Inspire.',
    description: 'The cleanest markdown experience for developers who value speed and clarity.',
    accent: 'accent'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Ken Burns Effect & Subtle Blur */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[12000ms] ease-out blur-[4px] brightness-[0.7] ${
              index === current ? 'scale-110' : 'scale-100 dark:brightness-50'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Dynamic Mesh Overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
          
          {/* Content Grid */}
          <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 pt-8">
            {/* Left Column: Text & CTAs */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
              <div className="flex items-center gap-2 mb-6 animate-slide-up">
                <span className={`px-3 py-1 rounded-full bg-${slide.accent}/20 border border-${slide.accent}/30 text-${slide.accent} text-[10px] font-black uppercase tracking-[0.2em]`}>
                  {slide.tag}
                </span>
                <span className="h-[1px] w-8 bg-white/20" />
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">DevJournal Ecosystem</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-3">
                    {['Modern', 'Digital', 'Inspire', 'Write', 'Zaeem', 'Community'].includes(word.replace(/[:.,]/g, '')) ? (
                      <span className={`text-gradient-primary`}>{word}</span>
                    ) : word}
                  </span>
                ))}
              </h1>
              
              <p className="text-base text-slate-300 mb-8 max-w-lg leading-relaxed animate-slide-up opacity-80" style={{ animationDelay: '0.4s' }}>
                {slide.description}
              </p>
              
              <div className="flex flex-wrap gap-5 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-2xl group shadow-[0_15px_40px_rgba(79,70,229,0.2)]">
                    Join Community <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden shadow-xl">
                      <img src={`https://i.pravatar.cc/100?u=${i + 15}`} alt="user" />
                    </div>
                  ))}
                  <div className="pl-4 text-xs font-bold text-white/50">
                    Trusted by <span className="text-white">5K+</span> devs
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Cards (Scaled Down) */}
            <div className="hidden lg:flex w-1/2 flex-col items-center justify-center relative translate-y-10">
              <div className="relative w-[340px] h-[440px] animate-float">
                {/* Main Card */}
                <div className="absolute inset-0 transform rotate-3 flex flex-col pointer-events-none rounded-[1rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <PostCard post={{
                    _id: "hero_" + slide.id,
                    title: "Building the Future of Developer Communities",
                    content: "Hey, I'm Zaeem, a developer and the founder of DevJournal. I built this platform to empower developers to connect, share their journeys, and grow together in a modern ecosystem. Welcome aboard!",
                    tags: ["Founder", "Vision", "Community"],
                    createdAt: new Date().toISOString(),
                    likes: 1245,
                    comments: 89,
                    author: {
                      name: "Zaeem Shakeel",
                      username: "zaeem",
                      profilePic: "https://res.cloudinary.com/dc4pe4cc1/image/upload/v1760078385/infodemo/vdahj9tgbsfqm1pirmmj.png"
                    }
                  }} />
                </div>
                
                {/* Small Floating Cards */}
                <div className="absolute bottom-16 left-0 glass-morphism rounded-[1.5rem] border-white/10 p-3 shadow-2xl animate-float-delayed rotate-12">
                  <div className="flex items-center gap-2">
                    <Zap className="text-accent" size={18} />
                    <div className="text-[10px] font-bold text-white uppercase tracking-tight">Posting now...</div>
                  </div>
                </div>

                <div className="absolute bottom-16 -right-10 glass-morphism rounded-[1.5rem] border-white/10 p-4 shadow-2xl animate-float rotate-[-6deg]">
                   <div className="text-xs font-black text-white mb-2 uppercase tracking-tighter">Post. Share. Repeat.</div>
                   <div className="flex -space-x-1.5">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-6 h-6 rounded-full border border-white/20 overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?u=${i + 40}`} alt="Community member" />
                       </div>
                     ))}
                     <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white border border-white/20">
                        +5k
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modern Slider Navigation */}
      <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-8 h-1 bg-primary shadow-[0_0_10px_#4f46e5]' : 'w-2 h-1 bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={prevSlide} className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextSlide} className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

