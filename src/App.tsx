/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroDiya } from './components/HeroDiya';
import { BentoGrid } from './components/BentoGrid';
import { CardCreator } from './components/CardCreator';
import { RangoliShowcase } from './components/RangoliShowcase';
import { WishWall } from './components/WishWall';
import { Footer } from './components/Footer';
import { BlessingModal } from './components/BlessingModal';
import { Toast } from './components/Toast';
import { ambientPlayer, playDiyaChime } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('light-a-diya');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isBlessingModalOpen, setIsBlessingModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const handleToggleAmbient = () => {
    if (isAmbientPlaying) {
      ambientPlayer.stop();
      setIsAmbientPlaying(false);
      showToast('Sitar ambient paused');
    } else {
      ambientPlayer.start(146.83); // Raag Yaman D drone
      setIsAmbientPlaying(true);
      showToast('🎶 Sitar & Tanpura ambient resonance activated');
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check URL query parameters for personalized blessing
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      if (to && from) {
        showToast(`✨ Special Deepavali blessing received for ${to} from ${from}!`);
      }
    } catch {
      // Ignored
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#2e001c] text-[#ffd8e7] flex flex-col font-sans selection:bg-[#fe8932] selection:text-[#311300]">
      {/* Top Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
        onOpenSendWish={() => handleNavigate('personalized-wishes')}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 flex flex-col flex-1">
        {/* Central Diya Altar */}
        <HeroDiya
          onOfferBlessing={() => setIsBlessingModalOpen(true)}
          onDiyaLit={() =>
            showToast('✨ An auspicious Diya was lit! Blessings sent across the world.')
          }
        />

        {/* Bento Grid: Fireworks, Featured Rangoli, Music Sanctuary, Vedic Wisdom */}
        <BentoGrid
          onShowToast={showToast}
          onNavigateToGallery={() => handleNavigate('rangoli-gallery')}
        />

        {/* Personalized Wish Card Designer */}
        <CardCreator onShowToast={showToast} />

        {/* Sacred Rangoli Showcase */}
        <RangoliShowcase onShowToast={showToast} />

        {/* Global Blessing Circle & Ticker */}
        <WishWall onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer
        onShowToast={showToast}
        onOpenSendWish={() => handleNavigate('personalized-wishes')}
      />

      {/* Silent Prayer / Meditation Modal */}
      <BlessingModal
        isOpen={isBlessingModalOpen}
        onClose={() => setIsBlessingModalOpen(false)}
        onBlessingOffered={() => {
          playDiyaChime();
          showToast('🌸 Silent prayer offered with auspicious reverence.');
        }}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
