import { useState, useEffect } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

const reasons = [
  "You make me laugh on my worst days.",
  "You choose me, every single day.",
  "Your laughter brightens up my entire world.",
  "You understand me without me saying a word.",
  "You make ordinary moments extraordinary.",
  "Your kindness inspires me to be better.",
  "You support my dreams unconditionally.",
  "You make me feel loved and cherished.",
  "You're my best friend and my soulmate.",
  "You always know how to cheer me up.",
  "Your love makes me believe in magic.",
  "You're the most beautiful person inside and out.",
  "You make every day feel like Valentine's Day.",
  "You're my forever and always.",
  "Your smile lights up even my darkest moments.",
  "You see the best in me when I can't see it myself.",
  "Every conversation with you feels like coming home.",
  "You make me want to be a better person every day.",
  "Your presence alone makes everything feel right.",
  "You celebrate my wins like they're your own.",
  "You hold my hand through every storm.",
  "Your compassion for others inspires me endlessly.",
  "You remember the little things that matter to me.",
  "You make me feel safe enough to be vulnerable.",
  "Your determination shows me what true strength is.",
  "You turn my bad days into beautiful memories.",
  "You believe in me even when I doubt myself.",
  "You make the future something I can't wait for.",
  "You challenge me to grow beyond my comfort zone.",
  "Your patience with me is nothing short of amazing.",
  "You make me feel understood in ways I never thought possible.",
  "Your love has healed parts of me I didn't know were broken.",
  "You're the calm in the middle of my chaos.",
  "Your voice is my favorite sound in the world.",
  "You make sacrifices without expecting anything in return.",
  "Your intelligence and wit keep me captivated.",
  "You see beauty in things I would overlook.",
  "Your loyalty makes me feel truly valued.",
  "You make me feel like the luckiest person alive.",
  "Your spontaneity brings adventure into my life.",
  "You accept my flaws and love me anyway.",
  "Your optimism helps me see the silver lining.",
  "You make me feel cherished in a way no one else has.",
  "Your dreams inspire me to chase my own.",
  "You're the person I want to tell everything to.",
  "Your strength during tough times amazes me.",
  "You make me feel like I finally found where I belong.",
  "Your laugh is contagious and fills me with joy.",
  "You listen to me like my words truly matter.",
  "Your thoughtfulness in small gestures means everything.",
  "You make me believe in the power of true love.",
  "Your embrace feels like a thousand words of comfort.",
  "You inspire me to see the world differently.",
  "Your passion for life is absolutely infectious.",
  "You make me feel beautiful inside and out.",
  "Your honesty helps me trust in ways I never could before.",
  "You remind me what it means to be truly alive.",
  "Your playfulness brings out my inner child.",
  "You make even silence feel comfortable and warm.",
  "Your faith in us gives me strength to face anything.",
  "You're the missing piece I didn't know I needed."
];

// Simple confetti function
const createConfetti = () => {
  const colors = ['#e63946', '#ff758c', '#ffb3c1', '#ffd700', '#ff6b9d', '#ff85a1'];
  
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.width = Math.random() > 0.5 ? '10px' : '8px';
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

export default function WhyILoveYou() {
  const [currentReason, setCurrentReason] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    createConfetti();
    
    // Pick a random reason different from current
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * reasons.length);
    } while (reasons[newIndex] === currentReason);
    
    setTimeout(() => {
      setCurrentReason(reasons[newIndex]);
      setIsAnimating(false);
    }, 300);
  };

  // Set initial reason on mount
  useEffect(() => {
    setCurrentReason(reasons[0]);
  }, []);

  return (
    <section className="section-container bg-gradient-to-b from-white to-rose-50 py-20 relative overflow-hidden">
      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-200/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              width: `${30 + Math.random() * 40}px`,
              height: `${30 + Math.random() * 40}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-vibes text-5xl text-gray-800 mb-2">Why I Love You</h2>
        <p className="text-gray-500 mb-12">Click below to find out...</p>

        {/* Reason Display */}
        <div 
          className={`min-h-[120px] flex items-center justify-center mb-8 transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {currentReason && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-rose-100">
              <Quote className="w-6 h-6 text-rose-400 mx-auto mb-4" />
              <p className="text-xl text-gray-700 font-light italic leading-relaxed">
                "{currentReason}"
              </p>
              <Heart 
                className="w-5 h-5 text-rose-400 mx-auto mt-4" 
                fill="currentColor" 
              />
            </div>
          )}
        </div>

        {/* Click Button */}
        <button
          onClick={handleClick}
          disabled={isAnimating}
          className="btn-valentine flex items-center gap-2 mx-auto disabled:opacity-70"
        >
          <Heart className="w-5 h-5" fill="currentColor" />
          Click to Feel Loved
        </button>

        {/* Refresh hint */}
        <p className="text-gray-400 text-sm mt-6 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Click multiple times for more reasons
        </p>
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
      `}</style>
    </section>
  );
}

// Quote icon component
function Quote({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  );
}
