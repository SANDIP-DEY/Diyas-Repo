import React, { useState } from 'react';
import { Heart, Share2, Flame, Sparkles, Flower2, X } from 'lucide-react';
import { RangoliItem } from '../types';
import { playKeyClickSound, playDiyaChime } from '../utils/audio';

const RANGOLI_ITEMS: RangoliItem[] = [
  {
    id: 'rangoli-1',
    title: 'Sahasrara Lotus of Radiance',
    description:
      'Concentric geometric rings woven with powdered rice flour, vermilion, and earthen lamps.',
    location: 'Varanasi Ghats',
    badge: '108 Lamps',
    badgeIcon: 'flame',
    category: 'diya',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfiJrnonVKlxOlcToBT78w0h9lslFmwLmPpbhetCVYRxUImvrtL5g6Vyz0brr837uuhaFXxnHehmimBvpMzRCC1f82E9ya7GjAl8ZeTwZmfzAxvkURlF99BO1V0Qa6btYVKsO8GHpkxgAbqdxkqLHNGa2FS8ZO1PttLnb8zsLD5oMCwqAmq3MhGoRlzHYjAhTi23cJcxwMe8LIqkcJkg6d928uybbJ6DRJZdskJ0Eku5PsvuTPkY7hKQ',
    likes: 1840,
    isLiked: false,
  },
  {
    id: 'rangoli-2',
    title: 'Prana Jyoti Ember Sanctuary',
    description:
      'A single consecrated clay lamp surrounded by sparkling gold embers on an antique brass thali.',
    location: 'Ayodhya Sanctum',
    badge: 'Sparkler Altar',
    badgeIcon: 'sparkles',
    category: 'diya',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDSlVX8JEY1iqzrq_M0FKPVFIzNeqCabFjERKHlL6IsOPTkBRJdFbcZYu6evDhm4rTE0Iv5skcT82FyBod-tdWG_rduKWHyFPE9HIOodQjCNPPiI5V5dwArTZtkJ-1YYd9IAbxVP687hBntXUii2GwGvN9hgu2K_ZK2iGXWxKfVXyih07JZI8WGKtDKj1HzfS9j2zao2ZkIr4BVDasbPMVqAfw9UwERBZcP_4J03lCov0m7noAsFOBJg',
    likes: 2420,
    isLiked: false,
  },
  {
    id: 'rangoli-3',
    title: 'Anandamayi Golden Bloom',
    description:
      'The eternal golden diya emblem framed by eight petals of auspicious prosperity and sacred vermilion.',
    location: 'Jaipur Courtyard',
    badge: 'Symbolic Emblem',
    badgeIcon: 'flower',
    category: 'floral',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WaM4BxuEptDUQDOs3efaIa4p-Ac87VrogIFE_KMEe99JZJoMO3umupFsk4mQ8ybpkA1ky8XC5dx-MAvuBkQy9QwpVUP_jUyIB62AG5aMSNQAbkqULVoTWSunEe8UiHkuHIo-5czxOkk-CfwJ9F3TH1CfctmP6sK8OfJVsmAEmLRrBW-gc1t5zQufMijOEUDD8HZoX2dfqhchGSE9l96Tt4g8BzHFDY0Onp3TCjV_z10g',
    likes: 940,
    isLiked: false,
  },
];

interface RangoliShowcaseProps {
  onShowToast: (msg: string) => void;
}

