---
name: ueds-quality-gate
description: Use this skill before declaring any UEDS feature, page, milestone or deployment complete. It reviews correctness, mobile UX, accessibility, Firebase security, loading states, errors and build quality.
---

# UEDS Quality Gate

## Goal

Prevent unfinished or visually impressive-but-broken work from being marked complete.

## Required checks

1. Run lint and production build.
2. Fix all TypeScript errors.
3. Check browser console for errors.
4. Test mobile widths first.
5. Test keyboard navigation and visible focus.
6. Verify contrast and semantic labels.
7. Verify loading, empty, success and error states.
8. Verify auth persistence and logout.
9. Verify route guards for user and admin routes.
10. Verify normal users cannot execute admin writes.
11. Verify point and redemption transactions are atomic.
12. Verify duplicate clicks cannot create duplicate deliveries or canjes.
13. Verify there are no secrets in the repository.
14. Verify images are optimized and pages do not depend on a heavy 3D model.
15. Produce a short completion report with tested scenarios and remaining limitations.

## Constraints

- Do not claim completion while build or lint fails.
- Do not hide errors with `any`, disabled lint rules or empty catches.
- Do not leave critical buttons without disabled/loading states.
- Do not deploy with permissive Firestore rules.
