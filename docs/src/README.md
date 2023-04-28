# Liminal Market Documentation

This documentation provides an in-depth overview of the Liminal Market system. The system is responsible for handling various aspects such as balance setting for a custom currency, account validation in a KYC system, event handlers for the LiminalMarket smart contract, and utility classes for working with dates and numbers.

## Table of Contents

- [ausd.ts](#ausd.ts)
- [DateHelper.ts](#DateHelper.ts)
- [kyc.ts](#kyc.ts)
- [liminalMarket.ts](#liminalMarket.ts)
- [NumberHelper.ts](#NumberHelper.ts)
- [serviceContract.ts](#serviceContract.ts)
- [logic](#logic)

## ausd.ts

This is a TypeScript code file that handles the balance setting for aUSD (a custom currency). The file imports the `BalanceSet` event from the generated aUSD contract and the `AUsdLogic` class from the `AUsdLogic` module. It exports a single function, `handleBalanceSet`, which takes an event of type `BalanceSet` and sets the balance using the `AUsdLogic` class.

[Read more about ausd.ts](ausd.ts)

## DateHelper.ts

DateHelper.ts is a TypeScript utility class that provides helper methods for working with dates and timestamps. These methods are particularly useful when dealing with BigInt timestamps and converting them to JavaScript Date objects, ISO strings, or other formats.

[Read more about DateHelper.ts](DateHelper.ts)

## kyc.ts

`kyc.ts` is a TypeScript code file that handles the account validation process in a Know Your Customer (KYC) system. The file imports the `Account` schema from the generated schema file and the `AccountValidated` event from the generated KYC contract. It defines a function `handleAccountValidated` that is triggered when an account is validated.

[Read more about kyc.ts](kyc.ts)

## liminalMarket.ts

This is a TypeScript code file that contains event handlers for the LiminalMarket smart contract. The file imports necessary classes and functions from other modules and defines four event handlers: `handleGrantRole`, `handleOrderExecuted`, `handleOrderFailed`, and `handleTokenCreated`. These event handlers are responsible for processing events emitted by the LiminalMarket smart contract and updating the relevant data in the application.

[Read more about liminalMarket.ts](liminalMarket.ts)

## NumberHelper.ts

`NumberHelper.ts` is a TypeScript utility class that provides helper methods for performing arithmetic operations on BigInt and BigDecimal data types. These methods are useful when dealing with large numbers and precise calculations in the context of the Graph Protocol.

[Read more about NumberHelper.ts](NumberHelper.ts)

## serviceContract.ts

This is a TypeScript code file that contains event handlers for the `ServiceContract` entity. The file imports necessary types and classes from other modules and defines three event handler functions: `handleServiceContractCreated`, `handleServiceContractUpdated`, and `handleNewOwnerOnServiceContract`. These functions are responsible for handling the respective events and updating the state of the `ServiceContract` entity accordingly.

[Read more about serviceContract.ts](serviceContract.ts)

## logic

This documentation provides an overview of the Liminal Market logic folder, which contains TypeScript files responsible for various aspects of the Liminal Market system. Each file contains a class that manages specific logic related to the Liminal Market, such as handling orders, managing wallet balances, and updating statistics.

[Read more about logic](logic)

---

[View the repository on GitHub](https://github.com/liminal-market/liminal.market.thegraph/src)