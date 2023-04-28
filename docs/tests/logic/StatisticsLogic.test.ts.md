# StatisticsLogic.test.ts

This is a test file for the StatisticsLogic module. The tests are written using the matchstick-as testing framework. The file contains a single test suite that tests the functionality of the `handleOrderExecuted` function, which is responsible for updating the statistics of the Liminal Market when an order is executed.

## Test Suite: test StatisticsLogic

This test suite contains a single test case that tests the `handleOrderExecuted` function.

### Test Case: test statistics by executing order

This test case simulates the execution of an order and checks if the statistics of the Liminal Market are updated correctly. The test case performs the following steps:

1. Initialize the Liminal Market information.
2. Create a new SymbolLogic instance and a new ServiceContractLogic instance.
3. Create a fake order executed event with the following parameters:
   - symbol: 'AAPL'
   - tsl: 33
   - filledQty: 33
   - filledAvgPrice: 2
   - side: 'buy'
   - filledAt: 1666896054000 (Thursday, 27. October 2022 18:40:54)
   - serviceFee: 2
   - aUsdBalance: 1000
   - spender: WalletAddress
4. Call the `handleOrderExecuted` function with the fake order executed event.
5. Validate the HourlyData, HourlySymbolData, DailyData, and DailySymbolData entities to ensure that the statistics have been updated correctly.

### Helper Functions

The test file uses several helper functions from the `Util` module, such as `getBigIntWei`, `getOrderExecutedEvent`, `getServiceContractCreatedEvent`, and `initLiminalMarketInfo`. These functions are used to create instances of the required entities and events for testing purposes.

### Dependencies

The test file imports the following dependencies:

- `matchstick-as/assembly/index`: Provides the testing framework functions, such as `describe`, `test`, `beforeEach`, and `assert`.
- `@graphprotocol/graph-ts`: Provides the `BigInt` and `log` classes.
- `../../src/DateHelper`: Provides the `DateHelper` class for working with dates.
- `../../src/NumberHelper`: Provides the `NumberHelper` class for working with numbers.
- `../../src/logic/SymbolLogic`: Provides the `SymbolLogic` class for working with symbols.
- `../liminalMarket`: Provides the `handleOrderExecuted` function for handling order executed events.
- `../../src/logic/ServiceContractLogic`: Provides the `ServiceContractLogic` class for working with service contracts.

### Code Snippet

```typescript
describe('test StatisticsLogic', () => {

    beforeEach(() => {
        initLiminalMarketInfo();
    })

    test('test statistics by executing order', () => {
        // ... (test case implementation)
    })

})
```

### Notes

- The test case uses the `log.info` function to log information about the validation process. This can be helpful for debugging purposes.
- The test case uses the `assert` functions from the matchstick-as testing framework to check if the expected values match the actual values in the entities.