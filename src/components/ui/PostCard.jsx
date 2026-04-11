"use client";

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
    <StyledWrapper>
      <div className="card h-full justify-between transition-transform duration-500 cursor-pointer">
        <div className="card__border" />
        
        {/* Card Header (Author Info) */}
        <div className="flex items-center justify-between pb-4 relative z-10 w-full border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <Link href={`/dev/${author?.username}`} className="shrink-0 z-20 mb-5">
              {author?.profilePic ? (
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
                  <img src={author.profilePic} alt={author.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-[var(--black)] flex items-center justify-center text-xs font-black shadow-inner">
                  {getInitials(author?.name)}
                </div>
              )}
            </Link>
            <div className="flex flex-col justify-center">
              <Link href={`/dev/${author?.username || 'zaeem_dev'}`} className="z-20 relative">
                <p className="text-[15px] font-bold text-[var(--white)] leading-tight mb-0.5 hover:text-[var(--primary)] transition-colors">
                  {author?.name || 'Developer Journal'}
                </p>
              </Link>
              <p className="text-[11px] text-[var(--paragraph)] font-medium uppercase tracking-widest">{formatRelativeDate(createdAt)}</p>
            </div>
          </div>
          <button className="text-[var(--paragraph)] hover:text-[var(--white)] transition-colors relative z-20">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Title & Content Area */}
        <Link href={`/post/${_id}`} className="py-4 flex-grow block relative z-10 w-full">
          <h3 className="card_title text-xl font-bold mb-3 line-clamp-2">
            {title}
          </h3>
          <p className="card_paragraph text-sm line-clamp-3 mb-5 leading-relaxed">
            {truncateText(content, 140)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[var(--white)] text-[10px] font-bold uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Link>
        <hr className="line z-10 relative" />

        {/* Interaction Bar */}
        <div className="pt-4 flex items-center justify-between relative z-10 w-full">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--primary)] transition-colors group">
              <Heart size={18} className="group-hover:fill-[var(--primary)]" />
              <span className="text-sm font-bold">{likes || 24}</span>
            </button>
            <button className="flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--white)] transition-colors group">
              <MessageCircle size={18} />
              <span className="text-sm font-bold">{comments || 8}</span>
            </button>
            <button className="text-[var(--paragraph)] hover:text-[var(--white)] transition-colors">
              <Share2 size={18} />
            </button>
          </div>
          
          <button className="text-[var(--paragraph)] hover:text-[var(--white)] transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default PostCard;

const StyledWrapper = styled.div`
  height: 100%;
  position: relative;
  z-index: 1; /* Creates stacking context for the border to drop behind the card background cleanly */

  .card {
    /* DEFAULT THEME (LIGHT) */
    --white: hsl(240, 15%, 9%);
    --black: hsl(0, 0%, 100%);
    --paragraph: hsl(240, 5%, 40%);
    --line: hsl(0, 0%, 90%);
    --primary: hsl(266, 92%, 58%);
    --card-bg: hsla(0, 0%, 100%, 1);
    --card-bg-opacity: transparent;
    --shadow-color: rgba(0, 0, 0, 0.05);
    --static-border-1: hsl(0, 0%, 80%);
    --static-border-2: hsl(0, 0%, 95%);
    --beam-transparent: hsla(0, 0%, 100%, 0);
    --beam-solid: hsl(277, 95%, 60%);

    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    width: 100%;
    
    background-color: var(--card-bg);
    background-image: 
      radial-gradient(at 88% 40%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 49% 30%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 14% 26%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 0.1) 0px, transparent 85%),
      radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 0.1) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 0.1) 0px, transparent 85%);

    border-radius: 1rem;
    box-shadow: 0px -16px 24px 0px var(--shadow-color) inset;
  }

  html.dark & .card {
    /* DARK THEME */
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 83%);
    --line: hsl(240, 9%, 17%);
    --primary: hsl(266, 92%, 58%);
    --card-bg: hsla(240, 15%, 9%, 1);
    --card-bg-opacity: hsla(240, 15%, 9%, 1);
    --shadow-color: rgba(255, 255, 255, 0.25);
    --static-border-1: hsl(0, 0%, 100%);
    --static-border-2: hsl(0, 0%, 40%);
    --beam-transparent: hsla(0, 0%, 0%, 0);
    --beam-solid: hsl(277, 95%, 60%);

    background-image: 
      radial-gradient(at 88% 40%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 49% 30%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 14% 26%, var(--card-bg-opacity) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsla(263, 93%, 56%, 1) 0px, transparent 85%),
      radial-gradient(at 41% 94%, hsla(284, 100%, 84%, 1) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsla(306, 100%, 57%, 1) 0px, transparent 85%);
  }

  .card .card__border {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: -10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-image: linear-gradient(
      0deg,
      var(--static-border-1) -50%,
      var(--static-border-2) 100%
    );
    border-radius: 1rem;
    transition: background-image 0.3s ease;
  }

  .card .card__border::before {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: left;
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      var(--beam-transparent) 0%,
      var(--beam-solid) 40%,
      var(--beam-solid) 60%,
      var(--beam-transparent) 100%
    );
    animation: rotate 8s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .card .card_title {
    color: var(--white);
    transition: color 0.3s ease;
  }
  
  .card:hover .card_title {
    color: var(--primary);
  }

  .card .card_paragraph {
    color: var(--paragraph);
  }

  .card .line {
    width: 100%;
    height: 0.05rem;
    background-color: var(--line);
    border: none;
  }
`;
