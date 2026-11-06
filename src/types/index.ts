
export interface RangoliItem {
  id: string;
  title: string;
  description: string;
  location: string;
  badge: string;
  badgeIcon: string;
  category: 'diya' | 'kolam' | 'floral' | 'mandala';
  imageUrl: string;
  likes: number;
  isLiked?: boolean;
}

export interface CommunityWish {
  id: string;
  name: string;
  location: string;
  message: string;
  tagColor: string;
  timestamp: string;
}

export type CardTheme = 'amber' | 'emerald' | 'crimson';

export interface CardData {
  recipient: string;
  sender: string;
  message: string;
  theme: CardTheme;
}
