# WalletLogic.ts

`WalletLogic.ts` is a TypeScript class that provides methods for managing wallet-related operations. It is responsible for creating new wallets, loading existing wallets, updating wallet balances, and storing order execution details. This class is part of a larger project that uses The Graph Protocol.

## Table of Contents

- [Class Definition](#class-definition)
- [Methods](#methods)
  - [getNewWallet](#getnewwallet)
  - [getWallet](#getwallet)
  - [storeBalanceSet](#storebalanceset)
  - [storeOrderExecuted](#storeorderexecuted)

## Class Definition

```typescript
export default class WalletLogic {
  // Class methods go here
}
```

## Methods

### getNewWallet

```typescript
public getNewWallet(id: string): Wallet
```

This method creates a new `Wallet` object with the given `id`. It initializes the wallet's properties with default values.

**Parameters:**

- `id` (string): The unique identifier for the new wallet.

**Returns:**

- `Wallet`: A new wallet object with default property values.

### getWallet

```typescript
public getWallet(recipient: Address, liminalMarketInfo: LiminalMarketInfo): Wallet
```

This method retrieves an existing wallet by its `recipient` address. If the wallet does not exist, it creates a new wallet and increments the `walletCount` property of the `liminalMarketInfo` object.

**Parameters:**

- `recipient` (Address): The wallet's recipient address.
- `liminalMarketInfo` (LiminalMarketInfo): The market information object.

**Returns:**

- `Wallet`: The wallet object associated with the recipient address.

### storeBalanceSet

```typescript
public storeBalanceSet(wallet: Wallet, balanceWei: BigInt, updated: BigInt, historyId: string): void
```

This method updates the wallet's balance and balanceWei properties, sets the updated timestamp, and adds the `historyId` to the wallet's history array.

**Parameters:**

- `wallet` (Wallet): The wallet object to update.
- `balanceWei` (BigInt): The new balance in Wei.
- `updated` (BigInt): The updated timestamp.
- `historyId` (string): The history identifier to add to the wallet's history array.

### storeOrderExecuted

```typescript
public storeOrderExecuted(wallet: Wallet, order: Order, positionId: string, transactionId: string, created: BigInt): void
```

This method updates the wallet's properties after an order has been executed. It adds the `positionId` to the wallet's positions array, adds the order's ID to the wallet's orders array, increments the wallet's transaction count, and updates the wallet's balance and balanceWei properties.

**Parameters:**

- `wallet` (Wallet): The wallet object to update.
- `order` (Order): The executed order object.
- `positionId` (string): The position identifier to add to the wallet's positions array.
- `transactionId` (string): The transaction identifier.
- `created` (BigInt): The created timestamp.