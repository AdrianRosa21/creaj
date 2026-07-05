import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  id: string;
  displayName: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  publicCode: string;
  pointsBalance: number;
  pointsReserved: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Delivery {
  id: string;
  userId: string;
  quantityCanes: number;
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  note: string | null;
  status: 'confirmed' | 'voided';
  createdBy: string;
  createdAt: Timestamp;
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'delivery' | 'redemption' | 'adjustment' | 'reversal';
  amount: number;
  sourceId: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  costPoints: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Redemption {
  id: string;
  userId: string;
  rewardId: string;
  rewardSnapshot: {
    name: string;
    costPoints: number;
    imageUrl: string | null;
  };
  costPoints: number;
  verificationCode: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  completedAt: Timestamp | null;
  cancelledAt: Timestamp | null;
  processedBy: string | null;
}
