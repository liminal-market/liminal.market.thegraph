# liminalMarket.ts

This is a TypeScript code file that contains the implementation of the Liminal Market. The file includes the import and export of various functions and classes, as well as test cases for the implemented functions.

## Table of Contents

- [Imports](#imports)
- [Exports](#exports)
- [Test OrderLogic](#test-orderlogic)
  - [handleOrderExecuted](#handleorderexecuted)
  - [handleOrderFailed](#handleorderfailed)
  - [handleTokenCreated](#handletokencreated)

## Imports

The file imports the following functions and classes:

- `handleOrderExecuted`, `handleOrderFailed`, and `handleTokenCreated` from `../src/liminalMarket`
- `beforeEach`, `clearStore`, `describe`, and `test` from `matchstick-as`
- `getOrderExecutedEvent`, `getOrderFailedEvent`, `getTokenCreatedEvent`, `initLiminalMarketInfo`, `WalletAddress`, and `WalletAddress2` from `./Util`
- `BigInt` from `@graphprotocol/graph-ts`

## Exports

The file exports the following functions:

- `handleOrderExecuted`
- `handleOrderFailed`
- `handleTokenCreated`

## Test OrderLogic

The `Test OrderLogic` section contains test cases for the following functions:

### handleOrderExecuted

This function handles the event when an order is executed. The test case for this function is currently commented out.

Example usage:

```typescript
let orderExecutedEvent = getOrderExecutedEvent();
handleOrderExecuted(orderExecutedEvent);
```

### handleOrderFailed

This function handles the event when an order fails. The test case for this function creates an `orderFailedEvent` with the following parameters:

- `WalletAddress`
- `symbol`: 'AAPL'
- `message`: 'Order too old'
- `buyingPower`: BigInt.fromI64(1006890006700001)
- `WalletAddress2`

Example usage:

```typescript
let orderFailedEvent = getOrderFailedEvent(WalletAddress, symbol, message, buyingPower, WalletAddress2);
handleOrderFailed(orderFailedEvent);
```

### handleTokenCreated

This function handles the event when a token is created. The test case for this function creates a `tokenCreatedEvent` with the following parameter:

- `symbol`: 'AAPL'

Example usage:

```typescript
let event = getTokenCreatedEvent('AAPL');
handleTokenCreated(event);
```

**Note**: The actual implementation of the `handleOrderExecuted`, `handleOrderFailed`, and `handleTokenCreated` functions are not included in this file. They are imported from `../src/liminalMarket`.