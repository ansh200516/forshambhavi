import { useState } from 'react';
import { Heart, X, Mail } from 'lucide-react';

const flashcards = [
  {
    id: 1,
    title: 'You Miss Me',
    message: `My Dearest,

Open when you miss me...

Close your eyes and take a deep breath. Can you feel it? That's my love wrapping around you like a warm hug. I'm always with you, in every heartbeat, in every gentle breeze, in every star that twinkles at night.

Count the days until we meet again, but know that distance means so little when someone means so much. You're always in my thoughts and forever in my heart.

With all my love,
Your Valentine ❤️`,
    stamp: 'LOVE'
  },
  {
    id: 2,
    title: 'You\'re Sad',
    message: `My Dearest,

Open when you're sad...

I wish I could be there to wipe away your tears and hold you close. But since I can't, please know that it's okay to feel sad sometimes. Your feelings are valid, and you don't have to be strong all the time.

Remember: after every storm, the sun shines brighter. This too shall pass, and I'll be right here, loving you through it all.

You are stronger than you know, and you are never alone.

With all my love,
Your Valentine ❤️`,
    stamp: 'HUGS'
  },
  {
    id: 3,
    title: 'You\'re Happy',
    message: `My Dearest,

Open when you're happy...

Yay! I'm so happy that you're happy! Keep smiling, it looks beautiful on you. 😊

Your happiness is my happiness. When you shine, my whole world lights up. Celebrate this moment, cherish this feeling, and remember that you deserve all the joy in the world.

May your days be filled with countless moments like this!

With all my love,
Your Valentine ❤️`,
    stamp: 'JOY'
  },
  {
    id: 4,
    title: 'You Can\'t Sleep',
    message: `My Dearest,

Open when you can't sleep...

Close your eyes and imagine us together - walking on a beach, holding hands, with nothing but the sound of waves and our laughter filling the air.

Think of all the beautiful memories we've created and all the adventures that await us. Let your mind drift to our happy place.

Sweet dreams, my love. I'll be waiting for you there.

With all my love,
Your Valentine ❤️`,
    stamp: 'DREAM'
  }
];

export default function Flashcards() {
  const [selectedCard, setSelectedCard] = useState<typeof flashcards[0] | null>(null);

  return (
    <section className="section-container bg-gradient-to-b from-rose-50 to-white py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Mail className="w-8 h-8 text-rose-400 mx-auto mb-4" />
        <h2 className="font-vibes text-5xl text-gray-800 mb-2">Open When...</h2>
        <p className="text-gray-500 font-light">Little reminders of my love for every mood</p>
      </div>

      {/* Flashcards Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashcards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              {/* Envelope Card */}
              <div className="relative bg-gradient-to-br from-blue-50 to-white border-2 border-dashed border-blue-300 rounded-lg p-6 aspect-[4/3] flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-shadow">
                {/* Air Mail Border */}
                <div className="absolute inset-2 border border-red-300/50 rounded" 
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, #ff6b6b 10px, #ff6b6b 12px, transparent 12px, transparent 22px, #4dabf7 22px, #4dabf7 24px)',
                    backgroundSize: '100% 2px, 2px 100%',
                    backgroundPosition: 'top, right, bottom, left',
                    backgroundRepeat: 'repeat-x, repeat-y',
                    opacity: 0.3
                  }}
                />

                {/* Stamp */}
                <div className="absolute top-3 right-3 w-10 h-12 bg-white border border-red-300 rounded flex flex-col items-center justify-center text-[8px] text-red-400 font-bold">
                  <span>FEB 14</span>
                  <span>EXPRESS</span>
                  <span>DELIVERY</span>
                  <Heart className="w-4 h-4 mt-0.5" fill="currentColor" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <p className="text-xs text-gray-500 mb-1">To: My Love</p>
                  <h3 className="font-script text-2xl text-gray-700 mb-3">{card.title}</h3>
                  <div className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600 font-medium">
                    OPEN WHEN
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-rose-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Modal */}
      {selectedCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-2xl overflow-hidden animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Letter Content */}
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="text-center mb-6">
                <p className="text-rose-400 text-sm font-script text-lg">My Dearest,</p>
                <p className="text-gray-500 text-sm mt-1">Open when {selectedCard.title.toLowerCase()}...</p>
              </div>

              {/* Message */}
              <div className="bg-white/60 rounded-xl p-6 mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line font-light">
                  {selectedCard.message}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center gap-2 text-rose-400">
                <Heart className="w-4 h-4" fill="currentColor" />
                <span className="font-script text-lg">Your Valentine</span>
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes scale-up {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
