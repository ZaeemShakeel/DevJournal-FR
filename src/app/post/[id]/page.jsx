"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { postsAPI } from '@/services/api';
import { 
  Clock, 
  Calendar, 
  User, 
  ChevronLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon, 
  MessageSquare, 
  Heart,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { formatRelativeDate, formatDateSimple, calculateReadingTime } from '@/utils/dateFormatter';
import { getInitials } from '@/utils/textTruncate';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const SinglePostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500) + 50);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getOne(id);
        if (response.data.success) {
          setPost(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to load post');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id, router]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-bold text-lg animate-pulse">Loading story...</p>
      </div>
    );
  }

  if (!post) return null;

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="relative">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="animate-fade-in pb-20">
        {/* Post Hero */}
        <header className="container mx-auto max-w-4xl px-4 md:px-6 pt-28 text-center">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {post.tags?.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6 border-y border-border-light dark:border-border-dark">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-lg font-bold shadow-md">
                {getInitials(post.author?.name)}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 dark:text-slate-100">{post.author?.name}</p>
                <p className="text-xs text-slate-500">Author & Developer</p>
              </div>
            </div>
            
            <div className="h-6 w-[1px] bg-border-light dark:bg-border-dark hidden sm:block" />

            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                {formatDateSimple(post.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-secondary" />
                {readingTime} min read
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImage && (
          <div className="container mx-auto max-w-6xl px-4 md:px-6 mt-12 mb-16">
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed md:text-xl md:leading-loose text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-20">
            {post.content}
          </div>

          {/* Social Interactions */}
          <div className="flex flex-wrap items-center justify-between gap-8 py-10 border-t border-border-light dark:border-border-dark">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setLiked(!liked);
                  setLikeCount(liked ? likeCount - 1 : likeCount + 1);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
                  liked ? 'bg-error text-white shadow-lg shadow-error/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-error/10 hover:text-error'
                }`}
              >
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
                {likeCount} Likes
              </button>
              
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-primary/10 hover:text-primary transition-all">
                <MessageSquare size={20} />
                {Math.floor(Math.random() * 50) + 12}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-2">Share story</span>
              {[
                { icon: Twitter, color: 'hover:text-sky-500 hover:bg-sky-50' },
                { icon: Linkedin, color: 'hover:text-blue-700 hover:bg-blue-50' },
              ].map((social, i) => (
                <button key={i} className={`w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all ${social.color}`}>
                  <social.icon size={18} />
                </button>
              ))}
              <button 
                onClick={copyToClipboard}
                className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:text-primary hover:bg-primary/5 transition-all"
              >
                <LinkIcon size={18} />
              </button>
            </div>
          </div>

          {/* About Author Card */}
          <div className="mt-20 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-border-light dark:border-border-dark flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-xl shrink-0">
              {getInitials(post.author?.name)}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Written by {post.author?.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl">
                A dedicated developer who loves sharing insights about modern technology and software development. Follow for more deep dives into the world of programming.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Button variant="outline" size="sm" className="rounded-full">Follow Author</Button>
                <Button variant="ghost" size="sm" className="rounded-full">View Profile</Button>
              </div>
            </div>
          </div>

          {/* More Posts Carousel Placeholder */}
          <div className="mt-32">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl font-bold">Recommended for you</h2>
              <Link href="/" className="text-primary font-bold hover:underline">See all →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="card p-6 flex gap-6 hover:shadow-xl transition-shadow group cursor-pointer border-slate-100 dark:border-slate-800">
                  <div className="w-24 h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold group-hover:text-primary transition-colors line-clamp-2">Exploring the Future of Frontend Architecture in 2026</h4>
                    <span className="text-xs text-slate-500 mt-2">5 min read • Jan 12, 2026</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SinglePostPage;
