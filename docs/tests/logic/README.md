# Liminal Market Tests Documentation

This documentation provides an overview of the test files in the `tests/logic` folder of the Liminal Market repository. Each test file is responsible for testing a specific aspect of the system, ensuring that the logic and functionality are working as expected.

## Table of Contents

- [AUsdLogic.test.ts](#ausdlogic.test.ts)
- [LiminalMarketLogic.test.ts](#liminalmarketlogic.test.ts)
- [OrderAddLogic.test.ts](#orderaddlogic.test.ts)
- [OrderFailLogic.test.ts](#orderfaillogic.test.ts)
- [StatisticsLogic.test.ts](#statisticslogic.test.ts)
- [SymbolLogic.test.ts](#symbollogic.test.ts)

## AUsdLogic.test.ts

This is a test file for the AUsdLogic class, which is responsible for managing the balance of wallets in a liminal market. The tests cover various scenarios, such as setting the balance for a single wallet, updating the balance with different prices, and handling multiple wallets.

[Read the full documentation for AUsdLogic.test.ts](AUsdLogic.test.ts)

## LiminalMarketLogic.test.ts

This is a test file for the LiminalMarketLogic class, which is responsible for managing the logic of the Liminal Market. The tests in this file ensure that the LiminalMarketLogic class functions as expected.

[Read the full documentation for LiminalMarketLogic.test.ts](LiminalMarketLogic.test.ts)

## OrderAddLogic.test.ts

This is a test file for the OrderAddLogic module, which is responsible for handling order execution events in the Liminal Market. The tests are written using the Matchstick testing framework for AssemblyScript.

[Read the full documentation for OrderAddLogic.test.ts](OrderAddLogic.test.ts)

## OrderFailLogic.test.ts

This is a test file for the `OrderFailLogic` class, which is responsible for handling failed orders in a trading system. The tests in this file ensure that the logic for adding failed orders and updating related entities is working correctly.

[Read the full documentation for OrderFailLogic.test.ts](OrderFailLogic.test.ts)

## StatisticsLogic.test.ts

This is a test file for the StatisticsLogic module. The tests are written using the matchstick-as testing framework. The file contains a single test suite that tests the functionality of the `handleOrderExecuted` function, which is responsible for updating the statistics of the Liminal Market when an order is executed.

[Read the full documentation for StatisticsLogic.test.ts](StatisticsLogic.test.ts)

## SymbolLogic.test.ts

This is a test file for the `SymbolLogic` class, which is responsible for handling the logic related to symbols in the Liminal Market. The tests in this file ensure that the `SymbolLogic` class functions as expected when handling token creation and storing multiple orders.

[Read the full documentation for SymbolLogic.test.ts](SymbolLogic.test.ts)

---

[View the full repository on GitHub](https://github.com/liminal-market/liminal.market.thegraph/tests/logic)