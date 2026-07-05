import { db } from "@/lib/firebase/client"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Delivery, Redemption } from "@/types/domain"

export async function getUserDeliveries(userId: string): Promise<Delivery[]> {
  try {
    const q = query(
      collection(db, "deliveries"),
      where("userId", "==", userId)
    )
    const snap = await getDocs(q)
    const deliveries = snap.docs.map(d => d.data() as Delivery)
    return deliveries.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
  } catch (e) {
    console.error("Error fetching deliveries", e)
    return []
  }
}

export async function getUserRedemptions(userId: string): Promise<Redemption[]> {
  try {
    const q = query(
      collection(db, "redemptions"),
      where("userId", "==", userId)
    )
    const snap = await getDocs(q)
    const redemptions = snap.docs.map(d => d.data() as Redemption)
    return redemptions.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
  } catch (e) {
    console.error("Error fetching redemptions", e)
    return []
  }
}
