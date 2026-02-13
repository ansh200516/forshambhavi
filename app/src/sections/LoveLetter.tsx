import { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';

const letterPages = [
  {
    content: `My love,

I don't know when it happened, but somewhere between our first conversations and our endless laughs, you became my favorite part of every day. You make ordinary moments feel special just by being you.

With you, I feel safe, understood, and genuinely happy. You've shown me what it means to care deeply, to choose someone every day, and to grow together.

No matter where life takes us, I promise to stand by you, support your dreams, and love you in all the little ways that matter the most.

You are my today, my tomorrow, and my always. ❤️`,
    signature: 'Ansh'
  },
  {
    content: `Every day with you feels like a new adventure. Your voice brightens my darkest days, and your laughter is the melody I want to hear for the rest of my life.

I cherish every moment we spend together - from our silly arguments to our deep conversations. You've taught me what true love really means.

Thank you for being you, for loving me, and for making my life complete. I can't wait to create more beautiful memories with you.

Forever yours, ❤️`,
    signature: 'Ansh'
  },
  {
    content: `As I write this, I'm thinking of all the reasons why I fell in love with you. Your kindness, your strength, your beautiful soul - everything about you makes my heart skip a beat.

I promise to always be there for you, to hold your hand through life's ups and downs, and to love you more with each passing day.

Happy Valentine's Day, my love. Here's to many more years of love and happiness together.

With all my love, ❤️`,
    signature: 'Ansh'
  }
];

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 500);
    }
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => {
      setIsOpen(false);
      setCurrentPage(0);
    }, 300);
  };

  const nextPage = () => {
    if (currentPage < letterPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section className="section-container bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-12">
        <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">Click to unwrap your gift</p>
        <Heart className="w-6 h-6 text-rose-400 mx-auto animate-bounce" fill="currentColor" />
      </div>

      {/* Envelope Container */}
      <div className="relative flex flex-col items-center">
        {!showLetter ? (
          <>
            {/* Envelope */}
            <div 
              onClick={handleEnvelopeClick}
              className={`relative cursor-pointer transition-all duration-500 ${isOpen ? 'scale-110' : 'hover:scale-105'}`}
            >
              {/* Envelope Body */}
              <div className="relative w-72 h-48 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg shadow-2xl overflow-hidden">
                {/* Envelope Flap */}
                <div 
                  className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-rose-300 to-rose-500 origin-top transition-transform duration-500 z-20`}
                  style={{
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  }}
                />
                
                {/* Heart Seal */}
                <div 
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
                    isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
                  </div>
                </div>

                {/* Letter Peek */}
                <div 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-t-lg shadow-inner transition-all duration-500 ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                  }`}
                  style={{ height: '80%' }}
                />
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/10 rounded-full blur-md" />
            </div>

            {/* Text */}
            <p className="mt-8 font-script text-2xl text-gray-600">Read my heart...</p>
          </>
        ) : (
          /* Letter Modal */
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-gradient-to-br from-rose-50 to-white rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Letter Header */}
              <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-center">
                <Heart className="w-8 h-8 text-white mx-auto mb-2" fill="currentColor" />
                <h2 className="font-vibes text-3xl text-white">A Letter From My Heart</h2>
                <p className="text-white/80 text-sm mt-1">Page {currentPage + 1} of {letterPages.length}</p>
              </div>

              {/* Letter Content */}
              <div className="p-8 md:p-12 min-h-[400px] flex flex-col">
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line font-light text-lg">
                    {letterPages[currentPage].content}
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                  <p className="font-script text-2xl text-rose-500">{letterPages[currentPage].signature}</p>
                  <Heart className="w-4 h-4 text-rose-400 inline-block ml-2" fill="currentColor" />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between p-6 border-t border-rose-100">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    currentPage === 0 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Prev
                </button>

                {/* Page Dots */}
                <div className="flex gap-2">
                  {letterPages.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentPage ? 'bg-rose-500 w-4' : 'bg-rose-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === letterPages.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    currentPage === letterPages.length - 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scale Up Animation */}
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
