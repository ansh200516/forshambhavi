import { useState } from 'react';
import { Heart, Quote } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const photos = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop',
    quote: 'Every moment with you feels like a beautiful dream ✨',
    caption: 'Memory #1'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop',
    quote: 'You make my heart skip a beat every single day ❤️',
    caption: 'Memory #2'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop',
    quote: 'Your laugh is my favorite sound in the universe 🎵',
    caption: 'Memory #3'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
    quote: 'Being with you feels like coming home 🏠',
    caption: 'Memory #4'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400&h=400&fit=crop',
    quote: 'You\'re the reason I believe in magic 💫',
    caption: 'Memory #5'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=400&fit=crop',
    quote: 'Together is my favorite place to be 🤗',
    caption: 'Memory #6'
  }
];

export default function PhotosWithQuotes() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section className="section-container bg-gradient-to-b from-rose-50 to-white py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <Heart className="w-8 h-8 text-rose-400 mx-auto mb-4" fill="currentColor" />
        <h2 className="font-vibes text-5xl text-gray-800 mb-2">Captured Moments</h2>
        <p className="text-gray-500 font-light">Every picture tells a story of us...</p>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                index % 3 === 1 ? 'md:mt-8' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <Quote className="w-6 h-6 text-white/60 mb-2" />
                <p className="text-white text-sm font-light italic">{photo.quote}</p>
                <p className="text-white/60 text-xs mt-2">{photo.caption}</p>
              </div>

              {/* Heart Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white">
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-rose-50 to-white">
                <Quote className="w-8 h-8 text-rose-400 mb-4" />
                <p className="text-gray-700 text-lg italic mb-4 leading-relaxed">
                  {selectedPhoto.quote}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <Heart className="w-4 h-4 text-rose-400" fill="currentColor" />
                  <p className="text-gray-500 text-sm">{selectedPhoto.caption}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
