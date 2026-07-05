"use server"

import { adminDb, adminAuth } from "@/lib/firebase/admin"
import { FieldValue } from "firebase-admin/firestore"

async function verifyAdminToken(idToken: string) {
  if (!idToken) throw new Error("No token provided");
  const decoded = await adminAuth.verifyIdToken(idToken);
  if (!decoded.admin) {
    throw new Error("No tienes permisos de administrador.");
  }
  return decoded;
}

export async function confirmDelivery(idToken: string, userId: string, quantityCanes: number) {
  const admin = await verifyAdminToken(idToken);
  
  const basePoints = quantityCanes * 10;
  let bonus = 0;
  if (quantityCanes >= 10) bonus = 25;
  else if (quantityCanes >= 5) bonus = 10;
  
  const totalPoints = basePoints + bonus;
  
  const userRef = adminDb.collection("users").doc(userId);
  const deliveryRef = adminDb.collection("deliveries").doc();
  
  const delivery = {
    id: deliveryRef.id,
    userId,
    quantityCanes,
    basePoints,
    bonusPoints: bonus,
    totalPoints,
    status: "confirmed",
    createdAt: FieldValue.serverTimestamp(),
    processedBy: admin.uid,
  };
  
  await adminDb.runTransaction(async (t) => {
    const userSnap = await t.get(userRef);
    if (!userSnap.exists) throw new Error("Usuario no encontrado.");
    
    t.set(deliveryRef, delivery);
    t.update(userRef, {
      pointsBalance: FieldValue.increment(totalPoints),
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  
  return totalPoints;
}

export async function completeRedemption(idToken: string, redemptionId: string) {
  const admin = await verifyAdminToken(idToken);
  
  await adminDb.runTransaction(async (t) => {
    const redRef = adminDb.collection("redemptions").doc(redemptionId);
    const redSnap = await t.get(redRef);
    if (!redSnap.exists) throw new Error("Canje no encontrado.");
    
    const redemption = redSnap.data();
    if (redemption?.status !== "pending") throw new Error("El canje no está pendiente.");
    
    const userRef = adminDb.collection("users").doc(redemption.userId);
    const rewardRef = adminDb.collection("rewards").doc(redemption.rewardId);
    
    const rewardSnap = await t.get(rewardRef);
    if (!rewardSnap.exists) throw new Error("Premio no encontrado.");
    const reward = rewardSnap.data();
    
    if (reward?.stock <= 0) throw new Error("No hay stock suficiente.");
    
    t.update(redRef, {
      status: "completed",
      completedAt: FieldValue.serverTimestamp(),
      processedBy: admin.uid
    });
    
    t.update(userRef, {
      pointsBalance: FieldValue.increment(-redemption.costPoints),
      pointsReserved: FieldValue.increment(-redemption.costPoints),
      updatedAt: FieldValue.serverTimestamp()
    });
    
    t.update(rewardRef, {
      stock: FieldValue.increment(-1),
      updatedAt: FieldValue.serverTimestamp()
    });
  });
}

export async function cancelRedemption(idToken: string, redemptionId: string) {
  const admin = await verifyAdminToken(idToken);
  
  await adminDb.runTransaction(async (t) => {
    const redRef = adminDb.collection("redemptions").doc(redemptionId);
    const redSnap = await t.get(redRef);
    if (!redSnap.exists) throw new Error("Canje no encontrado.");
    
    const redemption = redSnap.data();
    if (redemption?.status !== "pending") throw new Error("El canje no está pendiente.");
    
    const userRef = adminDb.collection("users").doc(redemption.userId);
    
    t.update(redRef, {
      status: "cancelled",
      cancelledAt: FieldValue.serverTimestamp(),
      processedBy: admin.uid
    });
    
    t.update(userRef, {
      pointsReserved: FieldValue.increment(-redemption.costPoints),
      updatedAt: FieldValue.serverTimestamp()
    });
  });
}
