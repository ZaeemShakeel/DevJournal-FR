"use client";

import React, { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/ui/PostCard';
import Loader from '@/components/ui/Loader';
import { Compass, Sparkles } from 'lucide-react';

export default function PostsPage() {
  const { posts, fetchPublicPosts, loading } = usePosts();

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  if (loading && posts.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-500">
        <div className="relative">
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
                      Loading Global Feed
                  </p>
              </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-28 pb-20 transition-colors duration-500 relative overflow-hidden font-sans">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-40 left-0 w-1/3 h-80 bg-secondary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Premium Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 relative">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Compass size={18} /> Global Feed
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight relative">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Developer Journal</span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Discover the latest tutorials, architectural deep-dives, and personal stories from engineers around the world.
          </p>
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center glass-morphism rounded-[2.5rem] border-dashed border-2 border-slate-200 dark:border-white/10 max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <Sparkles size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">No posts formulated yet</h3>
            <p className="text-slate-500 max-w-md">Be the first to share your thoughts and technical expertise with the community!</p>
          </div>
        )}

      </div>
    </div>
  );
}
