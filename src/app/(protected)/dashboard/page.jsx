"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ExternalLink, 
  BarChart3, 
  FileText, 
  Eye, 
  MessageSquare, 
  Heart,
  Search,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { StatsSkeleton } from '@/components/ui/Skeleton';
import Modal from '@/components/ui/Modal';
import { formatDateSimple } from '@/utils/dateFormatter';

const DashboardPage = () => {
  const { user } = useAuth();
  const { posts, loading, fetchUserPosts, deletePost } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      const success = await deletePost(postToDelete._id);
      if (success) {
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
      }
    }
  };

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  // Mock stats
  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Views', value: Math.floor(Math.random() * 5000) + 1200, icon: Eye, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Total Likes', value: Math.floor(Math.random() * 800) + 150, icon: Heart, color: 'text-error', bg: 'bg-error/10' },
    { label: 'Comments', value: Math.floor(Math.random() * 200) + 45, icon: MessageSquare, color: 'text-success', bg: 'bg-success/10' },
  ];

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-slate-500">Manage your stories and see how they're performing.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/profile/settings">
              <Button variant="outline" className="h-12 shadow-sm">
                Profile Setting
              </Button>
            </Link>
            <Link href="/create">
              <Button className="h-12 px-6 shadow-lg shadow-primary/20">
                <Plus size={20} className="mr-2" /> Create New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="card p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Management Section */}
        <div className="card">
          <div className="p-6 border-b border-border-light dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold mb-0">My Published Posts</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search your posts..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center space-y-4">
                <div className="w-48 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                  <Loader />
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold animate-pulse">Synchronizing Posts</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Post Title</th>
                    <th className="px-6 py-4">Date Created</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Views</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{post.title}</span>
                          <span className="text-xs text-slate-400">{post.tags.join(', ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDateSimple(post.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        {Math.floor(Math.random() * 1000)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/post/${post._id}`} target="_blank">
                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-300" title="View Public Post">
                              <ExternalLink size={18} />
                            </button>
                          </Link>
                          <Link href={`/edit/${post._id}`}>
                            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary" title="Edit Post">
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button 
                            onClick={() => openDeleteModal(post)}
                            className="p-2 hover:bg-error/10 rounded-lg transition-colors text-error" 
                            title="Delete Post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-20 px-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <FileText size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">No posts found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                  {searchTerm ? `We couldn't find any posts matching "${searchTerm}"` : "You haven't written any stories yet. Start sharing your journey today!"}
                </p>
                {!searchTerm && (
                  <Link href="/create">
                    <Button>Create Your First Post</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
          
          {/* Pagination Placeholder */}
          <div className="p-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing {filteredPosts.length} of {posts.length} posts</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Post"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete Permanently</Button>
          </>
        }
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center text-error">
            <AlertTriangle size={32} />
          </div>
          <div>
            <p className="font-bold text-lg">Are you sure you want to delete this post?</p>
            <p className="text-slate-500 text-sm mt-1">
              "<strong>{postToDelete?.title}</strong>"<br />
              This action cannot be undone and the post will be permanently removed.
            </p>
          </div>
        </div>
      </Modal>
    </ProtectedRoute>
  );
};

export default DashboardPage;
