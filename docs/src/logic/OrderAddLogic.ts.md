# OrderAddLogic.ts

This TypeScript file contains the `OrderAddLogic` class, which is responsible for handling the addition of orders in the Liminal Market. The class interacts with other logic classes such as `LiminalMarketLogic`, `WalletLogic`, `PositionLogic`, `SymbolLogic`, and `ServiceContractLogic` to perform various operations related to orders.

## Table of Contents

- [Class: OrderAddLogic](#class-orderaddlogic)
  - [Constructor](#constructor)
  - [Method: addOrder](#method-addorder)
  - [Method: storeOrder](#method-storeorder)

## Class: OrderAddLogic

### Constructor

The constructor initializes instances of the following classes:

- `LiminalMarketLogic`
- `WalletLogic`
- `PositionLogic`
- `SymbolLogic`
- `ServiceContractLogic`

### Method: addOrder

```typescript
public addOrder(event: OrderExecuted): Order
```

This method takes an `OrderExecuted` event as input and returns an `Order` object. It performs the following operations:

1. Retrieves the `LiminalMarketInfo` object.
2. Retrieves the `Wallet` object associated with the recipient of the event.
3. Retrieves the `ServiceContract` object associated with the spender of the event.
4. Stores the order using the `storeOrder` method.
5. Retrieves or creates a `Position` object associated with the wallet and order.
6. Stores the symbol information using the `SymbolLogic.store` method.
7. Updates the wallet with the executed order using the `WalletLogic.storeOrderExecuted` method.
8. Stores the transaction in the `LiminalMarketLogic` object.
9. Adds the order to the service contract using the `ServiceContractLogic.addOrder` method.

### Method: storeOrder

```typescript
private storeOrder(event: OrderExecuted, walletId: string, serviceContractId: string): Order
```

This private method takes an `OrderExecuted` event, a wallet ID, and a service contract ID as input and returns an `Order` object. It performs the following operations:

1. Creates a new `Order` object with the given order ID.
2. Sets the daily and hourly IDs based on the `filledAt` timestamp of the event.
3. Sets the order properties using the event parameters.
4. Calculates the cost of the order in Wei and decimal format.
5. Associates the order with the wallet and service contract.
6. Saves the order and returns it.