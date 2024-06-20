// components/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import axiosInstance from '../axiosInstance';
import { useTheme } from '../context/ThemeContext';

interface User {
  _id: string;
  email: string;
  username: string;
  favoriteSongs: string[];
  playlists: string[];
}

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>('/auth/search', {
          params: { q: '' }, // Adjust the query parameter as needed
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ResizableBox width={200} height={window.innerHeight} axis="x" minConstraints={[100, window.innerHeight]} maxConstraints={[400, window.innerHeight]}>
      <div className={`h-full p-4 ${theme === 'light' ? 'bg-white text-black' : 'text-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <a href={`/users/${user._id}`} className="text-black-300 hover:underline">
                {user.username}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ResizableBox>
  );
};

export default Sidebar;
