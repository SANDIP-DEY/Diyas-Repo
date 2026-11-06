import React, { useState, useRef } from 'react';
import { Share2, Download, Copy, CheckCircle, Sparkles, MessageCircle, Send } from 'lucide-react';
import { CardTheme } from '../types';
import { playKeyClickSound, playDiyaChime } from '../utils/audio';

const PRESET_MESSAGES = [
  "May the divine light of Diwali illuminate your life with infinite peace, joyous prosperity, and vibrant happiness! 🪔✨",
  "Wishing you a sparkling Deepavali filled with sweet memories, prosperous health, and endless warmth! 🪔❤️",
  "Let every diya lit this festival ignite a beacon of good health, boundless success, and enduring love. Shubh Deepavali! 🪔🙏",
];

interface CardCreatorProps {
  onShowToast: (msg: string) => void;
}

export const CardCreator: React.FC<CardCreatorProps> = ({ onShowToast }) => {
  const [recipient, setRecipient] = useState<string>('Aarav & Family');
  const [sender, setSender] = useState<string>('Priya Sharma');
  const [message, setMessage] = useState<string>(PRESET_MESSAGES[0]);
  const [theme, setTheme] = useState<CardTheme>('amber');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const shareableUrl = `https://lightyourdiyas.app/wish?to=${encodeURIComponent(
    recipient || 'Friend'
  )}&from=${encodeURIComponent(sender || 'Well-wisher')}&theme=${theme}`;

  const handleSelectPreset = (idx: number) => {
    playKeyClickSound();
    setSelectedPresetIndex(idx);
    setMessage(PRESET_MESSAGES[idx]);
  };

  const handleSelectTheme = (t: CardTheme) => {
    playKeyClickSound();
    setTheme(t);
  };

  const handleCopyLink = () => {
    playKeyClickSound();
    navigator.clipboard?.writeText(shareableUrl);
    setIsCopied(true);
    onShowToast('Link copied to clipboard! Ready to share with loved ones 🪔');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownloadCard = () => {
    playKeyClickSound();
    playDiyaChime();
    
    // Draw card to client-side HTML5 canvas and trigger PNG download
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 950;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient based on theme
    const grad = ctx.createLinearGradient(0, 0, 0, 950);
    if (theme === 'emerald') {
      grad.addColorStop(0, '#003a05');
      grad.addColorStop(0.5, '#2e001c');
      grad.addColorStop(1, '#002202');
    } else if (theme === 'crimson') {
      grad.addColorStop(0, '#680010');
      grad.addColorStop(0.5, '#ba0225');
      grad.addColorStop(1, '#250015');
    } else {
      grad.addColorStop(0, '#3d0026');
      grad.addColorStop(0.5, '#43022b');
      grad.addColorStop(1, '#250015');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 950);

    // Golden border
    ctx.strokeStyle = '#FE8932';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 752, 902);
    ctx.strokeStyle = '#FFB689';
    ctx.lineWidth = 1;
    ctx.strokeRect(34, 34, 732, 882);

    // Filigree corners
    ctx.font = '24px serif';
    ctx.fillStyle = '#FE8932';
    ctx.fillText('❖', 48, 64);
    ctx.fillText('❖', 732, 64);
    ctx.fillText('❖', 48, 896);
    ctx.fillText('❖', 732, 896);

    // Header text
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3AE441';
    ctx.fillText('SHUBH DEEPAVALI BLESSINGS', 400, 160);

    // Recipient
    ctx.font = 'italic bold 36px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#FFB689';
    ctx.fillText(`Dearest ${recipient || 'Loved One'},`, 400, 240);

    // Box for message
    ctx.fillStyle = 'rgba(37, 0, 21, 0.7)';
    ctx.beginPath();
    ctx.roundRect(80, 290, 640, 260, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(254, 137, 50, 0.3)';
    ctx.stroke();

    // Word wrap message
    ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFD8E7';
    const words = `"${message}"`.split(' ');
    let line = '';
    let y = 370;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 560 && n > 0) {
        ctx.fillText(line, 400, y);
        line = words[n] + ' ';
        y += 34;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    // Sender
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#DDC1B1';
    ctx.fillText('WITH LOVING PRAYERS,', 400, 630);

    ctx.font = 'bold 28px "Playfair Display", serif';
    ctx.fillStyle = '#FE8932';
    ctx.fillText(sender || 'With Warmth', 400, 680);

    // Token of light
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3AE441';
    ctx.fillText('✨ An Auspicious Digital Token of Light 🪔', 400, 770);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Diwali_Wish_${recipient || 'Card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onShowToast('✨ Custom Diwali Card downloaded to your device!');
  };

  const handleSocialShare = (network: 'whatsapp' | 'twitter' | 'sms') => {
    playKeyClickSound();
    const text = encodeURIComponent(
      `Wishing you an auspicious and luminous Deepavali! 🪔✨ Open your personalized blessing: `
    );
    const url = encodeURIComponent(shareableUrl);

    if (network === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
    } else if (network === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    } else {
      handleCopyLink();
    }
  };

  // Dynamic theme card styles
  const getThemeContainerStyle = () => {
    if (theme === 'emerald') {
      return 'bg-gradient-to-b from-[#003a05]/70 via-[#2e001c] to-[#002202]/90 border-[#3ae441]/40';
    }
    if (theme === 'crimson') {
      return 'bg-gradient-to-b from-[#680010]/80 via-[#ba0225]/40 to-[#250015] border-[#ffb3b0]/40';
    }
    return 'bg-gradient-to-b from-[#43022b]/90 via-[#3d0026] to-[#250015] border-[#fe8932]/35';
  };

  const getThemeTextColor = () => {
    if (theme === 'emerald') return 'text-[#3ae441]';
    if (theme === 'crimson') return 'text-[#ffdad8]';
    return 'text-[#ffb689]';
  };

  return (
    <section id="personalized-wishes" className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#2e001c]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold text-[#ffb689] tracking-widest uppercase">
            Personalized Greetings & Blessings
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#ffb689] mt-2">
            Design Your Custom Diwali Card
          </h2>
          <p className="text-sm sm:text-base text-[#ddc1b1] mt-2 leading-relaxed">
            Tailor an exquisite festive card, choose your sacred motif, and generate an instantly
            shareable blessing link with customized names.
          </p>
        </div>

        {/* Split Grid: Form Controls vs Live Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Form Panel (Cols 1-6) */}
          <div className="lg:col-span-6 bg-[#43022b]/80 border border-[#fe8932]/25 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl backdrop-blur-md">
            {/* Recipient & Sender Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#ffd8e7] flex items-center gap-1">
                  <span>To (Recipient)</span>
                  <span className="text-[#ffb3b0]">*</span>
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. My Dear Ananya"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-sm placeholder:text-[#ddc1b1]/40 focus:outline-none focus:ring-2 focus:ring-[#fe8932]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#ffd8e7] flex items-center gap-1">
                  <span>From (Sender)</span>
                  <span className="text-[#ffb3b0]">*</span>
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. Rahul & Sunita"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-sm placeholder:text-[#ddc1b1]/40 focus:outline-none focus:ring-2 focus:ring-[#fe8932]"
                />
              </div>
            </div>

            {/* Preset Wishes Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#ffd8e7]">
                Select Festive Blessing Message
              </label>
              <div className="flex flex-col gap-2">
                {PRESET_MESSAGES.map((msg, idx) => {
                  const isSelected = selectedPresetIndex === idx && message === msg;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(idx)}
                      className={`text-left p-3 rounded-xl transition-all text-xs leading-relaxed cursor-pointer border ${
                        isSelected
                          ? 'bg-[#510e35] text-[#ffd8e7] border-[#fe8932]/60 ring-1 ring-[#fe8932]/40 shadow-sm'
                          : 'bg-[#250015]/80 text-[#ddc1b1] border-[#fe8932]/15 hover:bg-[#510e35]/40'
                      }`}
                    >
                      "{msg}"
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Message Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#ffd8e7]">
                Or Write Your Custom Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSelectedPresetIndex(-1);
                }}
                placeholder="Share your heartfelt Diwali blessings..."
                className="w-full p-3.5 rounded-xl bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-sm placeholder:text-[#ddc1b1]/40 focus:outline-none focus:ring-2 focus:ring-[#fe8932] resize-none"
              />
            </div>

            {/* Theme Aesthetic Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#ffd8e7]">
                Card Theme Aesthetic
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectTheme('amber')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                    theme === 'amber'
                      ? 'bg-[#ba0225] text-[#ffdad8] border-[#fe8932] shadow-[0_0_12px_rgba(254,137,50,0.4)]'
                      : 'bg-[#250015] text-[#ffd8e7] border-[#fe8932]/20 hover:bg-[#510e35]'
                  }`}
                >
                  Amber Diya
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTheme('emerald')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                    theme === 'emerald'
                      ? 'bg-[#00530a] text-[#74ff6c] border-[#3ae441] shadow-[0_0_12px_rgba(58,228,65,0.4)]'
                      : 'bg-[#250015] text-[#ffd8e7] border-[#fe8932]/20 hover:bg-[#510e35]'
                  }`}
                >
                  Emerald Rangoli
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTheme('crimson')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer border ${
                    theme === 'crimson'
                      ? 'bg-[#93001b] text-[#ffdad8] border-[#ffb3b0] shadow-[0_0_12px_rgba(255,179,176,0.4)]'
                      : 'bg-[#250015] text-[#ffd8e7] border-[#fe8932]/20 hover:bg-[#510e35]'
                  }`}
                >
                  Royal Crimson
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:flex-1 py-3 px-6 rounded-full bg-[#fe8932] hover:bg-[#ffb689] text-[#311300] font-bold text-sm shadow-[0_0_20px_rgba(254,137,50,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Generate Shareable Link</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadCard}
                aria-label="Save Card Preview as Image"
                title="Download Card as Image"
                className="w-full sm:w-auto p-3 rounded-full bg-[#510e35] hover:bg-[#641f45] border border-[#fe8932]/30 text-[#ffd8e7] hover:text-[#ffb689] transition-all flex items-center justify-center cursor-pointer shadow-md"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Share Result Box */}
            <div className="p-4 rounded-xl bg-[#250015] border border-[#fe8932]/20 flex flex-col gap-2.5">
              <span className="text-xs text-[#3ae441] font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Card Ready to Share with Loved Ones!</span>
              </span>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="w-full px-3 py-2 rounded-lg bg-[#3d0026] text-[#ddc1b1] text-xs font-mono select-all border border-[#fe8932]/20 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-full bg-[#00c326] hover:bg-[#3ae441] text-[#003a05] text-xs font-bold whitespace-nowrap active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Quick Social Share Chips */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="text-xs text-[#ddc1b1]">Send via:</span>
                <button
                  type="button"
                  onClick={() => handleSocialShare('whatsapp')}
                  className="px-3 py-1 rounded-full bg-[#510e35] hover:bg-[#641f45] text-[#ffd8e7] text-xs font-medium cursor-pointer transition-all border border-[#fe8932]/20"
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialShare('twitter')}
                  className="px-3 py-1 rounded-full bg-[#510e35] hover:bg-[#641f45] text-[#ffd8e7] text-xs font-medium cursor-pointer transition-all border border-[#fe8932]/20"
                >
                  X / Twitter
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialShare('sms')}
                  className="px-3 py-1 rounded-full bg-[#510e35] hover:bg-[#641f45] text-[#ffd8e7] text-xs font-medium cursor-pointer transition-all border border-[#fe8932]/20"
                >
                  Messages
                </button>
              </div>
            </div>
          </div>

          {/* Live Card Preview Display (Cols 7-12) */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="text-center text-xs text-[#ddc1b1] font-semibold uppercase tracking-widest mb-3">
              Interactive Greeting Card Preview
            </div>

            {/* Ornamental Festive Card Frame */}
            <div
              ref={cardRef}
              className={`w-full relative rounded-2xl p-6 sm:p-10 overflow-hidden shadow-2xl border transition-colors duration-500 ${getThemeContainerStyle()}`}
            >
              {/* Background Texture Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfiJrnonVKlxOlcToBT78w0h9lslFmwLmPpbhetCVYRxUImvrtL5g6Vyz0brr837uuhaFXxnHehmimBvpMzRCC1f82E9ya7GjAl8ZeTwZmfzAxvkURlF99BO1V0Qa6btYVKsO8GHpkxgAbqdxkqLHNGa2FS8ZO1PttLnb8zsLD5oMCwqAmq3MhGoRlzHYjAhTi23cJcxwMe8LIqkcJkg6d928uybbJ6DRJZdskJ0Eku5PsvuTPkY7hKQ')`,
                }}
              />

              {/* Corner Filigree Motifs */}
              <div className="absolute top-3 left-3 text-[#fe8932]/50 text-xl font-serif select-none">
                ❖
              </div>
              <div className="absolute top-3 right-3 text-[#fe8932]/50 text-xl font-serif select-none">
                ❖
              </div>
              <div className="absolute bottom-3 left-3 text-[#fe8932]/50 text-xl font-serif select-none">
                ❖
              </div>
              <div className="absolute bottom-3 right-3 text-[#fe8932]/50 text-xl font-serif select-none">
                ❖
              </div>

              {/* Card Inner Content */}
              <div className="relative z-10 flex flex-col items-center text-center py-4">
                {/* Brand Diya Badge Emblem */}
                <div className="w-20 h-20 rounded-full bg-[#250015] border border-[#fe8932]/40 p-2 shadow-[0_0_20px_rgba(254,137,50,0.6)] mb-4 flex items-center justify-center">
                  <img
                    alt="Light Your Diyas Emblem"
                    className="w-full h-full object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WaM4BxuEptDUQDOs3efaIa4p-Ac87VrogIFE_KMEe99JZJoMO3umupFsk4mQ8ybpkA1ky8XC5dx-MAvuBkQy9QwpVUP_jUyIB62AG5aMSNQAbkqULVoTWSunEe8UiHkuHIo-5czxOkk-CfwJ9F3TH1CfctmP6sK8OfJVsmAEmLRrBW-gc1t5zQufMijOEUDD8HZoX2dfqhchGSE9l96Tt4g8BzHFDY0Onp3TCjV_z10g"
                  />
                </div>

                {/* Auspicious Overline */}
                <span className="text-xs text-[#3ae441] font-bold uppercase tracking-widest mb-1.5">
                  Shubh Deepavali Blessings
                </span>

                {/* Recipient */}
                <h3
                  className={`font-headline text-2xl sm:text-3xl font-bold tracking-wide mb-4 ${getThemeTextColor()}`}
                >
                  Dearest {recipient || 'Loved One'},
                </h3>

                {/* Message Text */}
                <div className="max-w-md w-full px-5 py-4 rounded-xl bg-[#250015]/75 border border-[#fe8932]/25 backdrop-blur-sm mb-6 shadow-inner">
                  <p className="font-headline italic text-base sm:text-lg text-[#ffd8e7] leading-relaxed">
                    "{message}"
                  </p>
                </div>

                {/* From / Sender */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] text-[#ddc1b1] font-semibold uppercase tracking-wider">
                    With Loving Prayers,
                  </span>
                  <span className="font-headline text-lg sm:text-xl font-bold text-[#fe8932] mt-0.5">
                    {sender || 'With Warmth'}
                  </span>
                </div>

                {/* Auspicious Token Marker */}
                <div className="mt-6 flex items-center gap-1.5 text-xs text-[#ffb689]">
                  <Sparkles className="w-3.5 h-3.5 text-[#3ae441] animate-spin" />
                  <span className="font-medium">An Auspicious Digital Token of Light</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#3ae441] animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
