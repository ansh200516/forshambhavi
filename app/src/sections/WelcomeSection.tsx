import { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

// Simple confetti implementation
const createConfetti = () => {
  const colors = ['#e63946', '#ff758c', '#ffb3c1', '#ffd700', '#ff6b9d'];
  
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.width = '10px';
    el.style.height = '10px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10px';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear forwards`;
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 5000);
  }
};

export default function WelcomeSection() {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [buttonClicked, setButtonClicked] = useState(false);

  // Set your relationship start date here (format: YYYY-MM-DD)
  const START_DATE = '2025-04-01';

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(START_DATE);
      const now = new Date();
      const diff = now.getTime() - start.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShowerLove = () => {
    setButtonClicked(true);
    createConfetti();
    
    setTimeout(() => {
      setButtonClicked(false);
    }, 3000);
  };

  return (
    <section className="section-container min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-pink-50/50 to-rose-100/50" />
      
      {/* Notification Toast */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2 animate-slide-down">
        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        <span className="text-sm text-gray-700">Welcome, my love! ❤️</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto pt-16">
        {/* Sparkles */}
        <div className="flex justify-center gap-4 mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>

        {/* Title */}
        <p className="text-rose-500 font-script text-xl mb-2">Happy Valentine's Day</p>
        
        {/* Name */}
        <h1 className="font-vibes text-6xl md:text-7xl text-gray-800 mb-4 animate-fade-in">
          Shambhavi
        </h1>

        {/* Quote */}
        <p className="text-gray-600 text-lg italic mb-8 font-light">
          "My heart beats only for you."
        </p>

        {/* Shower Love Button */}
        <button
          onClick={handleShowerLove}
          className={`btn-valentine flex items-center gap-2 mx-auto mb-12 transition-all duration-300 ${
            buttonClicked ? 'scale-110' : ''
          }`}
        >
          <Heart className={`w-5 h-5 ${buttonClicked ? 'animate-heartbeat' : ''}`} fill="currentColor" />
          Shower me with Love
        </button>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mb-8 text-gray-500">
          <span className="text-sm">Scroll to unwrap your gift</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Timer */}
        <div className="glass-dark rounded-2xl p-6 inline-block">
          <p className="text-white/80 text-sm mb-3 uppercase tracking-wider">
            We've been together for
          </p>
          <div className="flex items-center justify-center gap-4 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">{timeTogether.days}</div>
              <div className="text-xs text-white/60">days</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold">{timeTogether.hours}</div>
              <div className="text-xs text-white/60">hours</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold">{timeTogether.minutes}</div>
              <div className="text-xs text-white/60">mins</div>
            </div>
            <div className="text-2xl">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold">{timeTogether.seconds}</div>
              <div className="text-xs text-white/60">secs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Animation Style */}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes slide-down {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
