import React, { useState } from 'react';
import { Sparkles, Music, Flame, User, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { playKeyClickSound } from '../utils/audio';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isAmbientPlaying: boolean;
  onToggleAmbient: () => void;
  onOpenSendWish: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isAmbientPlaying,
  onToggleAmbient,
  onOpenSendWish,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'light-a-diya', label: 'Light a Diya' },
    { id: 'personalized-wishes', label: 'Personalized Wishes' },
    { id: 'rangoli-gallery', label: 'Rangoli Gallery' },
    { id: 'virtual-fireworks', label: 'Virtual Fireworks' },
  ];

  const handleNavClick = (id: string) => {
    playKeyClickSound();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#250015]/80 backdrop-blur-xl border-b border-[#fe8932]/10 shadow-[0_4px_30px_rgba(37,0,21,0.6)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="diya-halo absolute -inset-1.5 rounded-full bg-[#fe8932]/20 blur-md pointer-events-none" />
            <img
              alt="Light Your Diyas Emblem"
              className="relative h-9 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WaM4BxuEptDUQDOs3efaIa4p-Ac87VrogIFE_KMEe99JZJoMO3umupFsk4mQ8ybpkA1ky8XC5dx-MAvuBkQy9QwpVUP_jUyIB62AG5aMSNQAbkqULVoTWSunEe8UiHkuHIo-5czxOkk-CfwJ9F3TH1CfctmP6sK8OfJVsmAEmLRrBW-gc1t5zQufMijOEUDD8HZoX2dfqhchGSE9l96Tt4g8BzHFDY0Onp3TCjV_z10g"
              onError={(e) => {
                // Fallback if image fails
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <Sparkles className="w-3.5 h-3.5 text-[#ffb689] absolute -top-1 -right-1 animate-pulse" />
          </div>

          <button
            onClick={() => handleNavClick('light-a-diya')}
            className="flex flex-col text-left focus:outline-none"
          >
            <span className="font-headline text-lg sm:text-xl font-bold text-[#ffb689] tracking-wide leading-tight">
              Light Your Diyas
            </span>
            <span className="text-[10px] text-[#ddc1b1] tracking-widest uppercase font-semibold">
              Deepavali Celebrations
            </span>
          </button>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#3d0026]/70 border border-[#fe8932]/15 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#510e35] text-[#ffb689] font-bold shadow-[0_0_15px_rgba(254,137,50,0.3)] ring-1 ring-[#fe8932]/40'
                    : 'text-[#ddc1b1] hover:text-[#ffd8e7] hover:bg-[#43022b]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Music Toggle */}
          <button
            onClick={() => {
              playKeyClickSound();
              onToggleAmbient();
            }}
            aria-label="Toggle Festive Ambient Music"
            title={isAmbientPlaying ? 'Pause Sitar Ambient' : 'Play Sitar Ambient'}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all shadow-[0_0_12px_rgba(254,137,50,0.15)] ${
              isAmbientPlaying
                ? 'bg-[#510e35] text-[#ffb689] ring-1 ring-[#fe8932]/40'
                : 'bg-[#43022b] text-[#ffd8e7] hover:bg-[#510e35]'
            }`}
          >
            {isAmbientPlaying ? (
              <Music className="w-4 h-4 text-[#ffb689] animate-bounce" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#ddc1b1]" />
            )}
            <span className="hidden xl:inline text-[11px] text-[#ddc1b1] font-medium">
              Sitar Ambient
            </span>
            <div className="flex items-end gap-0.5 h-3 px-1">
              <span className={`w-0.5 bg-[#ffb689] rounded-full ${isAmbientPlaying ? 'ambient-bar-1 h-1.5' : 'h-1'}`} />
              <span className={`w-0.5 bg-[#fe8932] rounded-full ${isAmbientPlaying ? 'ambient-bar-2 h-3' : 'h-2'}`} />
              <span className={`w-0.5 bg-[#ffb689] rounded-full ${isAmbientPlaying ? 'ambient-bar-3 h-2' : 'h-1'}`} />
            </div>
          </button>

          {/* Send Diwali Wish CTA */}
          <button
            onClick={() => {
              playKeyClickSound();
              onOpenSendWish();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ba0225] hover:bg-[#fe8932] text-[#ffdad8] hover:text-[#512300] text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(254,137,50,0.35)] active:scale-95"
          >
            <Flame className="w-4 h-4 text-[#ffb689]" />
            <span className="hidden sm:inline">Send Diwali Wish</span>
            <span className="sm:hidden">Wish</span>
          </button>

          {/* User Icon Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#ffb689] flex items-center justify-center text-[#512300] shadow-sm">
            <User className="w-4 h-4" />
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#ffd8e7] hover:text-[#ffb689]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#250015]/95 border-b border-[#fe8932]/20 px-6 py-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#510e35] text-[#ffb689] font-bold'
                    : 'text-[#ddc1b1] hover:bg-[#3d0026]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
