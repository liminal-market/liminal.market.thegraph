# PositionLogic.ts

The `PositionLogic.ts` file is a TypeScript code file that contains the `PositionLogic` class. This class is responsible for managing and updating positions related to a specific wallet and symbol. The class contains a single method, `getOrCreatePosition`, which either retrieves an existing position or creates a new one if it doesn't exist.

## Usage Examples

To use the `PositionLogic` class, you first need to import it:

```typescript
import PositionLogic from "./PositionLogic";
```

Then, you can create an instance of the class and call the `getOrCreatePosition` method:

```typescript
const positionLogic = new PositionLogic();
const position = positionLogic.getOrCreatePosition(walletId, order);
```

## Methods

### getOrCreatePosition

```typescript
public getOrCreatePosition(walletId: string, order: Order): Position
```

The `getOrCreatePosition` method takes two parameters: `walletId` and `order`. It returns a `Position` object.

#### Parameters

- `walletId` (string): The unique identifier of the wallet.
- `order` (Order): An `Order` object containing information about the order.

#### Description

The method first constructs a `positionId` by concatenating the `walletId` and the `order.symbol`. It then attempts to load an existing position using the `positionId`. If a position is not found, a new `Position` object is created with the `positionId`, and its `txCount` is initialized to 0.

The method then updates the position's properties with the wallet ID, symbol, tslWei, tsl, and increments the transaction count. The position's `updated` property is set to the `filledAt` property of the order. Finally, the position is saved and returned.

## Technical Concepts

### BigInt

`BigInt` is a built-in object in TypeScript that represents arbitrarily large integers. In this code, `BigInt` is used to handle the transaction count (`txCount`) of a position.

### BigDecimal

`BigDecimal` is a custom object used in this code to handle decimal numbers with arbitrary precision. It is used to store the tsl value of a position.

### DateHelper, SymbolLogic, and NumberHelper

These are custom helper classes imported from other files in the project. They provide utility functions for working with dates, symbols, and numbers, respectively. In this code, `NumberHelper` is used to convert the tslWei value to a decimal tsl value.