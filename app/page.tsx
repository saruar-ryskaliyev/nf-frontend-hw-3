'use client'

import axiosInstance from './axiosInstance';
import PostList from './components/PostList';
import { Post } from './types';
import RootLayout from './layout';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get('auth/posts');
    console.log('Response data:', response.data); // Debugging line
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
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
      <RootLayout>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Hello, world!</h1>
          <PostList posts={posts} />
        </div>
      </RootLayout>
    </ProtectedRoute>
  );
};

export default HomePage;
