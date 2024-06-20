'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <header className={`py-4 shadow ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button
          onClick={() => router.push('/')}
          className='flex items-center'
        >

          <img src="/spotify_logo.png" alt="Spotify Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold ml-2">Spotify</h1>




        </button>
        {/* <div className="flex items-center">
          <img src="/spotify_logo.png" alt="Spotify Logo" className="w-8 h-8" />
          <h1 className="text-3xl font-bold ml-2">Spotify</h1>
        </div> */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="py-2 px-4 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </form>
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          {isAuthenticated && (
            <>
              <a href="/favorites" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                My Favorites
              </a>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
