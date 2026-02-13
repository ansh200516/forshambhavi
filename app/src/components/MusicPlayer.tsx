import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

// Romantic background music - Main Rang Sharbaton Ka
const MUSIC_URL = '/love-song.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Show player after a delay
    const timer = setTimeout(() => {
      setShowPlayer(true);
    }, 2000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!showPlayer) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-rose-100">
        {/* Music Icon */}
        <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
          <Music className="w-4 h-4 text-white" />
        </div>

        {/* Song Info */}
        <div className="hidden sm:block">
          <p className="text-xs text-gray-500">Main Rang Sharbaton Ka</p>
          <p className="text-xs text-rose-400">Playing for you</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-200 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-rose-500" />
            ) : (
              <Play className="w-4 h-4 text-rose-500 ml-0.5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
