import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Share2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const imageBasePath = '/assets/images/';
const allImages: string[] = [
  'WhatsApp Image 2026-01-08 at 1.48.07 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.07 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.08 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.08 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.09 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.10 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.10 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.11 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.11 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.12 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.13 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.13 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.14 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.15 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.15 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.16 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.16 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.17 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.18 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.18 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.19 PM (2).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.20 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.20 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.21 PM.jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.21 PM (1).jpeg',
  'WhatsApp Image 2026-01-08 at 1.48.22 PM.jpeg',
];

export const Gallery: React.FC = () => {
  const { language, t, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const isAr = language === 'ar' || language === 'eg';

  // 1. Progress Bar (For better scrolling UX)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const nextImage = () => selectedImage !== null && setSelectedImage((selectedImage + 1) % allImages.length);
  const prevImage = () => selectedImage !== null && setSelectedImage((selectedImage - 1 + allImages.length) % allImages.length);

  // Swipe logic for Mobile
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) nextImage();
    else if (swipe > 50) prevImage();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    if (selectedImage !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-36 pb-20 px-4 md:px-[6%] overflow-x-hidden" dir={dir}>
      {/* Scroll Progress Indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] origin-left" style={{ scaleX }} />

      <header className="max-w-4xl mb-12 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-primary font-black tracking-[0.3em] text-[10px] uppercase mb-4"
        >
          <Sparkles size={14} className="animate-pulse" /> {t('gallery')}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none"
        >
          {isAr ? 'نيــمورا' : 'NEMORA'} <br/>
          <span className="text-4xl md:text-7xl opacity-80">{isAr ? 'الفيـجن' : 'VISION'}</span>
        </motion.h1>
      </header>

      {/* Grid Layout - Optimized for Mobile Spacing */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6">
        {allImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            className="relative group cursor-none md:cursor-pointer rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 active:scale-95 transition-all duration-500"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`${imageBasePath}${image}`}
              alt={`Nemora ${index}`}
              className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 backdrop-blur-[1px]">
               <div className="flex flex-col items-center gap-2">
                  <div className="bg-white/10 p-3 rounded-full border border-white/20">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Expand View</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox - Gesture Based */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-2xl touch-none"
            onClick={() => setSelectedImage(null)}
          >
            {/* Safe Area Close for Mobile */}
            <motion.button 
              initial={{ y: -20 }} animate={{ y: 0 }}
              className="absolute top-6 right-6 z-[1100] p-4 bg-white/5 rounded-full text-white/80 active:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            {/* Desktop Nav - Hidden on small mobile */}
            <div className="hidden md:flex">
              <button className="absolute left-8 z-[1100] p-5 bg-white/5 rounded-full hover:bg-primary/20 transition-all border border-white/5" onClick={(e) => { e.stopPropagation(); prevImage(); }}><ChevronLeft size={32} /></button>
              <button className="absolute right-8 z-[1100] p-5 bg-white/5 rounded-full hover:bg-primary/20 transition-all border border-white/5" onClick={(e) => { e.stopPropagation(); nextImage(); }}><ChevronRight size={32} /></button>
            </div>

            {/* Image Card with Gestures */}
            <motion.div 
              key={selectedImage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ x: 100, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -100, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full md:w-auto max-w-[95vw] md:max-w-[80vw] h-[70vh] md:h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`${imageBasePath}${allImages[selectedImage]}`}
                alt="Nemora Large"
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              />
              
              {/* Mobile Info Overlay */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-16 md:bottom-8 flex flex-col items-center gap-4 w-full"
              >
                <div className="flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                  <span className="text-xs font-black text-primary tracking-[0.3em]">NEMORA 0{selectedImage + 1}</span>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <span className="text-xs font-medium text-white/40">{selectedImage + 1} / {allImages.length}</span>
                </div>
                
                {/* Swipe Hint for Mobile */}
                <span className="md:hidden text-[10px] text-white/20 uppercase tracking-[.4em] animate-pulse">
                  {isAr ? 'اسحب للتنقل' : 'Swipe to Navigate'}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        body { -webkit-tap-highlight-color: transparent; }
        .columns-2 { column-count: 2; }
        @media (min-width: 768px) { .columns-2 { column-count: 3; } }
        @media (min-width: 1024px) { .columns-2 { column-count: 4; } }
      `}</style>
    </div>
  );
};