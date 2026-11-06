import React from 'react';
import { Sparkles, Send, Share2, Link as LinkIcon } from 'lucide-react';
import { playKeyClickSound } from '../utils/audio';

interface FooterProps {
  onShowToast: (msg: string) => void;
  onOpenSendWish: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowToast, onOpenSendWish }) => {
  const handleCopy = () => {
    playKeyClickSound();
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Celebration link copied! Share the auspicious light.');
  };

  const handleShare = () => {
    playKeyClickSound();
    if (navigator.share) {
      navigator.share({
        title: 'Light Your Diyas - Deepavali Celebrations',
        text: 'Join me in lighting a digital diya and sharing Diwali greetings!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <footer className="w-full bg-[#250015]/95 border-t border-[#fe8932]/15 py-8 shadow-[0_-8px_32px_rgba(205,26,48,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Greeting */}
        <div className="flex items-center gap-2.5 text-center md:text-left">
          <Sparkles className="w-5 h-5 text-[#ffb689] animate-pulse shrink-0" />
          <span className="font-headline text-lg sm:text-xl font-bold text-[#ffb689]">
            Wishing you a radiant and joyous Deepavali 🪔✨
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#ddc1b1] font-semibold">Share the Light</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playKeyClickSound();
                onOpenSendWish();
              }}
              aria-label="Share via Message"
              title="Create & Send Custom Wish"
              className="w-9 h-9 rounded-full bg-[#43022b] hover:bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] border border-[#fe8932]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share Celebration Link"
              title="Share Celebration"
              className="w-9 h-9 rounded-full bg-[#43022b] hover:bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] border border-[#fe8932]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy Sparkle Link"
              title="Copy Link"
              className="w-9 h-9 rounded-full bg-[#43022b] hover:bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] border border-[#fe8932]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
