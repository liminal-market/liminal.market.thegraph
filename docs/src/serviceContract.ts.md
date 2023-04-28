# serviceContract.ts

This is a TypeScript code file that contains event handlers for the `ServiceContract` entity. The file imports necessary types and classes from other modules and defines three event handler functions: `handleServiceContractCreated`, `handleServiceContractUpdated`, and `handleNewOwnerOnServiceContract`. These functions are responsible for handling the respective events and updating the state of the `ServiceContract` entity accordingly.

## Table of Contents

- [Event Handlers](#event-handlers)
  - [handleServiceContractCreated](#handleservicecontractcreated)
  - [handleServiceContractUpdated](#handleservicecontractupdated)
  - [handleNewOwnerOnServiceContract](#handlenewowneronservicecontract)

## Event Handlers

### handleServiceContractCreated

This function is an event handler for the `ServiceContractCreated` event. It takes an instance of the `ServiceContractCreated` event as its parameter and creates a new `ServiceContract` entity using the `ServiceContractLogic` class.

**Parameters:**

- `event: ServiceContractCreated` - An instance of the `ServiceContractCreated` event.

**Example:**

```typescript
handleServiceContractCreated(event);
```

### handleServiceContractUpdated

This function is an event handler for the `ServiceContractUpdated` event. It takes an instance of the `ServiceContractUpdated` event as its parameter and updates an existing `ServiceContract` entity using the `ServiceContractLogic` class.

**Parameters:**

- `event: ServiceContractUpdated` - An instance of the `ServiceContractUpdated` event.

**Example:**

```typescript
handleServiceContractUpdated(event);
```

### handleNewOwnerOnServiceContract

This function is an event handler for the `NewOwnerOnServiceContract` event. It takes an instance of the `NewOwnerOnServiceContract` event as its parameter and updates the owner of an existing `ServiceContract` entity using the `ServiceContractLogic` class.

**Parameters:**

- `event: NewOwnerOnServiceContract` - An instance of the `NewOwnerOnServiceContract` event.

**Example:**

```typescript
handleNewOwnerOnServiceContract(event);
```

## Technical Concepts

- **Event Handlers:** Functions that are called when a specific event occurs. In this file, event handlers are used to handle events related to the `ServiceContract` entity.
- **ServiceContractLogic:** A class that contains the logic for creating, updating, and managing the `ServiceContract` entity. This class is imported from the `./logic/ServiceContractLogic` module and is used by the event handlers in this file.