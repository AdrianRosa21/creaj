import { db } from "@/lib/firebase/client"
import { collection, getDocs, doc, runTransaction, query, where, Timestamp } from "firebase/firestore"
import { Reward, Redemption, UserProfile } from "@/types/domain"

export async function getActiveRewards(): Promise<Reward[]> {
  try {
    const rewardsRef = collection(db, "rewards")
    const q = query(rewardsRef, where("active", "==", true))
    const snap = await getDocs(q)
    if (snap.empty) return []
    return snap.docs.map(d => d.data() as Reward)
  } catch (e) {
    console.error("Error fetching rewards", e)
    return []
  }
}

export async function requestRedemption(userId: string, reward: Reward): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const userRef = doc(db, "users", userId)
    const rewardRef = doc(db, "rewards", reward.id)
    
    const userSnap = await transaction.get(userRef)
    const rewardSnap = await transaction.get(rewardRef)
    
    if (!userSnap.exists() || !rewardSnap.exists()) {
      throw new Error("Usuario o premio no encontrado.")
    }
    
    const user = userSnap.data() as UserProfile
    const currentReward = rewardSnap.data() as Reward
    
    const availablePoints = user.pointsBalance - user.pointsReserved
    
    if (availablePoints < currentReward.costPoints) {
      throw new Error("Puntos insuficientes.")
    }
    
    if (currentReward.stock <= 0) {
      throw new Error("Premio agotado.")
    }
    
    // Valid. Reserve points
    transaction.update(userRef, {
      pointsReserved: user.pointsReserved + currentReward.costPoints,
      updatedAt: Timestamp.now()
    })
    
    // Create pending redemption
    const newRedemptionRef = doc(collection(db, "redemptions"))
    const redemption: Redemption = {
      id: newRedemptionRef.id,
      userId,
      rewardId: currentReward.id,
      rewardSnapshot: {
        name: currentReward.name,
        costPoints: currentReward.costPoints,
        imageUrl: currentReward.imageUrl,
      },
      costPoints: currentReward.costPoints,
      verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      status: 'pending',
      createdAt: Timestamp.now(),
      completedAt: null,
      cancelledAt: null,
      processedBy: null,
    }
    
    transaction.set(newRedemptionRef, redemption)
  })
}

export async function cancelPendingRedemption(redemptionId: string, userId: string): Promise<void> {
  await runTransaction(db, async (transaction) => {
    const redRef = doc(db, "redemptions", redemptionId)
    const redSnap = await transaction.get(redRef)
    
    if (!redSnap.exists()) throw new Error("Canje no encontrado")
    
    const redemption = redSnap.data() as Redemption
    if (redemption.userId !== userId) throw new Error("Acceso denegado")
    if (redemption.status !== 'pending') throw new Error("El canje ya no está pendiente")
    
    const userRef = doc(db, "users", userId)
    const userSnap = await transaction.get(userRef)
    if (!userSnap.exists()) throw new Error("Usuario no encontrado")
    const user = userSnap.data() as UserProfile
    
    // Cancel redemption
    transaction.update(redRef, {
      status: 'cancelled',
      cancelledAt: Timestamp.now()
    })
    
    // Free reserved points
    transaction.update(userRef, {
      pointsReserved: Math.max(0, user.pointsReserved - redemption.costPoints),
      updatedAt: Timestamp.now()
    })
  })
}
