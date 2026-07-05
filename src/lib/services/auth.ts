import { db } from "@/lib/firebase/client"
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore"
import { UserProfile } from "@/types/domain"
import { User } from "firebase/auth"

function generatePublicCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function ensureUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid)
  const snap = await getDoc(userRef)
  
  if (!snap.exists()) {
    const profile: UserProfile = {
      id: user.uid,
      displayName: user.displayName || "Usuario",
      email: user.email,
      phone: user.phoneNumber || null,
      avatarUrl: user.photoURL || null,
      publicCode: generatePublicCode(),
      pointsBalance: 0,
      pointsReserved: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    }
    await setDoc(userRef, profile)
    return profile
  }
  
  return snap.data() as UserProfile
}