export const RangoliShowcase: React.FC<RangoliShowcaseProps> = ({ onShowToast }) => {
  const [items, setItems] = useState<RangoliItem[]>(RANGOLI_ITEMS);
  const [filter, setFilter] = useState<'all' | 'diya' | 'floral'>('all');
  const [selectedRangoli, setSelectedRangoli] = useState<RangoliItem | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playKeyClickSound();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.isLiked;
          const nextCount = nextLiked ? item.likes + 1 : item.likes - 1;
          onShowToast(
            nextLiked
              ? `Added "${item.title}" to sacred favorites ❤️`
              : `Removed from favorites`
          );
          return { ...item, isLiked: nextLiked, likes: nextCount };
        }
        return item;
      })
    );
  };

  const handleShare = (item: RangoliItem, e: React.MouseEvent) => {
    e.stopPropagation();
    playKeyClickSound();
    navigator.clipboard?.writeText(window.location.href);
    onShowToast(`Link to ${item.title} copied! Ready to share.`);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'diya') return item.category === 'diya';
    if (filter === 'floral') return item.category === 'floral' || item.category === 'kolam';
    return true;
  });

  return (
    <section id="rangoli-gallery" className="w-full px-4 sm:px-8 py-16 sm:py-24 bg-[#250015]/90">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs sm:text-sm font-bold text-[#ffb689] tracking-widest uppercase">
              Sacred Art of Welcome
            </span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#ffd8e7] mt-1.5">
              Festive Rangoli Showcase
            </h2>
            <p className="text-sm sm:text-base text-[#ddc1b1] mt-1 max-w-xl leading-relaxed">
              Rangoli patterns welcome auspicious energy and good fortune. Explore breathtaking
              creations lit by sacred clay lamps.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-[#3d0026] border border-[#fe8932]/20">
            <button
              type="button"
              onClick={() => {
                playKeyClickSound();
                setFilter('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#510e35] text-[#ffb689] font-bold shadow-sm'
                  : 'text-[#ddc1b1] hover:text-[#ffd8e7]'
              }`}
            >
              All Motifs
            </button>
            <button
              type="button"
              onClick={() => {
                playKeyClickSound();
                setFilter('diya');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'diya'
                  ? 'bg-[#510e35] text-[#ffb689] font-bold shadow-sm'
                  : 'text-[#ddc1b1] hover:text-[#ffd8e7]'
              }`}
            >
              Diya Circles
            </button>
            <button
              type="button"
              onClick={() => {
                playKeyClickSound();
                setFilter('floral');
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filter === 'floral'
                  ? 'bg-[#510e35] text-[#ffb689] font-bold shadow-sm'
                  : 'text-[#ddc1b1] hover:text-[#ffd8e7]'
              }`}
            >
              Floral Kolams
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playKeyClickSound();
                setSelectedRangoli(item);
              }}
              className="rounded-2xl bg-[#43022b]/70 border border-[#fe8932]/20 overflow-hidden shadow-xl flex flex-col group cursor-pointer hover:border-[#fe8932]/50 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-[#250015]">
                {item.id === 'rangoli-3' ? (
                  <div className="w-full h-full flex items-center justify-center p-6 bg-[#510e35]/60 relative">
                    <img
                      alt={item.title}
                      className="w-36 h-36 object-contain filter drop-shadow-[0_0_20px_rgba(254,137,50,0.8)] group-hover:rotate-12 transition-transform duration-700"
                      src={item.imageUrl}
                    />
                    <div className="absolute inset-0 bg-radial from-transparent to-[#250015]/70 pointer-events-none" />
                  </div>
                ) : (
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.imageUrl}
                  />
                )}

                {/* Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#250015]/85 backdrop-blur-md text-xs font-bold flex items-center gap-1.5 border border-[#fe8932]/30 shadow-md">
                  {item.badgeIcon === 'flame' && <Flame className="w-3.5 h-3.5 text-[#3ae441]" />}
                  {item.badgeIcon === 'sparkles' && <Sparkles className="w-3.5 h-3.5 text-[#ffb689]" />}
                  {item.badgeIcon === 'flower' && <Flower2 className="w-3.5 h-3.5 text-[#ffb3b0]" />}
                  <span className={item.badgeIcon === 'flame' ? 'text-[#3ae441]' : item.badgeIcon === 'sparkles' ? 'text-[#ffb689]' : 'text-[#ffb3b0]'}>
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-headline text-lg sm:text-xl font-bold text-[#ffb689] group-hover:text-[#ffd8e7] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#ddc1b1] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-3 border-t border-[#fe8932]/15">
                  <span className="text-xs text-[#a58c7e] font-medium">{item.location}</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleShare(item, e)}
                      aria-label="Share Rangoli"
                      className="p-1.5 rounded-full text-[#ddc1b1] hover:text-[#ffb689] transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        item.isLiked
                          ? 'bg-[#ba0225] text-[#ffdad8]'
                          : 'bg-[#510e35] text-[#ffb3b0] hover:bg-[#ba0225] hover:text-[#ffdad8]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-current' : ''}`} />
                      <span className="tabular-nums">
                        {item.likes >= 1000 ? `${(item.likes / 1000).toFixed(1)}k` : item.likes}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rangoli Detailed Inspection Modal */}
      {selectedRangoli && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#250015]/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#3d0026] border border-[#fe8932]/40 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col gap-5">
            <button
              type="button"
              onClick={() => setSelectedRangoli(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-72 w-full rounded-xl overflow-hidden bg-[#250015] flex items-center justify-center relative">
              <img
                alt={selectedRangoli.title}
                src={selectedRangoli.imageUrl}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#250015] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-[#3ae441] font-bold uppercase tracking-wider">
                  {selectedRangoli.badge} • {selectedRangoli.location}
                </span>
                <h3 className="font-headline text-2xl font-bold text-[#ffb689]">
                  {selectedRangoli.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#ffd8e7] leading-relaxed">
              {selectedRangoli.description} Traditionally crafted at the doorstep during Diwali,
              this auspicious pattern harmonizes geometric spiritual symmetry to channel cosmic
              radiance, inviting Goddess Lakshmi and dispelling shadows from the threshold.
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#ddc1b1]">
                Consecrated with turmeric, vermilion & 100% natural rice flour
              </span>
              <button
                type="button"
                onClick={(e) => handleLike(selectedRangoli.id, e)}
                className="px-5 py-2 rounded-full bg-[#ba0225] text-[#ffdad8] font-bold text-xs flex items-center gap-2 hover:bg-[#fe8932] hover:text-[#311300] transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Like This Sacred Design</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
