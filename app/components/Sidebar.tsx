// components/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import axiosInstance from '../axiosInstance';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

interface User {
  _id: string;
  email: string;
  username: string;
  favoriteSongs: string[];
  playlists: string[];
  listeningTo?: string; // Song title they are listening to
}

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const { socket } = useSocket();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = token ? parseJwt(token).userId : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>('/auth/search', {
          params: { q: '' }, // Adjust the query parameter as needed
        });
        setUsers(response.data.filter(u => u._id !== currentUserId)); // Filter out the current user
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  useEffect(() => {
    if (socket) {
      socket.on('user-listening', ({ userId, song }) => {
        setUsers(prevUsers =>
          prevUsers.map(user => 
            user._id === userId ? { ...user, listeningTo: song } : user
          )
        );
      });
    }
  }, [socket]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ResizableBox width={200} height={window.innerHeight} axis="x" minConstraints={[100, window.innerHeight]} maxConstraints={[400, window.innerHeight]}>
      <div className={`h-full p-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <a href={`/users/${user._id}`} className="hover:underline">
                {user.username} {user.listeningTo ? `- Listening to ${user.listeningTo}` : ''}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ResizableBox>
  );
};

export default Sidebar;

// Helper function to parse JWT token
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
