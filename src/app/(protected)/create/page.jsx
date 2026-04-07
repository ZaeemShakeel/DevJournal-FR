"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { postsAPI } from '@/services/api';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Send, 
  Save, 
  Image as ImageIcon, 
  Tag as TagIcon, 
  PenTool, 
  Eye, 
  ArrowLeft,
  X,
  Plus,
  Info
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { toast } from 'react-hot-toast';

const CreatePostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('draft_post');
    if (saved) {
      try {
        const { title: sTitle, content: sContent, tags: sTags, coverImage: sImage } = JSON.parse(saved);
        setTitle(sTitle || '');
        setContent(sContent || '');
        setTags(sTags || []);
        setCoverImage(sImage || '');
        toast.success('Draft restored from local storage', { icon: '📝' });
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  // Auto-save logic
  useEffect(() => {
    const timer = setInterval(() => {
      const draft = { title, content, tags, coverImage };
      if (title || content) {
        localStorage.setItem('draft_post', JSON.stringify(draft));
        setLastSaved(new Date().toLocaleTimeString());
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(timer);
  }, [title, content, tags, coverImage]);

  const handleManualSave = () => {
    const draft = { title, content, tags, coverImage };
    localStorage.setItem('draft_post', JSON.stringify(draft));
    setLastSaved(new Date().toLocaleTimeString());
    toast.success('Draft saved locally');
  };

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      } else if (tags.length >= 5) {
        toast.error('Maximum 5 tags allowed');
      }
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handlePublish = async () => {
    if (!title || !content) {
      toast.error('Title and content are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await postsAPI.create({
        title,
        content,
        tags,
        coverImage: coverImage || undefined
      });

      if (response.data.success) {
        toast.success('Post published successfully!');
        localStorage.removeItem('draft_post');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to publish post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-20 animate-fade-in">
        {/* Navigation / Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-text-light dark:hover:text-text-dark transition-colors font-bold self-start sm:self-center"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {lastSaved && (
              <span className="text-xs text-slate-400 hidden lg:block italic">
                Saved at {lastSaved}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleManualSave}>
              <Save size={18} className="mr-2" /> Save Draft
            </Button>
            <Button size="sm" onClick={handlePublish} isLoading={isSubmitting}>
              <Send size={18} className="mr-2" /> Publish Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Editor Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="card">
              <div className="p-1 border-b border-border-light dark:border-border-dark flex bg-slate-50 dark:bg-slate-900/50">
                <button 
                  onClick={() => setIsPreview(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
                    !isPreview ? 'text-primary bg-white dark:bg-card-dark shadow-sm rounded-t-xl' : 'text-slate-500 hover:text-text-light'
                  }`}
                >
                  <PenTool size={18} /> Editor
                </button>
                <button 
                  onClick={() => setIsPreview(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all ${
                    isPreview ? 'text-secondary bg-white dark:bg-card-dark shadow-sm rounded-t-xl' : 'text-slate-500 hover:text-text-light'
                  }`}
                >
                  <Eye size={18} /> Live Preview
                </button>
              </div>

              <div className="p-8">
                {!isPreview ? (
                  <div className="space-y-6">
                    <textarea
                      placeholder="Enter a compelling title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-4xl md:text-5xl font-extrabold bg-transparent border-none outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none min-h-[60px]"
                      rows={1}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                    
                    <div className="h-px bg-border-light dark:bg-border-dark" />

                    <div className="relative group">
                      <textarea
                        placeholder="Write your story here... (Markdown supported)"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[400px] bg-transparent border-none outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none text-lg leading-relaxed"
                      />
                      <div className="absolute bottom-4 right-0 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {wordCount} words
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-slate dark:prose-invert max-w-none animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-8">{title || 'Untitled Post'}</h1>
                    {coverImage && (
                      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                        <img src={coverImage} alt="Post cover" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-lg leading-relaxed opacity-90">
                      {content || 'Start typing in the editor tab to see the preview here...'}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Info size={20} />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Formatting Tip:</strong> You can use standard Markdown syntax for headings, links, and lists. Your post is auto-saved locally every 30 seconds to ensure you don't lose progress.
              </p>
            </div>
          </div>

          {/* Settings Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="card p-6 space-y-8">
              <h3 className="text-lg font-bold border-b border-border-light dark:border-border-dark pb-3">Post Settings</h3>
              
              {/* Cover Image */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <ImageIcon size={18} className="text-primary" /> Cover Image URL
                </div>
                <Input 
                  placeholder="https://images.unsplash.com/..." 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
                {coverImage && (
                  <div className="relative group rounded-xl overflow-hidden aspect-video border border-border-light dark:border-border-dark">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setCoverImage('')}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <TagIcon size={18} className="text-secondary" /> Tags (Max 5)
                </div>
                <div className="relative">
                  <Input 
                    placeholder="Add tag and press Enter" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Plus size={18} className="text-slate-400" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold"
                    >
                      #{tag}
                      <button onClick={() => removeTag(idx)} className="hover:text-error transition-colors">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-xs text-slate-400 italic">No tags added yet</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">Publish Visibility</span>
                  <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase">Public</span>
                </div>
                <p className="text-xs text-slate-500">Your post will be immediately visible on the landing page after publishing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreatePostPage;
