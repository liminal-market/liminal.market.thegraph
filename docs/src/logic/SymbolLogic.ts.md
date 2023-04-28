# SymbolLogic.ts

This is a TypeScript code file that contains the `SymbolLogic` class. This class is responsible for managing the logic related to symbols in the Liminal Market application. It provides methods for creating, retrieving, and updating symbol information.

## Usage

To use the `SymbolLogic` class, you need to import it and create an instance of the class. Then, you can call its methods to perform various operations related to symbols.

```typescript
import SymbolLogic from "./SymbolLogic";

const symbolLogic = new SymbolLogic();
```

## Methods

### get(id: string): Symbol | null

This method retrieves a symbol by its ID. If the symbol is not found, it returns `null`.

**Parameters:**

- `id` (string): The ID of the symbol to retrieve.

### create(id: string, tokenAddress: Address, timestamp: BigInt): void

This method creates a new symbol with the given ID, token address, and timestamp.

**Parameters:**

- `id` (string): The ID of the new symbol.
- `tokenAddress` (Address): The token address associated with the symbol.
- `timestamp` (BigInt): The timestamp when the symbol was created.

### store(order: Order): void

This method updates the symbol information based on the given order.

**Parameters:**

- `order` (Order): The order containing the symbol information to update.

### getNewSymbol(id: string, tokenAddress: Address, timestamp: BigInt): Symbol

This method creates a new `Symbol` object with the given ID, token address, and timestamp.

**Parameters:**

- `id` (string): The ID of the new symbol.
- `tokenAddress` (Address): The token address associated with the symbol.
- `timestamp` (BigInt): The timestamp when the symbol was created.

## Example

```typescript
import SymbolLogic from "./SymbolLogic";
import { Address, BigInt } from "@graphprotocol/graph-ts";

const symbolLogic = new SymbolLogic();

// Create a new symbol
const id = "symbolId";
const tokenAddress = Address.fromString("0x1234567890123456789012345678901234567890");
const timestamp = BigInt.fromI32(1620000000);
symbolLogic.create(id, tokenAddress, timestamp);

// Get a symbol by ID
const symbol = symbolLogic.get(id);
console.log(symbol);

// Update a symbol based on an order
const order = new Order("orderId");
order.symbol = id;
order.wallet = "walletId";
order.filledQtyWei = BigInt.fromI32(100);
order.filledAvgPriceWei = BigInt.fromI32(200);
order.filledAt = BigInt.fromI32(1620000100);
symbolLogic.store(order);
```

## Technical Concepts

- `Symbol`: A class representing a symbol in the Liminal Market application. It contains information such as the symbol's ID, contract address, logo, price per share, and other related data.
- `Order`: A class representing an order in the Liminal Market application. It contains information such as the order's ID, wallet, filled quantity, filled average price, and other related data.
- `Address`: A class representing an Ethereum address. It is used to store the token address associated with a symbol.
- `BigDecimal`: A class representing a decimal number with arbitrary precision. It is used to store the price per share and other decimal values in the `Symbol` class.
- `BigInt`: A class representing a big integer number. It is used to store the timestamp and other integer values in the `Symbol` and `Order` classes.