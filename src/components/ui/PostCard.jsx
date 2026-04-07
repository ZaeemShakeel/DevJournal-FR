import React from 'react';
import Link from 'next/link';
import { Clock, Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { formatRelativeDate } from '@/utils/dateFormatter';
import { truncateText, getInitials } from '@/utils/textTruncate';

const PostCard = ({ post }) => {
  const {
    _id,
    title,
    content,
    tags = [],
    author,
    createdAt,
    coverImage,
    likes = 0,
    comments = 0
  } = post;

  return (
    <div className="group relative">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-[2rem] opacity-0 group-hover:opacity-20 transition duration-500 blur-xl font-bold" />
      
      <div className="relative glass-morphism rounded-[2rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 flex flex-col h-full border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-2xl">
        {/* Card Header (Author Info) */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-50 dark:bg-background-dark flex items-center justify-center text-text-light dark:text-text-dark text-xs font-extrabold shadow-inner">
                {getInitials(author?.name)}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-adaptive leading-none mb-1">{author?.name || 'Developer Journal'}</p>
              <p className="text-[10px] text-muted-adaptive font-medium uppercase tracking-widest">{formatRelativeDate(createdAt)}</p>
            </div>
          </div>
          <button className="text-muted-adaptive hover:text-slate-900 dark:hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Title & Content Area */}
        <Link href={`/post/${_id}`} className="px-5 pb-4 flex-grow cursor-pointer block">
          <h3 className="text-xl font-bold text-adaptive mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-adaptive text-sm leading-relaxed line-clamp-3 mb-4">
            {truncateText(content, 140)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-muted-adaptive text-[10px] font-bold uppercase tracking-wider hover:bg-primary/20 hover:border-primary/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Link>

        {/* Media (Cover Image) */}
        {coverImage && (
          <Link href={`/post/${_id}`} className="block relative h-52 overflow-hidden mx-5 mb-4 rounded-2xl border border-slate-100 dark:border-white/5">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Clock size={12} className="text-primary" />
                Read the full story
              </span>
            </div>
          </Link>
        )}

        {/* Interaction Bar */}
        <div className="px-5 py-4 mt-auto border-t border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-muted-adaptive hover:text-secondary group/heart transition-all">
              <div className="p-2 rounded-full group-hover/heart:bg-secondary/10 transition-colors">
                <Heart size={18} className="group-hover/heart:fill-secondary" />
              </div>
              <span className="text-xs font-bold">{likes || 24}</span>
            </button>
            
            <button className="flex items-center gap-2 text-muted-adaptive hover:text-primary group/msg transition-all">
              <div className="p-2 rounded-full group-hover/msg:bg-primary/10 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs font-bold">{comments || 8}</span>
            </button>

            <button className="p-2 rounded-full text-muted-adaptive hover:bg-accent/10 hover:text-accent transition-colors">
              <Share2 size={18} />
            </button>
          </div>
          
          <button className="p-2 rounded-full text-muted-adaptive hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};


export default PostCard;
