'use client';

import axiosInstance from './axiosInstance';
import PostList from './components/PostList';
import { Post } from './types';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import PostActions from './components/PostActions';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get('auth/posts');
  return response.data.posts;
};

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch posts');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Hello, world!</h1>
        <PostActions posts={posts} setPosts={setPosts} />
        <PostList posts={posts} />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
