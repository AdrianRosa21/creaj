# Modelo de datos propuesto — Cloud Firestore

## `users/{uid}`

```ts
{
  displayName: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  publicCode: string;
  pointsBalance: number;
  pointsReserved: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

`availablePoints = pointsBalance - pointsReserved` debe calcularse de forma consistente.

El rol administrativo se protege con custom claims de Firebase Authentication. No confiar únicamente en un campo editable del documento.

## `deliveries/{deliveryId}`

```ts
{
  userId: string;
  quantityCanes: number;
  basePoints: number;
  bonusPoints: number;
  totalPoints: number;
  note: string | null;
  status: 'confirmed' | 'voided';
  createdBy: string;
  createdAt: Timestamp;
}
```

## `pointTransactions/{transactionId}`

```ts
{
  userId: string;
  type: 'delivery' | 'redemption' | 'adjustment' | 'reversal';
  amount: number;
  sourceId: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
}
```

Usar cantidades positivas para créditos y negativas para débitos.

## `rewards/{rewardId}`

```ts
{
  name: string;
  description: string;
  costPoints: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## `redemptions/{redemptionId}`

```ts
{
  userId: string;
  rewardId: string;
  rewardSnapshot: {
    name: string;
    costPoints: number;
    imageUrl: string | null;
  };
  costPoints: number;
  verificationCode: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  completedAt: Timestamp | null;
  cancelledAt: Timestamp | null;
  processedBy: string | null;
}
```

## Operaciones atómicas

Usar transacciones de Firestore para:

- Registrar entrega y sumar saldo.
- Crear canje y reservar puntos.
- Completar canje, descontar saldo reservado y bajar inventario.
- Cancelar canje y liberar reserva.

Nunca encadenar varias escrituras críticas sin transacción.
