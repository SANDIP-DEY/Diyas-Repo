import React, { useState } from 'react';
import { Calendar, Heart, Share2, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { FireworksCanvas } from './FireworksCanvas';
import { playKeyClickSound } from '../utils/audio';

interface BentoGridProps {
  onShowToast: (msg: string) => void;
  onNavigateToGallery: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  onShowToast,
  onNavigateToGallery,
}) => {
  const [rangoliLikes, setRangoliLikes] = useState<number>(3420);
  const [isRangoliLiked, setIsRangoliLiked] = useState<boolean>(false);

  const handleToggleRangoliLike = () => {
    playKeyClickSound();
    const nextLiked = !isRangoliLiked;
    setIsRangoliLiked(nextLiked);
    setRangoliLikes((prev) => (nextLiked ? prev + 1 : prev - 1));
    onShowToast(
      nextLiked
        ? 'Rangoli added to your sacred favorites ❤️'
        : 'Removed from favorites'
    );
  };

  const handleShareFeatured = () => {
    playKeyClickSound();
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('✨ 108 Diya Maha-Mandala link copied to clipboard!');
  };

  return (
    <section className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#250015]/60">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#ffb689] tracking-widest uppercase">
              Festive Auspicious Activities
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#ffd8e7] mt-1">
              Immerse in the Radiant Traditions
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full bg-[#43022b] text-[#3ae441] text-xs sm:text-sm font-semibold flex items-center gap-2 border border-[#fe8932]/20">
              <Calendar className="w-4 h-4 text-[#3ae441]" />
              <span>Kartik Amavasya 2026</span>
            </span>
          </div>
        </div>

        {/* Bento Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Bento Card 1: Virtual Fireworks Simulator (Col 1-7) */}
          <div id="virtual-fireworks" className="md:col-span-7 scroll-mt-24">
            <FireworksCanvas onShowToast={onShowToast} />
          </div>

          {/* Bento Card 2: Rangoli Sacred Mandala & Tradition (Col 8-12) */}
          <div className="md:col-span-5 bg-[#43022b]/70 border border-[#fe8932]/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-0.5 rounded-full bg-[#00c326]/20 text-[#3ae441] text-[10px] font-bold uppercase tracking-wider border border-[#3ae441]/30">
                  Auspicious Geometry
                </span>
                <Sparkles className="w-5 h-5 text-[#3ae441]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#ffd8e7]">
                Sacred Floor Rangoli
              </h3>
              <p className="text-xs sm:text-sm text-[#ddc1b1] mt-1.5 leading-relaxed">
                Welcoming Goddess Lakshmi into the sanctum with concentric light patterns.
              </p>
            </div>

            {/* Featured Rangoli Image */}
            <div className="relative z-10 my-4 rounded-xl overflow-hidden shadow-lg border border-[#fe8932]/25 group">
              <img
                alt="Intricate Glowing Floor Rangoli with Clay Diyas"
                className="w-full h-48 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfiJrnonVKlxOlcToBT78w0h9lslFmwLmPpbhetCVYRxUImvrtL5g6Vyz0brr837uuhaFXxnHehmimBvpMzRCC1f82E9ya7GjAl8ZeTwZmfzAxvkURlF99BO1V0Qa6btYVKsO8GHpkxgAbqdxkqLHNGa2FS8ZO1PttLnb8zsLD5oMCwqAmq3MhGoRlzHYjAhTi23cJcxwMe8LIqkcJkg6d928uybbJ6DRJZdskJ0Eku5PsvuTPkY7hKQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#250015]/95 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-xs sm:text-sm font-semibold text-[#ffb689]">
                  108 Diya Maha-Mandala • Varanasi
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRangoliLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isRangoliLiked
                      ? 'bg-[#ba0225] text-[#ffdad8] border-[#ffb3b0]'
                      : 'bg-[#510e35] text-[#ffb3b0] border-[#fe8932]/20 hover:bg-[#ba0225] hover:text-[#ffdad8]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isRangoliLiked ? 'fill-current' : ''}`} />
                  <span className="tabular-nums">{rangoliLikes.toLocaleString()}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareFeatured}
                  aria-label="Share Rangoli Motif"
                  className="p-1.5 rounded-full bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] transition-all cursor-pointer border border-[#fe8932]/20"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  playKeyClickSound();
                  onNavigateToGallery();
                }}
                className="text-xs font-semibold text-[#ffb689] hover:text-[#ffd8e7] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Explore Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>


          {/* Bento Card 4: Daily Sacred Wisdom & Trivia (Col 1-12) */}
          <div className="md:col-span-12 bg-[#43022b]/70 border border-[#fe8932]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#ffb689] mb-1.5">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Auspicious Significance
                </span>
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#ffd8e7]">
                The Science of Lighting a Clay Diya
              </h3>
              <p className="text-sm sm:text-base text-[#ddc1b1] mt-2.5 leading-relaxed">
                In Vedic traditions, the clay lamp represents the human body, the sesame or mustard
                oil symbolizes human tendencies (gunas), and the cotton wick portrays the self
                (atma). By lighting the wick with the flame of divine knowledge, inner negativity is
                dispelled and enlightened bliss spreads to all around.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                <span className="px-3 py-1 rounded-full bg-[#510e35] text-[#ffb689] text-xs font-medium border border-[#fe8932]/20">
                  #DharmaAndLight
                </span>
                <span className="px-3 py-1 rounded-full bg-[#510e35] text-[#ffb689] text-xs font-medium border border-[#fe8932]/20">
                  #ClayDiyasOnly
                </span>
                <span className="px-3 py-1 rounded-full bg-[#510e35] text-[#ffb689] text-xs font-medium border border-[#fe8932]/20">
                  #InnerPeace
                </span>
              </div>
            </div>

            {/* Decorative Diya Emblem Illustration */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-full bg-[#250015] border-2 border-[#fe8932]/40 flex items-center justify-center p-4 relative shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-[#fe8932]/10 blur-xl pointer-events-none" />
              <img
                alt="Light Your Diyas Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(254,137,50,0.6)]"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WaM4BxuEptDUQDOs3efaIa4p-Ac87VrogIFE_KMEe99JZJoMO3umupFsk4mQ8ybpkA1ky8XC5dx-MAvuBkQy9QwpVUP_jUyIB62AG5aMSNQAbkqULVoTWSunEe8UiHkuHIo-5czxOkk-CfwJ9F3TH1CfctmP6sK8OfJVsmAEmLRrBW-gc1t5zQufMijOEUDD8HZoX2dfqhchGSE9l96Tt4g8BzHFDY0Onp3TCjV_z10g"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
