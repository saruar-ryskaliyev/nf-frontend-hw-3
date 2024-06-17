'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MusicPlayer from '../components/MusicPlayer';


interface MusicPlayerContextProps {
    songUrl: string;
    title: string;
    artist: string;
    setSong: (songUrl: string, title: string, artist: string) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(undefined);

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [songUrl, setSongUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [artist, setArtist] = useState<string>('');

    const setSong = (songUrl: string, title: string, artist: string) => {
        setSongUrl(songUrl);
        setTitle(title);
        setArtist(artist);
    };

    return (
        <MusicPlayerContext.Provider value={{ songUrl, title, artist, setSong }}>
            {children}
            <MusicPlayer songUrl={songUrl} title={title} artist={artist} />
        </MusicPlayerContext.Provider>
    );
};
