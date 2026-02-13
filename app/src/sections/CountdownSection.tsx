import { Heart, Sparkles, Plane, Home, Sunset } from 'lucide-react';

const futurePlans = [
  {
    icon: Plane,
    text: 'Travel to a new city together and get lost on purpose.'
  },
  {
    icon: Home,
    text: 'Build a home filled with laughter, love, and late-night talks.'
  },
  {
    icon: Sunset,
    text: 'Watch sunsets in silence, together.'
  }
];

export default function CountdownSection() {
  return (
    <section className="section-container bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-white/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Meaningful Message */}
        <div className="text-center mb-16">
          <Heart className="w-10 h-10 text-rose-300 mx-auto mb-4 animate-heartbeat" fill="currentColor" />
          <h2 className="font-vibes text-5xl md:text-6xl text-white mb-4">
            Our Journey Together
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every moment with you is a gift. From our first hello to this very second, 
            you've filled my life with meaning, joy, and endless love. 
            Here's to the beautiful future we're building together.
          </p>
        </div>

        {/* Future Plans */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="text-white text-xl font-medium">OUR FUTURE PLANS</h3>
            <Heart className="w-5 h-5 text-rose-300" fill="currentColor" />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {futurePlans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-8 h-8 text-rose-300 mb-4" />
                <p className="text-white/90 text-sm leading-relaxed">{plan.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
