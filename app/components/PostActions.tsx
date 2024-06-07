'use client';

import React, { useState } from 'react';
import { addPost, updatePost, deletePost } from '../api';
import { Post } from '../types';

interface PostActionsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostActions = ({posts, setPosts}: PostActionsProps) => {
  const [addTitle, setAddTitle] = useState('');
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleAddPost = async () => {
    try {
      const newPost = await addPost(addTitle, 1); 
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleUpdatePost = async () => {
    if (updateId === null) return;
    try {
      const updatedPost = await updatePost(updateId, updateTitle);
      setPosts(posts.map(post => (post.id === updateId ? updatedPost : post)));

    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async () => {
    if (deleteId === null) return;
    try {
      const deletedPost = await deletePost(deleteId);
      setPosts(posts.filter(post => post.id !== deleteId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3>Add Post</h3>
        <input
          type="text"
          value={addTitle}
          onChange={(e) => setAddTitle(e.target.value)}
          placeholder="Post Title"
          className="border p-2 rounded"
        />
        <button onClick={handleAddPost} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Add Post
        </button>
      </div>
      <div>
        <h3>Update Post</h3>
        <input
          type="number"
          value={updateId ?? ''}
          onChange={(e) => setUpdateId(Number(e.target.value))}
          placeholder="Post ID"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
          placeholder="New Title"
          className="border p-2 rounded ml-2"
        />
        <button onClick={handleUpdatePost} className="ml-2 bg-green-500 text-white p-2 rounded">
          Update Post
        </button>
      </div>
      <div>
        <h3>Delete Post</h3>
        <input
          type="number"
          value={deleteId ?? ''}
          onChange={(e) => setDeleteId(Number(e.target.value))}
          placeholder="Post ID"
          className="border p-2 rounded"
        />
        <button onClick={handleDeletePost} className="ml-2 bg-red-500 text-white p-2 rounded">
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default PostActions;
