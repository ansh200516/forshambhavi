import { useState, useEffect, useRef } from 'react';
import './App.css';
import PrivacyLock from './sections/PrivacyLock';
import WelcomeSection from './sections/WelcomeSection';
import LoveLetter from './sections/LoveLetter';
import LoveTimeline from './sections/LoveTimeline';
import WhyILoveYou from './sections/WhyILoveYou';
import Flashcards from './sections/Flashcards';
import Photobooth from './sections/Photobooth';
import CountdownSection from './sections/CountdownSection';
import GamifiedProposal from './sections/GamifiedProposal';
import AnimatedProposal from './sections/AnimatedProposal';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => {
        setShowMusicPlayer(true);
      }, 1000);
    }
  }, [isUnlocked]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 overflow-x-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="heart-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div ref={mainRef} className="relative z-10">
        {!isUnlocked ? (
          <PrivacyLock onUnlock={handleUnlock} />
        ) : (
          <main className="animate-fade-in">
            <WelcomeSection />
            <LoveLetter />
            <LoveTimeline />
            <WhyILoveYou />
            <Flashcards />
            <Photobooth />
            <CountdownSection />
            <GamifiedProposal />
            <AnimatedProposal />
          </main>
        )}
      </div>

      {/* Music Player */}
      {showMusicPlayer && <MusicPlayer />}
    </div>
  );
}

export default App;
