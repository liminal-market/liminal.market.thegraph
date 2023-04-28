# Liminal Market Logic Documentation

This documentation provides an overview of the Liminal Market logic folder, which contains TypeScript files responsible for various aspects of the Liminal Market system. Each file contains a class that manages specific logic related to the Liminal Market, such as handling orders, managing wallet balances, and updating statistics.

## Table of Contents

- [AUsdLogic.ts](#ausdlogic.ts)
- [LiminalMarketLogic.ts](#liminalmarketlogic.ts)
- [OrderAddLogic.ts](#orderaddlogic.ts)
- [OrderFailLogic.ts](#orderfaillogic.ts)
- [PositionLogic.ts](#positionlogic.ts)
- [ServiceContractLogic.ts](#servicecontractlogic.ts)
- [StatisticsLogic.ts](#statisticslogic.ts)
- [SymbolLogic.ts](#symbollogic.ts)
- [WalletHistoryLogic.ts](#wallethistorylogic.ts)
- [WalletLogic.ts](#walletlogic.ts)

## AUsdLogic.ts

This is a TypeScript code file that contains the `AUsdLogic` class. The class is responsible for handling the balance setting logic for aUSD (a token) in the Liminal Market. It imports several helper classes and libraries to perform its functions.

[Read more about AUsdLogic.ts](AUsdLogic.ts)

## LiminalMarketLogic.ts

This TypeScript file contains the `LiminalMarketLogic` class, which is responsible for managing the Liminal Market Info. The class provides methods to create, retrieve, and update the Liminal Market Info.

[Read more about LiminalMarketLogic.ts](LiminalMarketLogic.ts)

## OrderAddLogic.ts

This TypeScript file contains the `OrderAddLogic` class, which is responsible for handling the addition of orders in the Liminal Market. The class interacts with other logic classes such as `LiminalMarketLogic`, `WalletLogic`, `PositionLogic`, `SymbolLogic`, and `ServiceContractLogic` to perform various operations related to orders.

[Read more about OrderAddLogic.ts](OrderAddLogic.ts)

## OrderFailLogic.ts

This is a TypeScript code file that contains the `OrderFailLogic` class. This class is responsible for handling failed orders in the Liminal Market system. It provides methods to add failed orders and update related information such as wallet, service contract, and liminal market info.

[Read more about OrderFailLogic.ts](OrderFailLogic.ts)

## PositionLogic.ts

The `PositionLogic.ts` file is a TypeScript code file that contains the `PositionLogic` class. This class is responsible for managing and updating positions related to a specific wallet and symbol. The class contains a single method, `getOrCreatePosition`, which either retrieves an existing position or creates a new one if it doesn't exist.

[Read more about PositionLogic.ts](PositionLogic.ts)

## ServiceContractLogic.ts

This TypeScript file contains the `ServiceContractLogic` class, which is responsible for managing the logic related to service contracts. The class provides methods for creating, updating, and retrieving service contracts, as well as handling events related to orders and service contract ownership.

[Read more about ServiceContractLogic.ts](ServiceContractLogic.ts)

## StatisticsLogic.ts

This TypeScript file contains the `StatisticsLogic` class, which is responsible for handling the statistics related to orders and order failures in the Liminal Market. The class provides methods to load and update hourly and daily data for executed and failed orders, as well as methods to retrieve and create instances of data entities.

[Read more about StatisticsLogic.ts](StatisticsLogic.ts)

## SymbolLogic.ts

This is a TypeScript code file that contains the `SymbolLogic` class. This class is responsible for managing the logic related to symbols in the Liminal Market application. It provides methods for creating, retrieving, and updating symbol information.

[Read more about SymbolLogic.ts](SymbolLogic.ts)

## WalletHistoryLogic.ts

This is a TypeScript code file that contains the `WalletHistoryLogic` class. This class is responsible for managing wallet history data, including adding new wallet history entries and retrieving action names based on action codes.

[Read more about WalletHistoryLogic.ts](WalletHistoryLogic.ts)

## WalletLogic.ts

`WalletLogic.ts` is a TypeScript class that provides methods for managing wallet-related operations. It is responsible for creating new wallets, loading existing wallets, updating wallet balances, and storing order execution details. This class is part of a larger project that uses The Graph Protocol.

[Read more about WalletLogic.ts](WalletLogic.ts)

---

[View the repository on GitHub](https://github.com/liminal-market/liminal.market.thegraph/src/logic)