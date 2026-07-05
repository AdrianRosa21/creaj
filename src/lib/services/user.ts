import { db } from "@/lib/firebase/client"
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"
import { UserProfile } from "@/types/domain"

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? (snap.data() as UserProfile) : null
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, "users", uid)
  await updateDoc(ref, {
    ...data,
    updatedAt: Timestamp.now()
  })
}
