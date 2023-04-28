# SymbolLogic.test.ts

This is a test file for the `SymbolLogic` class, which is responsible for handling the logic related to symbols in the Liminal Market. The tests in this file ensure that the `SymbolLogic` class functions as expected when handling token creation and storing multiple orders.

## Table of Contents

- [Test TokenCreated](#test-tokencreated)
- [Storing Multiple Orders](#storing-multiple-orders)

## Test TokenCreated

This test ensures that the `handleTokenCreated` function correctly creates a new token with the given symbol ID.

### Example

```typescript
test("Should create token AAPL", () => {
    let symbolId = 'AAPL'
    let tokenCreated = getTokenCreatedEvent(symbolId);

    handleTokenCreated(tokenCreated);

    // Assertions to check if the token is created correctly
})
```

## Storing Multiple Orders

This test checks if the `SymbolLogic` class can store multiple orders (buy and sell) and validate that the Total Share Limit (TSL) is correct.

### Example

```typescript
test('storing of multiple orders, buy and sell, validate TSL is correct', () => {
    let symbol = 'AAPL';
    let tokenAddress = WalletAddress;
    let timestamp = BigInt.fromI32(393939);

    let symbolLogic = new SymbolLogic();
    symbolLogic.create(symbol, tokenAddress, timestamp);

    // Create and store multiple orders (buy and sell)
    // Assertions to check if the TSL and value are correct
})
```

### Methods

#### create

This method creates a new symbol with the given parameters.

- Parameters:
  - `symbol`: The symbol of the token.
  - `tokenAddress`: The address of the token.
  - `timestamp`: The timestamp of the creation.

#### store

This method stores an order in the symbol.

- Parameters:
  - `order`: The order to be stored.

### Technical Concepts

- **Total Share Limit (TSL)**: The total number of shares available for a particular symbol.