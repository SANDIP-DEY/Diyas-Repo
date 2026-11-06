import React, { useState } from 'react';
import { Heart, PlusCircle, Sparkles, Send } from 'lucide-react';
import { CommunityWish } from '../types';
import { playKeyClickSound, playDiyaChime } from '../utils/audio';

const INITIAL_WISHES: CommunityWish[] = [
  {
    id: 'w-1',
    name: 'Vikram',
    location: 'Singapore',
    message: 'Prosperity and joy to my grandparents in Jaipur! 🪔',
    tagColor: '#3ae441',
    timestamp: 'Just now',
  },
  {
    id: 'w-2',
    name: 'Meera',
    location: 'London',
    message: 'May darkness always flee before your radiant smile ✨',
    tagColor: '#fe8932',
    timestamp: '2m ago',
  },
  {
    id: 'w-3',
    name: 'Dev & Rina',
    location: 'Toronto',
    message: 'Happy Diwali to our whole family in Delhi! 💖',
    tagColor: '#ffb3b0',
    timestamp: '5m ago',
  },
  {
    id: 'w-4',
    name: 'Ananya & Kabir',
    location: 'Sydney',
    message: 'Warmest blessings across oceans. Shubh Deepavali! 🪔',
    tagColor: '#ffd8e7',
    timestamp: '8m ago',
  },
  {
    id: 'w-5',
    name: 'Rahul',
    location: 'San Francisco',
    message: 'May peace and boundless laughter bless every home this year! 🌟',
    tagColor: '#3ae441',
    timestamp: '12m ago',
  },
];

interface WishWallProps {
  onShowToast: (msg: string) => void;
}

export const WishWall: React.FC<WishWallProps> = ({ onShowToast }) => {
  const [wishes, setWishes] = useState<CommunityWish[]>(INITIAL_WISHES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userLocation, setUserLocation] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    playKeyClickSound();
    playDiyaChime();
    if (!userName.trim() || !userMessage.trim()) return;

    const newWish: CommunityWish = {
      id: `user-${Date.now()}`,
      name: userName.trim(),
      location: userLocation.trim() || 'Global Citizen',
      message: userMessage.trim(),
      tagColor: '#3ae441',
      timestamp: 'Just now',
    };

    setWishes((prev) => [newWish, ...prev]);
    setUserName('');
    setUserLocation('');
    setUserMessage('');
    setIsModalOpen(false);
    onShowToast('✨ Your auspicious blessing has been added to the Global Circle!');
  };

  return (
    <section className="w-full px-4 sm:px-8 py-16 sm:py-20 bg-[#2e001c]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-full bg-[#510e35] border border-[#fe8932]/30 flex items-center justify-center text-[#ffb689] shadow-xl">
          <Heart className="w-7 h-7 text-[#ffb689] fill-current" />
        </div>

        <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#ffd8e7]">
          The Circle of Festive Light
        </h2>

        <p className="text-sm sm:text-base text-[#ddc1b1] max-w-xl leading-relaxed">
          Every lamp you ignite sends positive ripples of hope across families separated by
          distance. May peace, good health, and sweet delights bless your home this festival.
        </p>

        {/* Global Wish Wall Ticker */}
        <div className="w-full overflow-hidden mt-4 py-3">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none items-center justify-start sm:justify-center flex-wrap">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#43022b]/80 border border-[#fe8932]/25 text-[#ffd8e7] text-xs sm:text-sm shadow-md whitespace-nowrap"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: w.tagColor }}
                />
                <span className="font-semibold text-[#ffb689]">{w.name} ({w.location}):</span>
                <span className="text-[#ffd8e7]">"{w.message}"</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Blessing Button */}
        <button
          type="button"
          onClick={() => {
            playKeyClickSound();
            setIsModalOpen(true);
          }}
          className="px-6 py-2.5 rounded-full bg-[#510e35] hover:bg-[#ba0225] text-[#ffd8e7] text-xs sm:text-sm font-semibold transition-all border border-[#fe8932]/30 shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-[#3ae441]" />
          <span>Add Your Blessing to the Global Circle</span>
        </button>
      </div>

      {/* Add Blessing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#250015]/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#3d0026] border border-[#fe8932]/40 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-4">
            <h3 className="font-headline text-xl font-bold text-[#ffb689] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3ae441]" />
              <span>Contribute to the Global Light Circle</span>
            </h3>

            <p className="text-xs text-[#ddc1b1] leading-relaxed">
              Share warm words of harmony, peace, or festive cheer with thousands celebrating
              worldwide.
            </p>

            <form onSubmit={handleSubmitWish} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ffd8e7]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Radhika"
                  className="w-full px-3 py-2 rounded-lg bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#fe8932]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ffd8e7]">City / Country</label>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="e.g. Mumbai, India"
                  className="w-full px-3 py-2 rounded-lg bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#fe8932]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#ffd8e7]">Your Blessing Message *</label>
                <textarea
                  rows={3}
                  required
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="May every hearth glow with love and prosperity..."
                  className="w-full px-3 py-2 rounded-lg bg-[#250015] border border-[#fe8932]/30 text-[#ffd8e7] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#fe8932] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#43022b] text-[#ffd8e7] text-xs font-semibold hover:bg-[#510e35] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#ba0225] via-[#fe8932] to-[#ba0225] text-[#311300] font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Blessing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
