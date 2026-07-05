import { collection, query, where, getDocs, getCountFromServer, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Redemption, UserProfile, Reward } from "@/types/domain"

export async function getAdminDashboardStats() {
  const usersCount = await getCountFromServer(collection(db, "users"))
  const redemptionsPendingCount = await getCountFromServer(
    query(collection(db, "redemptions"), where("status", "==", "pending"))
  )
  const deliveriesCount = await getCountFromServer(collection(db, "deliveries"))
  
  // Total points (we can approximate by summing up deliveries, or just omit if too heavy)
  // Let's just fetch low stock rewards
  const rewardsQuery = query(collection(db, "rewards"), where("stock", "<=", 10), where("active", "==", true), orderBy("stock", "asc"), limit(5))
  const lowStockRewardsSnap = await getDocs(rewardsQuery)
  
  return {
    users: usersCount.data().count,
    pendingRedemptions: redemptionsPendingCount.data().count,
    deliveries: deliveriesCount.data().count,
    lowStockRewards: lowStockRewardsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Reward))
  }
}

export async function searchUsers(searchTerm: string): Promise<UserProfile[]> {
  const usersRef = collection(db, "users")
  let q;
  if (searchTerm.includes("@")) {
    q = query(usersRef, where("email", "==", searchTerm.toLowerCase()))
  } else if (searchTerm.length === 6) {
    q = query(usersRef, where("publicCode", "==", searchTerm.toUpperCase()))
  } else {
    // Basic prefix search (not ideal for firestore without extensions, but okay for demo)
    q = query(usersRef, where("displayName", ">=", searchTerm), where("displayName", "<=", searchTerm + "\uf8ff"))
  }
  
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as UserProfile)
}

export async function searchRedemptionByCode(code: string): Promise<Redemption | null> {
  const q = query(collection(db, "redemptions"), where("verificationCode", "==", code.toUpperCase()), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Redemption
}
