---
name: ueds-rewards-domain
description: Use this skill whenever implementing points, sugarcane deliveries, reward catalog, inventory, redemption requests, reserved points, user balances, histories or the in-person admin validation flow.
---

# UEDS Rewards Domain

## Goal

Implement a small but trustworthy rewards demonstration with auditable point movements and safe redemption behavior.

## Instructions

1. Read `docs/POINTS_AND_REWARDS.md`, `docs/FUNCTIONAL_SPEC.md` and `docs/DATA_MODEL.md`.
2. Calculate points only from accepted cane quantity.
3. Preview the calculation before an admin confirms a delivery.
4. Create a point transaction for every balance-changing event.
5. Use Firestore transactions for every critical multi-document operation.
6. Reserve points when a redemption becomes pending.
7. Complete redemption only from the admin interface.
8. Release reserved points when a pending redemption is cancelled.
9. Store a reward snapshot in the redemption so later catalog changes do not alter history.
10. Make pending, completed and cancelled states visually distinct.

## Constraints

- Never let the client directly edit its own balance.
- Never allow available points below zero.
- Never complete a redemption from the user UI.
- Never decrement stock twice.
- Never calculate rewards from time, streaks or visit duration.
- Never delete audit history to correct a mistake; use a reversal or adjustment transaction.

## Example

For 8 accepted canes: base 80 points + 10 bonus = 90 total points.
