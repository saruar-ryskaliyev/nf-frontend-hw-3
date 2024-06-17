import React, { useState, useRef, useEffect } from 'react';

export interface MusicPlayerProps {
  songUrl?: string;
  title?: string;
  artist?: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songUrl, title, artist }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume state

  useEffect(() => {
    if (audioRef.current && songUrl) {
      audioRef.current.src = songUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [songUrl]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateCurrentTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener('timeupdate', updateCurrentTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateCurrentTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audioRef.current]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newVolume = Number(event.target.value);
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex items-center p-4">
      {songUrl ? (
        <>
          <div className="flex-1">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-400">{artist}</p>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <button onClick={handlePlayPause} className="ml-4">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="ml-4 flex items-center">
            <span className="mr-2 text-sm">Vol</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
          <audio ref={audioRef} className="hidden">
            <source src={songUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      ) : (
        <p>No song playing</p>
      )}
    </div>
  );
};

export default MusicPlayer;
