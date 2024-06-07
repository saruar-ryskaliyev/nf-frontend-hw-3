'use client';

import React from 'react';
import { Post } from '../types';
import { useTheme } from '../context/ThemeContext';

interface PostDetailProps {
  post: Post;
}

const PostDetail = ({ post }: PostDetailProps) => {
  const { theme } = useTheme();

  return (
    <div className={`container mx-auto px-4 py-20 mt-16 shadow-md rounded-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center mb-4">
          <img className="h-12 w-12 rounded-full mr-4" src="https://via.placeholder.com/48" alt="Author's Avatar" />
          <div>
            <div className="text-sm">
              <span className="font-bold">Author's Name</span>
              <span className="text-gray-600 ml-2">•</span>
              <span className="text-gray-600 ml-2">7 July</span>
              <span className="text-gray-600 ml-2">•</span>
              <span className="text-gray-600 ml-2">12 min read</span>
              <span className="text-gray-600 ml-2">•</span>
              <span className="text-gray-600 ml-2">Member-only</span>
            </div>
          </div>
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        <h2>Subheader</h2>
        <p>{post.body}</p>
      </div>
      <div className="mt-8 flex justify-between items-center text-gray-600 text-sm">
        <div className="flex items-center">
          <span className="mr-2">👍🏻{post.reactions.likes}</span>
          <span>👎🏻{post.reactions.dislikes}</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-900"><i className="fab fa-facebook"></i></a>
          <a href="#" className="hover:text-gray-900"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-gray-900"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
