# NumberHelper.test.ts

This is a test file for the `NumberHelper` class, which provides utility functions for working with numbers in the context of the application. The tests are written using the `matchstick-as` testing framework.

## Table of Contents

- [Test Suite Description](#test-suite-description)
- [Test Cases](#test-cases)
  - [getDecimal](#getdecimal)
  - [getDecimal below 1](#getdecimal-below-1)
  - [times for two BigInt](#times-for-two-bigint)
  - [plusMinus for buy](#plusminus-for-buy)
  - [plusMinus for sell](#plusminus-for-sell)
  - [plusMinus for sell, should return -1](#plusminus-for-sell-should-return--1)
  - [uintPlusMinus for sell, should be 0](#uintplusminus-for-sell-should-be-0)

## Test Suite Description

The test suite is defined using the `describe` function from the `matchstick-as` testing framework. The description for this test suite is "Test NumberHelper".

```typescript
describe('Test NumberHelper', () => {
  // Test cases go here
});
```

## Test Cases

### getDecimal

This test case checks the `getDecimal` method of the `NumberHelper` class. It converts a given `weiNumber` to its decimal representation and asserts that the result is equal to the expected value.

```typescript
test('test getDecimal', () => {
  let weiNumber = getBigIntWei(123);
  let number = NumberHelper.getDecimal(weiNumber);

  assert.stringEquals('123', number.toString());
});
```

### getDecimal below 1

This test case checks the `getDecimal` method for a `weiNumber` that is less than 1. It asserts that the result is equal to the expected value.

```typescript
test('test getDecimal below 1', () => {
  let weiNumber = BigInt.fromString('2345' + '0'.repeat(14));
  let number = NumberHelper.getDecimal(weiNumber);

  assert.stringEquals('0.2345', number.toString());
});
```

### times for two BigInt

This test case checks the `times` method of the `NumberHelper` class. It multiplies two `BigInt` numbers and asserts that the result is equal to the expected value.

```typescript
test('test times for two BigInt', () => {
  let weiNumber1 = getBigIntWei(100);
  let weiNumber2 = getBigIntWei(2);

  let newNumber = NumberHelper.times(weiNumber1, weiNumber2);
  assert.stringEquals('200' + '0'.repeat(18), newNumber.toString());
});
```

### plusMinus for buy

This test case checks the `plusOrMinus` method of the `NumberHelper` class for a "buy" operation. It adds two `BigInt` numbers and asserts that the result is equal to the expected value.

```typescript
test('test plusMinus for buy', () => {
  let weiNumber1 = getBigIntWei(100);
  let weiNumber2 = getBigIntWei(2);

  let result = NumberHelper.uintPlusOrMinus('buy', weiNumber1, weiNumber2);
  assert.stringEquals('102' + '0'.repeat(18), result.toString());
});
```

### plusMinus for sell

This test case checks the `plusOrMinus` method of the `NumberHelper` class for a "sell" operation. It subtracts two `BigInt` numbers and asserts that the result is equal to the expected value.

```typescript
test('test plusMinus for sell', () => {
  let weiNumber1 = getBigIntWei(684);
  let weiNumber2 = getBigIntWei(40);

  let result = NumberHelper.plusOrMinus('sell', weiNumber1, weiNumber2);
  assert.stringEquals('644' + '0'.repeat(18), result.toString());
});
```

### plusMinus for sell, should return -1

This test case checks the `plusOrMinus` method of the `NumberHelper` class for a "sell" operation that results in a negative value. It asserts that the result is equal to the expected value.

```typescript
test('test plusMinus for sell, should return -1', () => {
  let weiNumber1 = getBigIntWei(35);
  let weiNumber2 = getBigIntWei(40);

  let result = NumberHelper.plusOrMinus('sell', weiNumber1, weiNumber2);
  assert.stringEquals('-5' + '0'.repeat(18), result.toString());
});
```

### uintPlusMinus for sell, should be 0

This test case checks the `uintPlusOrMinus` method of the `NumberHelper` class for a "sell" operation that results in a value less than or equal to 0. It asserts that the result is equal to the expected value.

```typescript
test('test uintPlusMinus for sell, should be 0', () => {
  let weiNumber1 = getBigIntWei(50);
  let weiNumber2 = getBigIntWei(400);

  let result = NumberHelper.uintPlusOrMinus('sell', weiNumber1, weiNumber2);
  assert.stringEquals('0', result.toString());
});
```