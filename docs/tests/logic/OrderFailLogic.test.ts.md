# OrderFailLogic.test.ts

This is a test file for the `OrderFailLogic` class, which is responsible for handling failed orders in a trading system. The tests in this file ensure that the logic for adding failed orders and updating related entities is working correctly.

## Table of Contents

- [Test OrderFailLogic](#test-orderfaillogic)
  - [Before Each Test](#before-each-test)
  - [Test Cases](#test-cases)
    - [Test 1: One Call to handleOrderFailed](#test-1-one-call-to-handleorderfailed)
    - [Test 2: Two Calls to handleOrderFailed](#test-2-two-calls-to-handleorderfailed)
- [Helper Function: createOrderFailedAndValidate](#helper-function-createorderfailedandvalidate)

## Test OrderFailLogic

This section describes the tests for the `OrderFailLogic` class.

### Before Each Test

Before each test, the store is cleared and the initial Liminal Market Info is set up. A new `ServiceContract` is created using the `ServiceContractLogic` class.

```typescript
beforeEach(() => {
    clearStore();
    initLiminalMarketInfo();

    let serviceContractEvent = getServiceContractCreatedEvent(WalletAddress2);
    let serviceContractLogic = new ServiceContractLogic();
    serviceContractLogic.create(serviceContractEvent);
})
```

### Test Cases

#### Test 1: One Call to handleOrderFailed

This test case checks if a single call to `handleOrderFailed` correctly updates the `OrderFail`, `Spender`, and `LiminalMarketInfo` entities.

```typescript
test('testing one call to handleOrderFailed, should validate orderFail, spender, liminalMarketInfo is updated', () => {
    let symbol = 'AAPL';
    let message = 'Order to old';
    let buyingPower = BigInt.fromI64(1006890006700001);
    let expectedFailCount = '1';
    createOrderFailedAndValidate(symbol, message, buyingPower, expectedFailCount)
})
```

#### Test 2: Two Calls to handleOrderFailed

This test case checks if two calls to `handleOrderFailed` correctly update the `OrderFail`, `Spender`, and `LiminalMarketInfo` entities.

```typescript
test('testing 2 calls to handleOrderFailed, should validate orderFail, spender, liminalMarketInfo is updated', () => {
    let symbol = 'AAPL';
    let message = 'Order to old';
    let buyingPower = BigInt.fromI64(1006890006700001);
    createOrderFailedAndValidate(symbol, message, buyingPower, '1');

    symbol = 'MSFT';
    message = 'Could not execute';
    buyingPower = BigInt.fromI64(64687333);
    createOrderFailedAndValidate(symbol, message, buyingPower, '2');
})
```

## Helper Function: createOrderFailedAndValidate

This helper function creates an `OrderFailedEvent`, adds the failed order using the `OrderFailLogic` class, and validates the updated entities.

```typescript
function createOrderFailedAndValidate(symbol: string, message: string, buyingPower: BigInt, expectedFailCount: string): void {
    let orderFailedEvent = getOrderFailedEvent(WalletAddress, symbol, message, buyingPower, WalletAddress2);

    let orderLogic = new OrderFailLogic();
    orderLogic.addFail(orderFailedEvent);

    let serviceContractId = orderFailedEvent.params.spender.toHex();
    let id = orderFailedEvent.transaction.hash.toHex();
    assert.fieldEquals('OrderFail', id, 'symbol', symbol);
    assert.fieldEquals('OrderFail', id, 'message', message);
    assert.fieldEquals('OrderFail', id, 'buyingPowerWei', buyingPower.toString());
    assert.fieldEquals('OrderFail', id, 'buyingPower', NumberHelper.getDecimal(buyingPower).toString());
    assert.fieldEquals('OrderFail', id, 'wallet', WalletAddress.toHex());
    assert.fieldEquals('OrderFail', id, 'serviceContract', serviceContractId);
    assert.fieldEquals('OrderFail', id, 'created', DateHelper.getJsTimestamp(orderFailedEvent.block.timestamp).toString());

    assert.fieldEquals('LiminalMarketInfo', '1', 'orderFailedCount', expectedFailCount);

    assert.fieldEquals('ServiceContract', serviceContractId, 'txCount', expectedFailCount);
    assert.fieldEquals('ServiceContract', serviceContractId, 'orderFailedCount', expectedFailCount);
}
```