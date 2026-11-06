import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 right-4 sm:right-8 z-50 max-w-md px-5 py-3.5 rounded-2xl bg-[#5f1a41] border border-[#fe8932]/40 text-[#ffd8e7] shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5 text-[#3ae441] shrink-0" />
      <span className="text-xs sm:text-sm font-medium leading-snug">{message}</span>
    </div>
  );
};
