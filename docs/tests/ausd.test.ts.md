# ausd.test.ts

This is a code file that contains tests for the `ausd` module. The tests are written using the `matchstick-as` testing framework for AssemblyScript. The main focus of these tests is to ensure the correct functionality of the `handleBalanceSet` function.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Test Suite](#test-suite)
  - [Before Each Test](#before-each-test)
  - [Test handleBalanceSet](#test-handlebalanceset)
- [Utility Functions](#utility-functions)
  - [getBalanceSetEvent](#getbalancesetevent)
  - [initLiminalMarketInfo](#initliminalmarketinfo)

## Prerequisites

Before diving into the tests, make sure you have a basic understanding of the following concepts:

- AssemblyScript
- matchstick-as testing framework
- The Graph Protocol

## Test Suite

The test suite is defined using the `describe` function from the `matchstick-as` testing framework. The test suite is named "Test aUSD".

### Before Each Test

The `beforeEach` function is used to set up the initial state before each test is run. In this case, the `clearStore` function is called to clear any previous data, and the `initLiminalMarketInfo` function is called to initialize the market information.

```typescript
beforeEach(() => {
    clearStore();
    initLiminalMarketInfo();
})
```

### Test handleBalanceSet

This test case focuses on testing the `handleBalanceSet` function. The function is called with a `balanceSetEvent` object, which is created using the `getBalanceSetEvent` utility function.

```typescript
test('Test handleBalanceSet', () => {
    let balanceSetEvent = getBalanceSetEvent(BigInt.fromI32(1039230), 1);

    handleBalanceSet(balanceSetEvent)
})
```

## Utility Functions

The following utility functions are used in the test suite:

### getBalanceSetEvent

This function takes two parameters:

- `balance`: A `BigInt` representing the balance.
- `id`: A number representing the event ID.

It returns an object representing a balance set event.

```typescript
function getBalanceSetEvent(balance: BigInt, id: number): BalanceSetEvent {
    // Implementation details
}
```

### initLiminalMarketInfo

This function initializes the market information for the tests. It takes no parameters and returns no value.

```typescript
function initLiminalMarketInfo(): void {
    // Implementation details
}
```

That's it! This documentation should give you a clear understanding of the `ausd.test.ts` file and its contents.