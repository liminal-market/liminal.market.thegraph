# WalletHistoryLogic.ts

This is a TypeScript code file that contains the `WalletHistoryLogic` class. This class is responsible for managing wallet history data, including adding new wallet history entries and retrieving action names based on action codes.

## Usage

To use the `WalletHistoryLogic` class, you need to import it and create a new instance:

```typescript
import WalletHistoryLogic from "./WalletHistoryLogic";

const walletHistoryLogic = new WalletHistoryLogic();
```

## Methods

### add

```typescript
add(transactionId: string, walletId: string, balanceWei: BigInt, currentBalanceWei: BigInt, action: i32, createdInSeconds: BigInt): WalletHistory
```

This method adds a new wallet history entry with the given parameters:

- `transactionId`: The unique identifier of the transaction.
- `walletId`: The unique identifier of the wallet.
- `balanceWei`: The wallet balance in Wei (1 Ether = 10^18 Wei).
- `currentBalanceWei`: The current wallet balance in Wei.
- `action`: The action code (0: Fund, 1: OrderBuy, 2: OrderSell, 3: OrderExecuted).
- `createdInSeconds`: The creation timestamp in seconds.

The method returns a `WalletHistory` object with the added wallet history entry.

### getActionName

```typescript
private getActionName(action: i32): string
```

This private method returns the action name based on the given action code:

- `action`: The action code (0: Fund, 1: OrderBuy, 2: OrderSell, 3: OrderExecuted).

The method returns a string with the action name.

## Example

```typescript
import WalletHistoryLogic from "./WalletHistoryLogic";
import { BigInt } from "@graphprotocol/graph-ts";

const walletHistoryLogic = new WalletHistoryLogic();
const transactionId = "tx123";
const walletId = "wallet123";
const balanceWei = BigInt.fromI32(1000);
const currentBalanceWei = BigInt.fromI32(500);
const action = 1; // OrderBuy
const createdInSeconds = BigInt.fromI32(1627552800);

const walletHistory = walletHistoryLogic.add(transactionId, walletId, balanceWei, currentBalanceWei, action, createdInSeconds);
console.log(walletHistory);
```

This example creates a new instance of the `WalletHistoryLogic` class and adds a new wallet history entry with the given parameters. The resulting `WalletHistory` object is logged to the console.