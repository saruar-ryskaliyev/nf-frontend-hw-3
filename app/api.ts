import axiosInstance from './axiosInstance';
import { Post } from './types';

export const addPost = async (title: string, userId: number): Promise<Post> => {
  const response = await axiosInstance.post('auth/posts/add', {
    title,
    userId,
  });
  return response.data;
};

export const updatePost = async (id: number, title: string): Promise<Post> => {
  const response = await axiosInstance.put(`auth/posts/${id}`, {
    title,
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<Post> => {
  const response = await axiosInstance.delete(`auth/posts/${id}`);
  return response.data;
};
