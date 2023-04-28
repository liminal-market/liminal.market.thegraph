# ServiceContractLogic.ts

This TypeScript file contains the `ServiceContractLogic` class, which is responsible for managing the logic related to service contracts. The class provides methods for creating, updating, and retrieving service contracts, as well as handling events related to orders and service contract ownership.

## Table of Contents

- [Class: ServiceContractLogic](#class-servicecontractlogic)
  - [Method: addFail](#method-addfail)
  - [Method: addOrder](#method-addorder)
  - [Method: create](#method-create)
  - [Method: update](#method-update)
  - [Method: newOwner](#method-newowner)
  - [Method: getServiceContract](#method-getservicecontract)

## Class: ServiceContractLogic

### Method: addFail

```typescript
public addFail(event: OrderFailed): void
```

This method updates the service contract's `orderFailedCount` and `txCount` when an `OrderFailed` event is emitted. It takes an `OrderFailed` event as a parameter.

### Method: addOrder

```typescript
public addOrder(event: OrderExecuted, order: Order): void
```

This method updates the service contract's `totalServiceFeeWei`, `totalServiceFee`, `orderExecutedCount`, and `txCount` when an `OrderExecuted` event is emitted. It also updates the `ServiceContractByDay` entity with the new service fee and order. It takes an `OrderExecuted` event and an `Order` object as parameters.

### Method: create

```typescript
public create(event: ServiceContractCreated): void
```

This method creates a new `ServiceContract` entity when a `ServiceContractCreated` event is emitted. It takes a `ServiceContractCreated` event as a parameter.

### Method: update

```typescript
public update(event: ServiceContractUpdated): void
```

This method updates an existing `ServiceContract` entity when a `ServiceContractUpdated` event is emitted. It takes a `ServiceContractUpdated` event as a parameter.

### Method: newOwner

```typescript
public newOwner(event: NewOwnerOnServiceContract): void
```

This method updates the owner of a `ServiceContract` entity when a `NewOwnerOnServiceContract` event is emitted. It takes a `NewOwnerOnServiceContract` event as a parameter.

### Method: getServiceContract

```typescript
public getServiceContract(spender: Address): ServiceContract
```

This method retrieves a `ServiceContract` entity by its spender address. It takes an `Address` object as a parameter and returns a `ServiceContract` object.