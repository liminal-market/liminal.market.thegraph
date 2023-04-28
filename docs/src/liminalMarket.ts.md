# liminalMarket.ts

This is a TypeScript code file that contains event handlers for the LiminalMarket smart contract. The file imports necessary classes and functions from other modules and defines four event handlers: `handleGrantRole`, `handleOrderExecuted`, `handleOrderFailed`, and `handleTokenCreated`. These event handlers are responsible for processing events emitted by the LiminalMarket smart contract and updating the relevant data in the application.

## Event Handlers

### handleGrantRole(event: RoleGranted)

This event handler is triggered when a `RoleGranted` event is emitted by the LiminalMarket smart contract. It creates a new `Role` object and sets its properties based on the event data. The `Role` object is then saved to the data store.

**Parameters:**

- `event`: A `RoleGranted` event object containing the role, account, and sender information.

### handleOrderExecuted(event: OrderExecuted)

This event handler is triggered when an `OrderExecuted` event is emitted by the LiminalMarket smart contract. It processes the executed order by creating a new `Order` object using the `OrderAddLogic` class and updating the statistics using the `StatisticsLogic` class.

**Parameters:**

- `event`: An `OrderExecuted` event object containing the executed order information.

### handleOrderFailed(event: OrderFailed)

This event handler is triggered when an `OrderFailed` event is emitted by the LiminalMarket smart contract. It processes the failed order by creating a new `OrderFail` object using the `OrderFailLogic` class and updating the statistics using the `StatisticsLogic` class.

**Parameters:**

- `event`: An `OrderFailed` event object containing the failed order information.

### handleTokenCreated(event: TokenCreated)

This event handler is triggered when a `TokenCreated` event is emitted by the LiminalMarket smart contract. It creates a new token using the `SymbolLogic` class with the provided symbol, token address, and timestamp.

**Parameters:**

- `event`: A `TokenCreated` event object containing the token symbol and token address information.

## Example Usage

```typescript
import { LiminalMarket } from "./liminalMarket";

// Instantiate the event handlers
const liminalMarket = new LiminalMarket();

// Process a RoleGranted event
liminalMarket.handleGrantRole(roleGrantedEvent);

// Process an OrderExecuted event
liminalMarket.handleOrderExecuted(orderExecutedEvent);

// Process an OrderFailed event
liminalMarket.handleOrderFailed(orderFailedEvent);

// Process a TokenCreated event
liminalMarket.handleTokenCreated(tokenCreatedEvent);
```

## Technical Concepts

- **Event handling**: This code file demonstrates the use of event handlers to process events emitted by a smart contract. Event handlers are functions that are triggered when a specific event occurs, allowing the application to react to changes in the smart contract state.
- **Data store**: The event handlers in this file interact with a data store to save and update information related to roles, orders, and tokens. This data store can be a database or any other storage system used by the application.