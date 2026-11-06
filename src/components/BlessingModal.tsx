import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { playKeyClickSound, playDiyaChime } from '../utils/audio';

interface BlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlessingOffered: () => void;
}

export const BlessingModal: React.FC<BlessingModalProps> = ({
  isOpen,
  onClose,
  onBlessingOffered,
}) => {
  if (!isOpen) return null;

  const handleComplete = () => {
    playKeyClickSound();
    playDiyaChime();
    onBlessingOffered();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#250015]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#3d0026] border border-[#fe8932]/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center gap-6 overflow-hidden">
        {/* Halo Glow */}
        <div className="absolute -top-10 w-48 h-48 rounded-full bg-[#fe8932]/25 blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={() => {
            playKeyClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lotus Icon with Breathing Animation */}
        <div className="relative w-20 h-20 rounded-full bg-[#250015] border-2 border-[#fe8932]/50 flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 rounded-full border border-[#3ae441]/40 animate-ping opacity-60" />
          <Heart className="w-9 h-9 text-[#ffb689] fill-[#fe8932]/40" />
        </div>

        <div>
          <span className="text-xs font-bold text-[#3ae441] tracking-widest uppercase">
            Antar Jyoti • Inner Sanctuary
          </span>
          <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#ffb689] mt-1">
            Offer a Silent Blessing
          </h3>
        </div>

        {/* Sacred Sanskrit Inscription */}
        <div className="p-5 rounded-2xl bg-[#250015]/80 border border-[#fe8932]/25 w-full">
          <p className="font-headline italic text-base sm:text-lg text-[#ffd8e7] leading-relaxed">
            " असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥ "
          </p>
          <p className="text-xs text-[#ddc1b1] mt-3 leading-relaxed">
            (Lead us from the unreal to the real, from darkness into light, and from mortality to
            eternal peace.)
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#ddc1b1] leading-relaxed max-w-sm">
          Take a quiet breath and hold your family, friends, and all sentient beings in peaceful
          reverence.
        </p>

        <button
          type="button"
          onClick={handleComplete}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ba0225] via-[#fe8932] to-[#ba0225] text-[#311300] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(254,137,50,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Offer Sacred Prayer & Ring Chime</span>
        </button>
      </div>
    </div>
  );
};
