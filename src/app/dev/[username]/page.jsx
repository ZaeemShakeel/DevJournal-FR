"use client";

import React, { useState, useEffect } from 'react';
import { authAPI } from '@/services/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Instagram, 
  Facebook, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Mail, 
  Link as LinkIcon,
  Code2,
  Trophy,
  MessageSquare,
  Share2,
  MoreHorizontal
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/ui/PostCard';
import { PostSkeleton } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';

export default function PublicProfile() {
  const { username } = useParams();
  const { posts, fetchPublicPosts, loading: postsLoading } = usePosts();
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authAPI.getUserProfile(username);
        if (res.data.success) {
          setProfileData(res.data.data);
          fetchPublicPosts(username);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    if (username) fetchProfile();
  }, [username, fetchPublicPosts]);

  if (loadingProfile) {
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
                      Loading Profile
                  </p>
              </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-slate-500">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-12 transition-colors duration-500 font-sans">
      {/* Banner Section */}
      <div className="h-64 sm:h-80 w-full relative overflow-hidden">
        <img 
          src={profileData.bannerImage || "/images/community_hero.png"} 
          alt="Profile Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-light dark:to-background-dark"></div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Profile Info & Sidebar */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="glass-morphism rounded-3xl p-6 border-slate-200/50 dark:border-white/5 shadow-2xl">
              {/* Profile Image */}
              <div className="relative -mt-24 mb-6 flex justify-center lg:justify-start">
                <div className="w-44 h-44 rounded-[2.5rem] border-8 border-white dark:border-slate-900 overflow-hidden shadow-2xl rotate-2 transform hover:rotate-0 transition-transform duration-500 bg-slate-200">
                  <img 
                    src={profileData.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username || profileData.name}`} 
                    alt={profileData.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.username || 'Zaeem'}`; }}
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div className="text-center lg:text-left mb-6">
                <h1 className="text-3xl font-black text-adaptive mb-1">{profileData.name}</h1>
                <p className="text-primary font-bold text-sm tracking-wide">@{profileData.username}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-adaptive">
                    <Briefcase size={16} className="text-secondary" />
                    <span className="text-sm font-semibold">{profileData.designation}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-adaptive">
                    <Globe size={16} className="text-accent" />
                    <span className="text-sm font-semibold">{profileData.company}</span>
                  </div>
                  {profileData.location && (
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-adaptive mt-2">
                      <MapPin size={16} className="text-error" />
                      <span className="text-sm font-semibold">{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <p className="text-muted-adaptive text-sm leading-relaxed text-center lg:text-left italic">
                  "{profileData.bio}"
                </p>
              </div>

              {/* Social Links Section */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-adaptive mb-4 px-1">Connect with me</h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {profileData.socialLinks?.github && (
                    <Link href={profileData.socialLinks.github} target="_blank" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-all hover:scale-110">
                      <Github size={18} />
                    </Link>
                  )}
                  {profileData.socialLinks?.linkedin && (
                    <Link href={profileData.socialLinks.linkedin} target="_blank" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-all hover:scale-110">
                      <Linkedin size={18} />
                    </Link>
                  )}
                  {profileData.socialLinks?.instagram && (
                    <Link href={profileData.socialLinks.instagram} target="_blank" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-pink-500 hover:text-white transition-all hover:scale-110">
                      <Instagram size={18} />
                    </Link>
                  )}
                  {profileData.socialLinks?.facebook && (
                    <Link href={profileData.socialLinks.facebook} target="_blank" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all hover:scale-110">
                      <Facebook size={18} />
                    </Link>
                  )}
                  {profileData.socialLinks?.website && (
                    <Link href={profileData.socialLinks.website} target="_blank" className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-accent hover:text-white transition-all hover:scale-110">
                      <Globe size={18} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Professional Journey (Moved here) */}
              <div className="border-t border-slate-100 dark:border-white/5 pt-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-adaptive mb-6 px-1">Journey</h3>
                <div className="space-y-6">
                  {profileData.experience?.length > 0 ? profileData.experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10 last:border-0 pb-2">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900" />
                      <h4 className="text-xs font-bold text-adaptive leading-none">{exp.role}</h4>
                      <p className="text-[10px] text-primary font-bold mt-1">{exp.company}</p>
                      <p className="text-[9px] text-muted-adaptive mt-1 font-medium">{exp.duration}</p>
                    </div>
                  )) : (
                    <p className="text-xs text-muted-adaptive italic">No experience added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats, Tech Stack & Posts */}
          <div className="lg:w-2/3 xl:w-3/4 space-y-8">
            
            {/* Stats & Tech Stack Row Combined */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Concise Stats */}
              <div className="md:w-1/3 flex gap-4">
                <div className="flex-1 glass-morphism rounded-3xl p-6 border-slate-200/50 dark:border-white/5 flex flex-col items-center justify-center">
                   <p className="text-3xl font-black text-primary">24</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-adaptive mt-1">Posts</p>
                </div>
                <div className="flex-1 glass-morphism rounded-3xl p-6 border-slate-200/50 dark:border-white/5 flex flex-col items-center justify-center">
                   <p className="text-3xl font-black text-secondary">1.2K</p>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted-adaptive mt-1">Likes</p>
                </div>
              </div>

              <div className="md:w-2/3 glass-morphism rounded-3xl p-6 border-slate-200/50 dark:border-white/5 flex flex-wrap items-center gap-2">
                {profileData.techStack?.length > 0 ? profileData.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {tech}
                  </span>
                )) : (
                  <span className="text-xs text-muted-adaptive italic">No tech stack added yet.</span>
                )}
              </div>
            </div>

            {/* Posts Section */}
            <div>
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-3xl font-black text-adaptive flex items-center gap-3">
                   <MessageSquare className="text-primary" size={28} />
                   Journal <span className="text-gradient-primary">Posts</span>
                </h2>
              </div>

              {postsLoading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full animate-pulse" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden relative">
                            <Loader />
                        </div>
                        <div className="mt-8 flex flex-col items-center space-y-2">
                            <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] animate-pulse">
                                DevJournal
                            </h3>
                            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium uppercase tracking-widest">
                                Loading Journal
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                  {posts.map(post => <PostCard key={post._id} post={post} />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                  <div className="md:col-span-2 text-center py-20 glass-morphism rounded-[2.5rem] border-dashed border-2 border-slate-200 dark:border-white/10">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Calendar size={32} className="text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-adaptive mb-2">Thoughts are being prepared</h3>
                    <p className="text-muted-adaptive text-sm max-w-xs mx-auto">Once the author starts publishing, all posts from {profileData.name} will be listed here.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

