---
name: ueds-firebase-architecture
description: Use this skill whenever configuring Firebase Authentication, Firestore, Firebase Admin SDK, security rules, environment variables, role-based admin access, server routes or Vercel deployment for UEDS.
---

# UEDS Firebase Architecture

## Goal

Build a secure-enough demonstration using Firebase without exposing privileged operations to ordinary users.

## Instructions

1. Use the modular Firebase Web SDK.
2. Support email/password and Google authentication.
3. Treat phone as an optional profile field in the first release.
4. Use Firestore for users, deliveries, point transactions, rewards and redemptions.
5. Use Firebase Admin SDK only on trusted server code or local admin scripts.
6. Protect admin access with Firebase custom claims.
7. Add a local script to grant the initial admin claim by UID or email.
8. Put server credentials only in environment variables; never commit them.
9. Add `.env.example` with placeholders.
10. Write restrictive Firestore Rules and explain how to deploy them.
11. Use server-side or privileged functions for operations that alter balances, stock or administrative records.
12. Document Firebase Console setup in `docs/FIREBASE_SETUP.md`.

## Constraints

- Never use `allow read, write: if true`.
- Never trust a client-provided role.
- Never commit a service-account JSON file.
- Never expose private keys with `NEXT_PUBLIC_`.
- Never implement phone-plus-password as if it were a native Firebase provider.
- Do not require paid infrastructure unless the feature truly needs it; explain any billing dependency.

## Verification

Before considering Firebase complete, test unauthenticated, normal-user and admin access paths.
