import { Heart, Gift, Sparkles } from 'lucide-react';

interface PrivacyLockProps {
  onUnlock: () => void;
}

export default function PrivacyLock({ onUnlock }: PrivacyLockProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 p-4">
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-400/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Welcome Card */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-rose-500/90 to-pink-600/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
        {/* Gift Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Gift className="w-12 h-12 text-white" />
            </div>
            {/* Sparkles around the gift */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-yellow-200 animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="font-vibes text-5xl md:text-6xl text-white mb-4 leading-tight">
          Something Special
        </h1>
        <h2 className="font-vibes text-3xl text-white/90 mb-4">
          Awaits You
        </h2>
        
        {/* Subtitle */}
        <p className="text-white/80 text-lg mb-2 leading-relaxed">
          I've created something from my heart,
        </p>
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          just for you...
        </p>

        {/* Open Gift Button */}
        <button
          onClick={onUnlock}
          className="w-full py-5 bg-white text-rose-600 rounded-2xl font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 hover:scale-[1.05] active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <Heart className="w-6 h-6" fill="currentColor" />
          Open Your Gift
          <Heart className="w-6 h-6" fill="currentColor" />
        </button>

        {/* Small Hearts at Bottom */}
        <div className="flex justify-center gap-3 mt-8">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-4 h-4 text-white/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
              fill="currentColor"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
