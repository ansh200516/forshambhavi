import { useState } from 'react';
import { Heart, Gift } from 'lucide-react';

// Simple confetti function
const createConfetti = () => {
  const colors = ['#e63946', '#ff758c', '#ffb3c1', '#ffd700', '#ff6b9d', '#85e3ff', '#98fb98'];
  
  for (let i = 0; i < 150; i++) {
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
    el.style.animation = `confetti-fall ${3 + Math.random() * 3}s linear forwards`;
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 6000);
  }
};

export default function AnimatedProposal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  const handleBoxClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      createConfetti();
      setTimeout(() => {
        setShowProposal(true);
      }, 800);
    }
  };

  return (
    <section className="section-container bg-gradient-to-b from-white to-rose-100 py-20 relative overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-200/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 text-center">
        {!showProposal ? (
          <div className="animate-fade-in">
            {/* Title */}
            <h2 className="font-vibes text-4xl text-gray-800 mb-2">
              One Last Surprise...
            </h2>
            <p className="text-rose-400 text-sm mb-12">Click the box to open</p>

            {/* Gift Box */}
            <div 
              onClick={handleBoxClick}
              className="relative w-40 h-40 mx-auto cursor-pointer group"
            >
              {/* Box Container */}
              <div className="relative w-full h-full">
                {/* Lid */}
                <div 
                  className={`absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-rose-400 to-rose-500 rounded-t-lg z-20 transition-transform duration-700 origin-bottom ${
                    isOpen ? 'translate-y-[-80px] rotate-[-15deg]' : 'group-hover:translate-y-[-5px]'
                  }`}
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Ribbon on lid */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-full bg-rose-300" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-4 bg-rose-300" />
                </div>

                {/* Box Body */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-b from-rose-500 to-rose-600 rounded-b-lg z-10"
                  style={{
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Ribbon on body */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-rose-400" />
                  
                  {/* Heart on box */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Heart 
                      className={`w-12 h-12 text-white transition-all duration-500 ${
                        isOpen ? 'scale-150 opacity-0' : 'animate-pulse'
                      }`} 
                      fill="currentColor" 
                    />
                  </div>
                </div>

                {/* Sparkles when closed */}
                {!isOpen && (
                  <>
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
                    <div className="absolute -top-4 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute top-0 -right-4 w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </>
                )}

                {/* Confetti explosion from box */}
                {isOpen && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-ping"
                        style={{
                          backgroundColor: ['#e63946', '#ff758c', '#ffd700', '#ff6b9d'][i % 4],
                          transform: `rotate(${i * 30}deg) translateY(-40px)`,
                          animationDelay: `${i * 0.05}s`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-black/20 rounded-full blur-md" />
            </div>

            {/* Hint */}
            <p className="text-gray-400 text-sm mt-8 flex items-center justify-center gap-2">
              <Gift className="w-4 h-4" />
              Made with all my heart
              <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
            </p>
          </div>
        ) : (
          /* Proposal Revealed */
          <div className="animate-scale-up">
            {/* Celebration */}
            <div className="mb-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${10 + i * 10}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                >
                  ✨
                </div>
              ))}
            </div>

            {/* Message */}
            <h2 className="font-vibes text-6xl text-rose-500 mb-6 animate-fade-in leading-relaxed">
              I Love You
            </h2>
            <h3 className="font-vibes text-5xl text-pink-500 mb-8 animate-fade-in">
              Forever & Always
            </h3>

            {/* Message Button */}
            <button
              onClick={() => createConfetti()}
              className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold text-xl transition-all hover:shadow-xl hover:shadow-rose-500/40 hover:scale-110 animate-pulse-glow"
            >
              ❤️ Forever ❤️
            </button>

            {/* Hearts Animation */}
            <div className="mt-8 flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-rose-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
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
        @keyframes scale-up {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
