# Util.ts

Util.ts is a utility file containing various helper functions and constants used throughout the project. These functions are designed to simplify and streamline the codebase by providing reusable functionality.

## Constants

- `WalletAddress`: A constant representing the first wallet address.
- `WalletAddress2`: A constant representing the second wallet address.

## Functions

### getFakeOrder

```typescript
function getFakeOrder(symbol: string, side: string, filledQty: i64, avgPrice: i64, tslWei: i64 = 0): Order
```

This function creates a fake order with the given parameters. It is useful for testing purposes.

**Parameters:**

- `symbol`: The symbol of the order.
- `side`: The side of the order (buy or sell).
- `filledQty`: The filled quantity of the order.
- `avgPrice`: The average price of the order.
- `tslWei`: The trailing stop loss in Wei (optional).

**Returns:**

- `Order`: A new fake order with the given parameters.

### initLiminalMarketInfo

```typescript
function initLiminalMarketInfo(): LiminalMarketInfo
```

This function initializes a new `LiminalMarketInfo` object and stores it in the database.

**Returns:**

- `LiminalMarketInfo`: A new `LiminalMarketInfo` object.

### getLiminalMarketInfo

```typescript
function getLiminalMarketInfo(): LiminalMarketInfo
```

This function retrieves the `LiminalMarketInfo` object from the database.

**Returns:**

- `LiminalMarketInfo`: The `LiminalMarketInfo` object.

### getSpender

```typescript
function getSpender(address: Address): ServiceContract
```

This function retrieves a `ServiceContract` object from the database using the given address.

**Parameters:**

- `address`: The address of the service contract.

**Returns:**

- `ServiceContract`: The `ServiceContract` object.

### getStringParam

```typescript
function getStringParam(key: string, value: string): ethereum.EventParam
```

This function creates a new `ethereum.EventParam` object with the given key and string value.

**Parameters:**

- `key`: The key of the event parameter.
- `value`: The string value of the event parameter.

**Returns:**

- `ethereum.EventParam`: A new `ethereum.EventParam` object with the given key and string value.

### getBigIntParam

```typescript
function getBigIntParam(key: string, value: BigInt): ethereum.EventParam
```

This function creates a new `ethereum.EventParam` object with the given key and BigInt value.

**Parameters:**

- `key`: The key of the event parameter.
- `value`: The BigInt value of the event parameter.

**Returns:**

- `ethereum.EventParam`: A new `ethereum.EventParam` object with the given key and BigInt value.

### geti32Param

```typescript
function geti32Param(key: string, value: i32): ethereum.EventParam
```

This function creates a new `ethereum.EventParam` object with the given key and i32 value.

**Parameters:**

- `key`: The key of the event parameter.
- `value`: The i32 value of the event parameter.

**Returns:**

- `ethereum.EventParam`: A new `ethereum.EventParam` object with the given key and i32 value.

### getAddressParam

```typescript
function getAddressParam(key: string, value: Address): ethereum.EventParam
```

This function creates a new `ethereum.EventParam` object with the given key and Address value.

**Parameters:**

- `key`: The key of the event parameter.
- `value`: The Address value of the event parameter.

**Returns:**

- `ethereum.EventParam`: A new `ethereum.EventParam` object with the given key and Address value.

### getSymbolAddressParam

```typescript
function getSymbolAddressParam(key: string, value: string): ethereum.EventParam
```

This function creates a new `ethereum.EventParam` object with the given key and symbol address value.

**Parameters:**

- `key`: The key of the event parameter.
- `value`: The symbol address value of the event parameter.

**Returns:**

- `ethereum.EventParam`: A new `ethereum.EventParam` object with the given key and symbol address value.

### getSymbolAddress

```typescript
function getSymbolAddress(key: string): MockSymbol
```

This function retrieves a `MockSymbol` object from the list of symbols using the given key.

**Parameters:**

- `key`: The key of the symbol.

**Returns:**

- `MockSymbol`: The `MockSymbol` object.

### getBigIntWei

```typescript
function getBigIntWei(amount: i64): BigInt
```

This function converts the given amount to Wei using a multiplier.

**Parameters:**

- `amount`: The amount to convert to Wei.

**Returns:**

- `BigInt`: The converted amount in Wei.

### getNextTimestamp

```typescript
function getNextTimestamp(): BigInt
```

This function generates a new timestamp by incrementing the nonce.

**Returns:**

- `BigInt`: The new timestamp.

### getBalanceSetEvent

```typescript
function getBalanceSetEvent(balance: BigInt, action: i32, recipient: Address = WalletAddress): BalanceSet
```

This function creates a new `BalanceSet` event with the given parameters.

**Parameters:**

- `balance`: The balance of the event.
- `action`: The action of the event.
- `recipient`: The recipient of the event (optional, defaults to `WalletAddress`).

**Returns:**

- `BalanceSet`: A new `BalanceSet` event with the given parameters.

### getTokenCreatedEvent

```typescript
function getTokenCreatedEvent(symbol: string): TokenCreated
```

This function creates a new `TokenCreated` event with the given symbol.

**Parameters:**

- `symbol`: The symbol of the token.

**Returns:**

- `TokenCreated`: A new `TokenCreated` event with the given symbol.

### getServiceContractCreatedEvent

```typescript
function getServiceContractCreatedEvent(serviceContractId: Address): ServiceContractCreated
```

This function creates a new `ServiceContractCreated` event with the given service contract ID.

**Parameters:**

- `serviceContractId`: The ID of the service contract.

**Returns:**

- `ServiceContractCreated`: A new `ServiceContractCreated` event with the given service contract ID.

### getOrderFailedEvent

```typescript
function getOrderFailedEvent(recipient: Address,