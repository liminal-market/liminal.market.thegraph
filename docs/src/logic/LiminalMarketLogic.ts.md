# LiminalMarketLogic.ts

This TypeScript file contains the `LiminalMarketLogic` class, which is responsible for managing the Liminal Market Info. The class provides methods to create, retrieve, and update the Liminal Market Info.

## Usage

To use the `LiminalMarketLogic` class, you need to import it and create an instance of the class:

```typescript
import LiminalMarketLogic from "./LiminalMarketLogic";

const liminalMarketLogic = new LiminalMarketLogic();
```

## Methods

### getNewLiminalMarketInfo(): LiminalMarketInfo

This method creates a new `LiminalMarketInfo` object with default values.

**Returns**: A new `LiminalMarketInfo` object.

### getLiminalMarketInfo(): LiminalMarketInfo

This method retrieves the existing `LiminalMarketInfo` object or creates a new one if it doesn't exist.

**Returns**: The existing or newly created `LiminalMarketInfo` object.

### storeTransaction(liminalMarketInfo: LiminalMarketInfo, filledAt: BigInt): void

This method updates the `LiminalMarketInfo` object with the latest transaction information.

**Parameters**:

- `liminalMarketInfo`: The `LiminalMarketInfo` object to update.
- `filledAt`: A `BigInt` representing the timestamp of the transaction.

## Example

```typescript
import LiminalMarketLogic from "./LiminalMarketLogic";

const liminalMarketLogic = new LiminalMarketLogic();

// Get the current LiminalMarketInfo
const liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo();

// Update the LiminalMarketInfo with a new transaction
const filledAt = BigInt.fromI32(1629472800); // Example timestamp
liminalMarketLogic.storeTransaction(liminalMarketInfo, filledAt);
```

## Dependencies

This file imports and uses the following dependencies:

- `LiminalMarketInfo` and `Order` from "../../generated/schema"
- `BigDecimal` and `BigInt` from "@graphprotocol/graph-ts"
- `SymbolLogic` from "./SymbolLogic"
- `NumberHelper` from "../NumberHelper"