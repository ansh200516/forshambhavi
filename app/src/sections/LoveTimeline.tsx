import { Heart, MessageCircle, Moon, Sparkles, Gift } from 'lucide-react';

const timelineEvents = [
  {
    date: '01 April 2025',
    title: 'First Message',
    description: 'A simple reply to a reel you liked that turned into endless conversations and unexpected feelings.',
    icon: MessageCircle,
    side: 'right'
  },
  {
    date: '15 July 2025',
    title: 'Late Night Talks',
    description: 'Talking past midnight for the first time, sharing secrets, laughing softly, and forgetting the world.',
    icon: Moon,
    side: 'left'
  },
  {
    date: '5 Dec 2025',
    title: 'First Argument',
    description: 'I misunderstood you being busy for being uninterested, but then you never let that happen again.',
    icon: Heart,
    side: 'right'
  },
  {
    date: '13 Dec 2025',
    title: 'Making Up',
    description: 'All apologies, that prove love and mutual understanding always wins.',
    icon: Sparkles,
    side: 'left'
  },
  {
    date: '03 Feb 2026',
    title: 'First Surprise',
    description: 'You showed me the bangels you liked and I bought them instantly for you.',
    icon: Gift,
    side: 'right'
  }
];

export default function LoveTimeline() {
  return (
    <section className="section-container bg-gradient-to-b from-white to-rose-50 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4 animate-heartbeat" fill="currentColor" />
        <h2 className="font-vibes text-5xl text-gray-800 mb-2">Our Story</h2>
        <p className="text-gray-500 font-light">How it all began...</p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-rose-300 via-rose-400 to-rose-300 hidden md:block" />

        {/* Mobile Line */}
        <div className="absolute left-8 w-0.5 h-full bg-gradient-to-b from-rose-300 via-rose-400 to-rose-300 md:hidden" />

        {/* Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isRight = event.side === 'right';

            return (
              <div 
                key={index} 
                className={`relative flex items-center ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${isRight ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div 
                    className={`bg-white rounded-2xl p-6 shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                      isRight ? 'md:text-right' : 'md:text-left'
                    }`}
                  >
                    {/* Date */}
                    <p className="text-rose-400 text-sm font-medium mb-2">{event.date}</p>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      {!isRight && <Icon className="w-5 h-5 text-rose-400 md:hidden" />}
                      {event.title}
                      {isRight && <Icon className="w-5 h-5 text-rose-400 md:hidden" />}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Empty Space for other side */}
                <div className="hidden md:block md:w-5/12" />
              </div>
            );
          })}
        </div>

        {/* Bottom Heart */}
        <div className="flex justify-center mt-12">
          <Heart className="w-6 h-6 text-rose-400 animate-bounce" fill="currentColor" />
        </div>
      </div>
    </section>
  );
}
