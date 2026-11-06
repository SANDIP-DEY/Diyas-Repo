import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Sun, Flame } from 'lucide-react';
import { playDiyaChime, playKeyClickSound } from '../utils/audio';

interface HeroDiyaProps {
  onOfferBlessing: () => void;
  onDiyaLit: () => void;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export const HeroDiya: React.FC<HeroDiyaProps> = ({
  onOfferBlessing,
  onDiyaLit,
}) => {
  const [litCount, setLitCount] = useState<number>(14892);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  // Generate ambient floating sparkles on client mount
  useEffect(() => {
    const items: SparkleItem[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 92 + 4,
      size: Math.random() * 4 + 2,
      color: i % 2 === 0 ? '#FE8932' : '#FEE7B5',
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2.5,
    }));
    setSparkles(items);
  }, []);

  const handleLightDiya = (e?: React.MouseEvent) => {
    playKeyClickSound();
    playDiyaChime();
    setLitCount((prev) => prev + 1);
    setIsPulsing(true);
    onDiyaLit();

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newSpark = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setSparks((prev) => [...prev.slice(-6), newSpark]);
    }

    setTimeout(() => {
      setIsPulsing(false);
    }, 600);
  };

  return (
    <section
      id="light-a-diya"
      className="relative w-full overflow-hidden px-4 sm:px-8 py-16 sm:py-24 flex flex-col items-center justify-center min-h-[92vh] text-center"
    >
      {/* Layered Atmospheric Backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfiJrnonVKlxOlcToBT78w0h9lslFmwLmPpbhetCVYRxUImvrtL5g6Vyz0brr837uuhaFXxnHehmimBvpMzRCC1f82E9ya7GjAl8ZeTwZmfzAxvkURlF99BO1V0Qa6btYVKsO8GHpkxgAbqdxkqLHNGa2FS8ZO1PttLnb8zsLD5oMCwqAmq3MhGoRlzHYjAhTi23cJcxwMe8LIqkcJkg6d928uybbJ6DRJZdskJ0Eku5PsvuTPkY7hKQ')`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-dodge bg-cover bg-bottom"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDSlVX8JEY1iqzrq_M0FKPVFIzNeqCabFjERKHlL6IsOPTkBRJdFbcZYu6evDhm4rTE0Iv5skcT82FyBod-tdWG_rduKWHyFPE9HIOodQjCNPPiI5V5dwArTZtkJ-1YYd9IAbxVP687hBntXUii2GwGvN9hgu2K_ZK2iGXWxKfVXyih07JZI8WGKtDKj1HzfS9j2zao2ZkIr4BVDasbPMVqAfw9UwERBZcP_4J03lCov0m7noAsFOBJg')`,
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#2e001c]/80 via-[#250015]/85 to-[#2e001c]" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map((s) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              borderRadius: '9999px',
              boxShadow: `0 0 12px ${s.color}`,
              animation: `diyaglow ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Auspicious Overline Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#510e35]/80 border border-[#fe8932]/30 text-[#fe8932] shadow-xl mb-6 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-[#3ae441] animate-pulse" />
        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
          Deepavali Mahotsav • Global Gathering
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ae441]" />
      </div>

      {/* Main Headline */}
      <h1 className="relative z-10 font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-[#ffb689] max-w-4xl tracking-tight leading-tight mb-4 drop-shadow-[0_4px_24px_rgba(254,137,50,0.35)]">
        Ignite Hope, Joy & Light this Diwali
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 font-body text-base sm:text-lg text-[#ddc1b1] max-w-2xl mb-10 leading-relaxed">
        Celebrate the triumph of light over darkness. Light a digital diya, create bespoke festive
        greetings, and send glowing blessings to those you cherish across the globe.
      </p>

      {/* CENTRAL INTERACTIVE DIYA ALTAR */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center p-6 sm:p-10 rounded-2xl bg-[#43022b]/60 border border-[#fe8932]/25 backdrop-blur-xl shadow-2xl">
        {/* Dynamic Glow Halo */}
        <div
          className={`absolute -top-12 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isPulsing
              ? 'scale-150 bg-[#fe8932]/45'
              : 'scale-100 bg-[#fe8932]/20'
          }`}
        />

        {/* Diya Vessel & Interactive Flame Zone */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleLightDiya}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLightDiya();
            }
          }}
          aria-label="Touch to Light Diya"
          className="relative w-52 h-48 flex items-center justify-center my-3 cursor-pointer select-none group focus:outline-none"
        >
          {/* Animated Flame Element */}
          <div
            className={`absolute -top-6 flex flex-col items-center transition-transform duration-500 ${
              isPulsing ? 'scale-125' : 'scale-100'
            }`}
          >
            {/* Outer Flame Glow */}
            <div className="w-16 h-28 bg-gradient-to-t from-[#fe8932] via-[#ffb689] to-[#ffd8e7] rounded-full blur-[2px] shadow-[0_0_40px_rgba(254,137,50,0.95)] animate-pulse" />
            {/* Inner Core Hot Flame */}
            <div className="absolute bottom-2 w-6 h-14 bg-white/95 rounded-full blur-[0.6px] flame-flicker" />
            {/* Flickering Wick */}
            <div className="w-1 h-3.5 bg-[#512300] rounded-full -mt-1" />
          </div>

          {/* Earthen Diya Clay Thali */}
          <div className="relative w-48 h-24 rounded-b-full bg-gradient-to-b from-[#ba0225] via-[#510e35] to-[#250015] border-t-2 border-[#fe8932]/40 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Clay Ornamental Rim Motif */}
            <div className="absolute top-0 inset-x-0 h-4 bg-[#fe8932]/35 flex items-center justify-around px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb689] shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ae441] shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb689] shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ae441] shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb689] shadow-sm" />
            </div>

            {/* Sacred Inner Oil Well */}
            <div className="w-34 h-11 rounded-full bg-[#250015]/90 shadow-inner flex items-center justify-center border border-[#fe8932]/20">
              <div className="w-22 h-4 rounded-full bg-[#fe8932]/40 blur-sm" />
            </div>
          </div>

          {/* Floating Sparkles around flame */}
          <div className="absolute -top-12 inset-x-0 flex justify-between pointer-events-none text-xs">
            <span className="text-[#3ae441] animate-bounce">✦</span>
            <span className="text-[#fe8932] animate-ping delay-150">✧</span>
            <span className="text-[#ffb689] animate-pulse delay-300">✦</span>
          </div>

          {/* Touch burst sparks */}
          {sparks.map((spark) => (
            <span
              key={spark.id}
              className="absolute pointer-events-none text-[#ffb689] font-bold text-sm animate-ping"
              style={{ left: spark.x, top: spark.y }}
            >
              ✨
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-4">
          <button
            type="button"
            onClick={(e) => handleLightDiya(e)}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#ba0225] via-[#fe8932] to-[#ba0225] text-[#311300] font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(254,137,50,0.55)] hover:shadow-[0_0_40px_rgba(254,137,50,0.85)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="w-5 h-5 text-[#311300] fill-current" />
            <span>Light Another Diya</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playKeyClickSound();
              onOfferBlessing();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#510e35] hover:bg-[#641f45] border border-[#fe8932]/30 text-[#ffd8e7] font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <Heart className="w-5 h-5 text-[#3ae441]" />
            <span>Offer Silent Blessing</span>
          </button>
        </div>

        {/* Global Live Counter */}
        <div className="mt-6 flex items-center gap-2.5 text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3ae441] animate-ping" />
          <p className="text-xs sm:text-sm text-[#ddc1b1]">
            <span className="font-bold text-[#ffb689] text-base tabular-nums">
              {litCount.toLocaleString()}
            </span>{' '}
            Diyas lit globally tonight
          </p>
        </div>
      </div>
    </section>
  );
};
