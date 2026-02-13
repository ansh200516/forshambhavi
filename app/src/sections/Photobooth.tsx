import { useState, useRef, useCallback } from 'react';
import { Camera, RefreshCw, Download, Image as ImageIcon, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

const frames = [
  { id: 'valentine1', name: 'Valentine Special 1', color: '#e63946' },
  { id: 'valentine2', name: 'Valentine Special 2', color: '#ff758c' },
  { id: 'love', name: 'Love Strip', color: '#ff6b9d' },
];

export default function Photobooth() {
  const [mode, setMode] = useState<'single' | 'strip'>('single');
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [showResult, setShowResult] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setCameraError(false);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError(true);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg');
      }
    }
    return null;
  }, []);

  // Start countdown and capture
  const startCapture = async () => {
    setIsCapturing(true);
    setPhotos([]);
    
    const photoCount = mode === 'strip' ? 3 : 1;
    const capturedPhotos: string[] = [];

    for (let i = 0; i < photoCount; i++) {
      // Countdown
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setCountdown(0);

      // Capture
      const photo = capturePhoto();
      if (photo) {
        capturedPhotos.push(photo);
        setPhotos([...capturedPhotos]);
      }

      // Small delay between photos for strip mode
      if (mode === 'strip' && i < photoCount - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsCapturing(false);
    setShowResult(true);
    stopCamera();
  };

  // Retake photos
  const retake = () => {
    setPhotos([]);
    setShowResult(false);
    startCamera();
  };

  // Save photo strip
  const savePhotoStrip = () => {
    if (photos.length === 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const photoWidth = 300;
    const photoHeight = 400;
    const padding = 20;
    const headerHeight = 80;
    const footerHeight = 40;

    if (mode === 'strip') {
      canvas.width = photoWidth + padding * 2;
      canvas.height = headerHeight + (photoHeight * 3) + (padding * 4) + footerHeight;

      // Background
      ctx.fillStyle = selectedFrame.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Dancing Script';
      ctx.textAlign = 'center';
      ctx.fillText('Happy Valentine\'s Day', canvas.width / 2, 40);
      ctx.font = '16px Poppins';
      ctx.fillText('LOVE IN FOCUS', canvas.width / 2, 65);

      // Photos
      photos.forEach((photo, index) => {
        const img = new Image();
        img.onload = () => {
          const y = headerHeight + padding + (index * (photoHeight + padding));
          ctx.drawImage(img, padding, y, photoWidth, photoHeight);
        };
        img.src = photo;
      });

      // Footer
      ctx.fillStyle = 'white';
      ctx.font = '12px Poppins';
      ctx.fillText(`A Valentine's Gift • ${new Date().toLocaleDateString()}`, canvas.width / 2, canvas.height - 15);
    } else {
      canvas.width = photoWidth + padding * 2;
      canvas.height = photoHeight + padding * 2 + headerHeight + footerHeight;

      // Background
      ctx.fillStyle = selectedFrame.color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Dancing Script';
      ctx.textAlign = 'center';
      ctx.fillText('Happy Valentine\'s Day', canvas.width / 2, 35);

      // Photo
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, padding, headerHeight + padding, photoWidth, photoHeight);
      };
      img.src = photos[0];

      // Footer
      ctx.fillStyle = 'white';
      ctx.font = '12px Poppins';
      ctx.fillText(`A Valentine's Gift • ${new Date().toLocaleDateString()}`, canvas.width / 2, canvas.height - 15);
    }

    // Download
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `valentine-photobooth-${Date.now()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    }, 500);
  };

  // Initialize camera on mount
  if (!showResult && !cameraError && !streamRef.current) {
    startCamera();
  }

  return (
    <section className="section-container bg-gradient-to-b from-white to-rose-50 py-20">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Camera className="w-8 h-8 text-rose-400 mx-auto mb-4" />
        <h2 className="font-vibes text-5xl text-gray-800 mb-2">Love Booth</h2>
        <p className="text-gray-500 font-light">Capture our love or pick a memory!</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Mode Selection */}
        {!showResult && (
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setMode('single')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                mode === 'single' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
              }`}
            >
              <Camera className="w-4 h-4" />
              Single Shot
            </button>
            <button
              onClick={() => setMode('strip')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                mode === 'strip' 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
              }`}
            >
              <Film className="w-4 h-4" />
              Photo Strip
            </button>
          </div>
        )}

        {/* Camera/Result Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {!showResult ? (
            <div className="relative">
              {/* Video Preview */}
              <div className="relative aspect-video bg-gray-900">
                {cameraError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Camera access denied or not available</p>
                      <Button onClick={startCamera} className="mt-4">
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Frame Overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 0 10px ${selectedFrame.color}`,
                      }}
                    />

                    {/* Countdown Overlay */}
                    {countdown > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-8xl font-bold text-white animate-pulse">
                          {countdown}
                        </span>
                      </div>
                    )}

                    {/* Photo Counter for Strip Mode */}
                    {mode === 'strip' && isCapturing && (
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        Photo {photos.length + 1}/3
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="p-6">
                {/* Frame Selection */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Choose Frame
                  </p>
                  <div className="flex gap-3">
                    {frames.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedFrame.id === frame.id
                            ? 'ring-2 ring-rose-500 bg-rose-50'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <span 
                          className="inline-block w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: frame.color }}
                        />
                        {frame.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capture Button */}
                <button
                  onClick={startCapture}
                  disabled={isCapturing || cameraError}
                  className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCapturing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Capturing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      {mode === 'strip' ? 'Start Booth Strip' : 'Take Photo'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Result View */
            <div className="p-6">
              <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                {mode === 'strip' ? (
                  <div 
                    className="p-4 h-full"
                    style={{ backgroundColor: selectedFrame.color }}
                  >
                    <div className="text-center text-white mb-2">
                      <p className="font-script text-lg">Happy Valentine's Day</p>
                      <p className="text-xs">LOVE IN FOCUS</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 h-[calc(100%-60px)]">
                      {photos.map((photo, i) => (
                        <img 
                          key={i} 
                          src={photo} 
                          alt={`Photo ${i + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <img 
                    src={photos[0]} 
                    alt="Captured"
                    className="w-full h-full object-contain"
                    style={{ backgroundColor: selectedFrame.color }}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={retake}
                  className="flex-1 py-3 border-2 border-rose-500 text-rose-500 rounded-xl font-medium transition-all hover:bg-rose-50 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Retake
                </button>
                <button
                  onClick={savePhotoStrip}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-rose-500/30 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}
