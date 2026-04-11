"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/ui/PostCard';
import { PostSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import HeroSlider from '@/components/ui/HeroSlider';
import { TrendingUp, Users, Award, MessageSquare, Plus, Sparkles } from 'lucide-react';
import Loader from '@/components/ui/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { posts, loading, fetchPublicPosts } = usePosts();
  const [activeTab, setActiveTab] = useState('latest');

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  const featuredPosts = posts?.slice(0, 6) || [];
  const feedPosts = posts?.slice(6) || [];

  return (
    <div className="space-y-16 pb-20 bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Hero Slider Section - Full Screen behind header */}
      <section className="w-full">
        <HeroSlider />
      </section>

      {/* Quick Stats / Community Bar */}
      <section className="container mx-auto px-4 text-adaptive -mt-10 relative z-30">
        <div className="glass-morphism rounded-3xl p-6 flex flex-wrap justify-around gap-6 border-slate-200/50 dark:border-white/5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xl font-black">10K+</p>
              <p className="text-[10px] text-muted-adaptive font-bold uppercase tracking-wider">Developers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xl font-black">500+</p>
              <p className="text-[10px] text-muted-adaptive font-bold uppercase tracking-wider">Stories</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xl font-black">2.5M</p>
              <p className="text-[10px] text-muted-adaptive font-bold uppercase tracking-wider">Views</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success/10 text-success">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-xl font-black">15K+</p>
              <p className="text-[10px] text-muted-adaptive font-bold uppercase tracking-wider">Discussions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest mb-3">
              <Award size={12} /> Featured Insights
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-adaptive leading-tight">
              Curated for <span className="text-gradient-primary">Experts.</span>
            </h2>
          </div>
          <Link href="/posts">
            <Button variant="ghost" size="sm" className="text-muted-adaptive hover:text-primary group">
              View all <TrendingUp className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
            </Button>
          </Link>
        </div>

        <div className="w-full">
          {loading ? (
            <div className="lg:col-span-2 space-y-6">
              <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative mb-4">
                <Loader />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map(i => <PostSkeleton key={i} />)}
              </div>
            </div>
          ) : featuredPosts.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="pb-12 !pt-2"
            >
              {featuredPosts.map(post => (
                <SwiperSlide key={post._id} className="h-auto">
                  <PostCard post={post} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side: Feed */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-white/5">
              <div className="flex gap-6">
                {['Latest', 'Trending', 'Following'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-2 text-xs font-bold uppercase tracking-widest relative transition-colors ${
                      activeTab === tab.toLowerCase() ? 'text-primary' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full shadow-lg shadow-primary/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="space-y-6">
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                  <Loader />
                </div>
                {[1, 2, 3].map(i => <PostSkeleton key={i} />)}
              </div>
            ) : feedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedPosts.map(post => <PostCard key={post._id} post={post} />)}
              </div>
            ) : (
              <div className="text-center py-16 glass-morphism rounded-3xl">
                <Plus size={48} className="mx-auto text-slate-500 mb-4" />
                <h3 className="text-xl font-bold text-adaptive mb-2">Build your feed</h3>
                <p className="text-muted-adaptive text-sm max-w-sm mx-auto mb-6">
                  Follow more developers to see their latest thoughts here.
                </p>
                <Link href="/create">
                  <Button size="sm" className="rounded-xl h-10 px-6">Write Your First Post</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Side: Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="glass-morphism rounded-3xl p-6 border-slate-200 dark:border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles size={80} className="text-primary" />
              </div>
              <h3 className="text-lg font-black text-adaptive mb-3">Start Writing</h3>
              <p className="text-muted-adaptive text-xs mb-5 leading-relaxed">
                Have something on your mind? Share it with the community today.
              </p>
              <Link href="/create">
                <Button className="w-full h-12 rounded-xl text-sm group shadow-xl shadow-primary/10">
                  Create Post <Plus className="ml-2 group-hover:rotate-90 transition-transform" size={16} />
                </Button>
              </Link>
            </div>

            <div className="glass-morphism rounded-3xl p-6 border-slate-200 dark:border-white/10">
              <h3 className="text-base font-black text-adaptive mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" /> Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#ReactJS', '#NextJS', '#WebDev', '#OSS', '#SystemDesign'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-morphism rounded-3xl p-6 border-slate-200 dark:border-white/10">
              <h3 className="text-base font-black text-adaptive mb-4">Suggested Scientists</h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Drasner', role: 'Staff Engineer', initials: 'SD' },
                  { name: 'Addy Osmani', role: 'Google Chrome', initials: 'AO' }
                ].map(follow => (
                  <div key={follow.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-adaptive border border-slate-200 dark:border-white/10">
                        {follow.initials}
                      </div>
                      <div>
                        <Link href={`/dev/${follow.name.toLowerCase().replace(' ', '_')}`}>
                          <p className="text-xs font-bold text-adaptive leading-none mb-1 hover:text-primary transition-colors cursor-pointer">{follow.name}</p>
                        </Link>
                        <p className="text-[9px] text-muted-adaptive">{follow.role}</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold text-primary hover:text-secondary">Follow</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Newsletter Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 py-16 px-8 text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-adaptive mb-4">The DevJournal <span className="text-gradient-primary">Digest.</span></h2>
            <p className="text-muted-adaptive text-sm mb-8 leading-relaxed">
              Join 50,000+ developers receiving our weekly digest of the best technical content and ecosystem tools.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="developer@work.com" 
                className="flex-grow h-11 px-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm text-adaptive"
              />
              <Button size="sm" className="h-11 px-8 rounded-xl font-bold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
