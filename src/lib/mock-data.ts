import { UserProfile, Reward, Delivery, Redemption, PointTransaction } from "@/types/domain";
import { Timestamp } from "firebase/firestore";

// Helper for simulating timestamps
const now = Timestamp.now();

export const MOCK_USER: UserProfile = {
  id: "mock-uid-123",
  displayName: "Adrián Visitante",
  email: "visitante@ejemplo.com",
  phone: null,
  avatarUrl: null,
  publicCode: "ABC-123",
  pointsBalance: 150,
  pointsReserved: 30,
  createdAt: now,
  updatedAt: now,
};

export const MOCK_REWARDS: Reward[] = [
  {
    id: "r1",
    name: "Chicle",
    description: "Chicle sabor menta fresca.",
    costPoints: 20,
    stock: 30,
    imageUrl: null,
    active: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "r2",
    name: "Paleta",
    description: "Paleta de caramelo.",
    costPoints: 30,
    stock: 25,
    imageUrl: null,
    active: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  }
];

export const MOCK_DELIVERIES: Delivery[] = [
  {
    id: "d1",
    userId: "mock-uid-123",
    quantityCanes: 10,
    basePoints: 100,
    bonusPoints: 25,
    totalPoints: 125,
    note: "Entrega inicial",
    status: "confirmed",
    createdBy: "admin-uid",
    createdAt: now,
  }
];

export const MOCK_REDEMPTIONS: Redemption[] = [
  {
    id: "red1",
    userId: "mock-uid-123",
    rewardId: "r2",
    rewardSnapshot: {
      name: "Paleta",
      costPoints: 30,
      imageUrl: null,
    },
    costPoints: 30,
    verificationCode: "XYZ-987",
    status: "pending",
    createdAt: now,
    completedAt: null,
    cancelledAt: null,
    processedBy: null,
  }
];

export const MOCK_TRANSACTIONS: PointTransaction[] = [
  {
    id: "t1",
    userId: "mock-uid-123",
    type: "delivery",
    amount: 125,
    sourceId: "d1",
    description: "Entrega de 10 cañas",
    createdBy: "admin-uid",
    createdAt: now,
  }
];
