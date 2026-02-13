import { useState } from 'react';
import { Heart, Music } from 'lucide-react';

// Simple confetti function
const createConfetti = () => {
  const colors = ['#e63946', '#ff758c', '#ffb3c1', '#ffd700', '#ff6b9d', '#85e3ff'];
  
  for (let i = 0; i < 100; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.width = Math.random() > 0.5 ? '12px' : '8px';
    el.style.height = el.style.width;
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-10px';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.animation = `confetti-fall ${3 + Math.random() * 2}s linear forwards`;
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 5000);
  }
};

export default function GamifiedProposal() {
  const [stage, setStage] = useState<'initial' | 'rejected1' | 'rejected2' | 'accepted'>('initial');
  const [noCount, setNoCount] = useState(0);

  const handleNo = () => {
    setNoCount(prev => prev + 1);
    if (noCount === 0) {
      setStage('rejected1');
    } else {
      setStage('rejected2');
    }
  };

  const handleYes = () => {
    setStage('accepted');
    createConfetti();
  };

  const reset = () => {
    setStage('initial');
    setNoCount(0);
  };

  return (
    <section className="section-container bg-gradient-to-b from-rose-50 to-white py-20 relative overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-200/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
        {stage === 'initial' && (
          <div className="animate-fade-in">
            {/* Question */}
            <h2 className="font-vibes text-5xl text-rose-500 mb-8">
              Will you be my Valentine?
            </h2>
            <div className="text-4xl mb-8">🌹</div>

            {/* Teddy Bear */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Body */}
                <ellipse cx="100" cy="140" rx="50" ry="45" fill="#8B4513" />
                {/* Head */}
                <circle cx="100" cy="80" r="45" fill="#8B4513" />
                {/* Ears */}
                <circle cx="65" cy="50" r="18" fill="#8B4513" />
                <circle cx="135" cy="50" r="18" fill="#8B4513" />
                <circle cx="65" cy="50" r="10" fill="#D2691E" />
                <circle cx="135" cy="50" r="10" fill="#D2691E" />
                {/* Snout */}
                <ellipse cx="100" cy="90" rx="20" ry="15" fill="#D2691E" />
                <ellipse cx="100" cy="85" rx="8" ry="6" fill="#333" />
                {/* Eyes */}
                <circle cx="85" cy="75" r="5" fill="#333" />
                <circle cx="115" cy="75" r="5" fill="#333" />
                <circle cx="87" cy="73" r="2" fill="white" />
                <circle cx="117" cy="73" r="2" fill="white" />
                {/* Mouth */}
                <path d="M95 95 Q100 100 105 95" stroke="#333" strokeWidth="2" fill="none" />
                {/* Arms raised */}
                <ellipse cx="55" cy="120" rx="15" ry="25" fill="#8B4513" transform="rotate(-30 55 120)" />
                <ellipse cx="145" cy="120" rx="15" ry="25" fill="#8B4513" transform="rotate(30 145 120)" />
                {/* Heart */}
                <Heart className="absolute top-4 right-8 w-8 h-8 text-rose-400" fill="currentColor" />
              </svg>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNo}
                className="px-8 py-3 bg-gray-400 text-white rounded-full font-medium transition-all hover:bg-gray-500 hover:scale-105 flex items-center gap-2"
              >
                No 😢
              </button>
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105 flex items-center gap-2 animate-pulse-glow"
              >
                Yes! ❤️
              </button>
            </div>
          </div>
        )}

        {stage === 'rejected1' && (
          <div className="animate-fade-in">
            <h2 className="font-vibes text-4xl text-rose-500 mb-4">
              How could you?! 😠
            </h2>
            <p className="text-gray-600 mb-8">Wrong answer! Try again before I cry...</p>

            {/* Angry Bear */}
            <div className="relative w-48 h-48 mx-auto mb-8 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🐻</div>
                <p className="text-2xl font-bold text-rose-500">SO ANGRY!</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNo}
                className="px-8 py-3 bg-gray-300 text-gray-500 rounded-full font-medium cursor-not-allowed flex items-center gap-2"
                disabled
              >
                No 😢
              </button>
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105 flex items-center gap-2"
              >
                Okay, YES! 🎉
              </button>
            </div>
          </div>
        )}

        {stage === 'rejected2' && (
          <div className="animate-fade-in">
            <h2 className="font-vibes text-4xl text-rose-500 mb-4">
              Really? Again?! 🐻
            </h2>
            <p className="text-gray-600 mb-8">You're breaking my heart... 💔</p>

            {/* Sad Bear */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background */}
                <rect width="200" height="200" fill="#87CEEB" rx="20" />
                {/* Rain */}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1={30 + i * 20}
                    y1="20"
                    x2={20 + i * 20}
                    y2="60"
                    stroke="#4682B4"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                ))}
                {/* Clouds */}
                <ellipse cx="50" cy="40" rx="30" ry="20" fill="#708090" />
                <ellipse cx="150" cy="30" rx="35" ry="25" fill="#708090" />
                {/* Bear */}
                <circle cx="100" cy="120" r="40" fill="#8B4513" />
                <circle cx="70" cy="95" r="15" fill="#8B4513" />
                <circle cx="130" cy="95" r="15" fill="#8B4513" />
                {/* Sad eyes */}
                <circle cx="85" cy="115" r="4" fill="#333" />
                <circle cx="115" cy="115" r="4" fill="#333" />
                {/* Frown */}
                <path d="M90 135 Q100 125 110 135" stroke="#333" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleNo}
                className="px-8 py-3 bg-gray-200 text-gray-400 rounded-full font-medium line-through cursor-not-allowed flex items-center gap-2"
                disabled
              >
                No 😢
              </button>
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-rose-500/30 hover:scale-105 flex items-center gap-2 animate-bounce"
              >
                Okay, YES! 🎉
              </button>
            </div>
          </div>
        )}

        {stage === 'accepted' && (
          <div className="animate-fade-in">
            <h2 className="font-vibes text-5xl text-rose-500 mb-4">
              Yayyyyy! 🎉
            </h2>
            <p className="text-gray-600 mb-8">"I knew you'd say yes! I love you! ❤️"</p>

            {/* Happy Dancing Bears */}
            <div className="relative w-64 h-48 mx-auto mb-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              <div className="flex items-end justify-center gap-4">
                {/* Brown Bear */}
                <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>
                  🐻
                </div>
                {/* White Bear */}
                <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                  🐻‍❄️
                </div>
              </div>
              {/* Music Notes */}
              <Music className="absolute top-4 left-8 w-6 h-6 text-rose-400 animate-pulse" />
              <Music className="absolute top-8 right-8 w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Reset Button */}
            <button
              onClick={reset}
              className="px-6 py-2 text-rose-400 hover:text-rose-500 text-sm transition-colors"
            >
              Play again?
            </button>
          </div>
        )}
      </div>

      {/* Confetti Animation */}
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
      `}</style>
    </section>
  );
}
