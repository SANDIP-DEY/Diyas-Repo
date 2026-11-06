import React, { useEffect, useRef, useState } from 'react';
import { RotateCw, Flame, Rocket, Sparkles, Volume2 } from 'lucide-react';
import { playFireworkSound, playKeyClickSound } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  isFountain?: boolean;
}

interface FireworksCanvasProps {
  onShowToast: (msg: string) => void;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({ onShowToast }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const colors = ['#FE8932', '#FEE7B5', '#20D432', '#CD1A30', '#FFFBEB', '#FFB689', '#FFDAD8'];

  const spawnBurst = (x: number, y: number, count = 45, speedMultiplier = 1) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 4.5 + 1.5) * speedMultiplier;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.014,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.8 + 1.2,
      });
    }
  };

  const spawnFountain = (x: number, y: number, count = 30) => {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() * 0.7 - 0.35);
      const speed = Math.random() * 7 + 4;
      particlesRef.current.push({
        x: x + (Math.random() * 10 - 5),
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.2 + 1,
        isFountain: true,
      });
    }
  };

  const spawnSpinner = (x: number, y: number) => {
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const speed = Math.random() * 3 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.02,
        color: i % 2 === 0 ? '#FE8932' : '#20D432',
        size: 2.2,
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!container || !canvas) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const render = () => {
      ctx.fillStyle = 'rgba(37, 0, 21, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.isFountain ? 0.12 : 0.06; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHasInteracted(true);
    playFireworkSound('burst');
    spawnBurst(x, y, 45);
  };

  const handleTriggerChakri = () => {
    playKeyClickSound();
    playFireworkSound('chakri');
    setHasInteracted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const groundY = canvas.height - 24;

    for (let step = 0; step < 4; step++) {
      setTimeout(() => {
        spawnSpinner(centerX, groundY);
      }, step * 120);
    }
  };

  const handleTriggerAnar = () => {
    playKeyClickSound();
    playFireworkSound('anar');
    setHasInteracted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const groundY = canvas.height - 18;
    const positions = [canvas.width * 0.3, canvas.width * 0.5, canvas.width * 0.7];

    positions.forEach((posX, idx) => {
      for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
          spawnFountain(posX, groundY, 25);
        }, idx * 80 + burst * 90);
      }
    });
  };

  const handleTriggerRocket = () => {
    playKeyClickSound();
    playFireworkSound('rocket');
    setHasInteracted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetX = Math.random() * (canvas.width - 120) + 60;
    const targetY = Math.random() * (canvas.height * 0.45) + 30;

    // Rising particle trail
    let currentY = canvas.height;
    const riseStep = () => {
      currentY -= (canvas.height - targetY) / 10;
      particlesRef.current.push({
        x: targetX + (Math.random() * 4 - 2),
        y: currentY,
        vx: 0,
        vy: 0.5,
        alpha: 1,
        decay: 0.08,
        color: '#FFB689',
        size: 2,
      });

      if (currentY > targetY) {
        requestAnimationFrame(riseStep);
      } else {
        spawnBurst(targetX, targetY, 60, 1.2);
      }
    };
    riseStep();
  };

  const handleGrandFinale = () => {
    playKeyClickSound();
    playFireworkSound('rocket');
    setHasInteracted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    onShowToast('🎇 Grand Deepavali Finale Launched with radiant sparkles!');

    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const x = Math.random() * (canvas.width - 60) + 30;
        const y = Math.random() * (canvas.height * 0.6) + 20;
        playFireworkSound('burst');
        spawnBurst(x, y, 50, 1.3);
      }, i * 180);
    }
  };

  return (
    <div className="bg-[#43022b]/70 border border-[#fe8932]/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="px-3 py-0.5 rounded-full bg-[#ba0225]/40 text-[#ffb3b0] text-[10px] font-bold uppercase tracking-wider">
            Sparkling Playground
          </span>
          <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#ffb689] mt-2">
            Virtual Fireworks & Sky Shots
          </h3>
          <p className="text-xs sm:text-sm text-[#ddc1b1] max-w-md mt-1 leading-relaxed">
            Zero emissions, pure joy. Trigger vibrant fireworks, rotating ground spinners, and
            sparkling flower pots with authentic audio resonance.
          </p>
        </div>
        <Sparkles className="w-7 h-7 text-[#fe8932] animate-pulse shrink-0" />
      </div>

      {/* Canvas Box */}
      <div
        ref={containerRef}
        className="relative z-10 my-4 w-full h-60 rounded-xl bg-[#250015]/95 border border-[#fe8932]/25 overflow-hidden flex flex-col items-center justify-center shadow-inner"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full cursor-crosshair"
        />

        {!hasInteracted && (
          <div className="relative z-10 pointer-events-none px-4 py-1.5 rounded-full bg-[#510e35]/80 backdrop-blur-sm text-[#ffd8e7] text-xs border border-[#fe8932]/30 shadow-md animate-pulse">
            Click anywhere in sky or tap launchers below
          </div>
        )}
      </div>

      {/* Triggers */}
      <div className="relative z-10 flex flex-wrap gap-2 items-center justify-between pt-1">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleTriggerChakri}
            className="px-3.5 py-1.5 rounded-full bg-[#510e35] hover:bg-[#fe8932] hover:text-[#311300] text-[#ffd8e7] text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer border border-[#fe8932]/20"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#ffb689]" />
            <span>Chakri (Spinner)</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerAnar}
            className="px-3.5 py-1.5 rounded-full bg-[#510e35] hover:bg-[#ba0225] text-[#ffd8e7] text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer border border-[#fe8932]/20"
          >
            <Flame className="w-3.5 h-3.5 text-[#3ae441]" />
            <span>Anar (Fountain)</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerRocket}
            className="px-3.5 py-1.5 rounded-full bg-[#510e35] hover:bg-[#fe8932] hover:text-[#311300] text-[#ffd8e7] text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer border border-[#fe8932]/20"
          >
            <Rocket className="w-3.5 h-3.5 text-[#ffb3b0]" />
            <span>Sky Rocket</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleGrandFinale}
          className="px-4 py-2 rounded-full bg-[#fe8932] hover:bg-[#ffb689] text-[#311300] text-xs font-bold shadow-[0_0_15px_rgba(254,137,50,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Grand Finale Spark ✨
        </button>
      </div>
    </div>
  );
};
