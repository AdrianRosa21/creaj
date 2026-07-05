# Rutas y componentes sugeridos

## Estructura App Router

```text
src/app/
├── (public)/
│   ├── page.tsx
│   ├── proyecto/page.tsx
│   ├── como-funciona/page.tsx
│   ├── recompensas/page.tsx
│   ├── equipo/page.tsx
│   ├── iniciar-sesion/page.tsx
│   └── crear-cuenta/page.tsx
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── puntos/page.tsx
│   ├── entregas/page.tsx
│   ├── premios/page.tsx
│   ├── canjes/page.tsx
│   └── perfil/page.tsx
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── usuarios/page.tsx
│   ├── entregas/page.tsx
│   ├── canjes/page.tsx
│   └── premios/page.tsx
└── api/
    └── admin/
```

## Componentes públicos

- `PublicHeader`
- `MobileMenu`
- `HeroSection`
- `MachineVisual`
- `ProjectOverview`
- `HowItWorks`
- `ComponentHotspots`
- `SafetySection`
- `ImpactSection`
- `RewardsPreview`
- `TeamSection`
- `FaqSection`
- `PublicFooter`

## Componentes de usuario

- `AppBottomNav`
- `PointsBalanceCard`
- `PointsBreakdown`
- `DeliveryHistory`
- `RewardCard`
- `RewardDetailSheet`
- `RedemptionPass`
- `EmptyState`
- `AuthGuard`

## Componentes administrativos

- `AdminSidebar`
- `AdminMobileNav`
- `UserSearch`
- `UserSummaryCard`
- `DeliveryForm`
- `PointsCalculationPreview`
- `PendingRedemptionCard`
- `RewardEditor`
- `InventoryBadge`
- `AdminGuard`
