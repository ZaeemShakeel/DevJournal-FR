"use client";

import { useState, useEffect, useCallback } from 'react';
import { postsAPI } from '@/services/api';
import { toast } from 'react-hot-toast';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublicPosts = useCallback(async (username = null) => {
    setLoading(true);
    try {
      const response = await postsAPI.getAllPublic(username);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch public posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postsAPI.getUserPosts();
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch your posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePost = async (id) => {
    try {
      const response = await postsAPI.delete(id);
      if (response.data.success) {
        setPosts(prev => prev.filter(post => post._id !== id));
        toast.success('Post deleted successfully');
        return true;
      }
    } catch (err) {
      toast.error('Failed to delete post');
      return false;
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPublicPosts,
    fetchUserPosts,
    deletePost,
    setPosts
  };
};
