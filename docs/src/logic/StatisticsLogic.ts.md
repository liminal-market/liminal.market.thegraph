# StatisticsLogic.ts

This TypeScript file contains the `StatisticsLogic` class, which is responsible for handling the statistics related to orders and order failures in the Liminal Market. The class provides methods to load and update hourly and daily data for executed and failed orders, as well as methods to retrieve and create instances of data entities.

## Usage

To use the `StatisticsLogic` class, first import it and create an instance:

```typescript
import StatisticsLogic from "./StatisticsLogic";

const statisticsLogic = new StatisticsLogic();
```

Then, you can call the public methods to load and update statistics for executed and failed orders:

```typescript
statisticsLogic.loadOrderExecutedStatistics(order);
statisticsLogic.loadOrderFailedStatistics(orderFail);
```

## Methods

### loadOrderExecutedStatistics(order: Order): void

This method updates the statistics for an executed order. It calls the following private methods to load and update hourly and daily data:

- `loadOrderExecutedHourlyData(order)`
- `loadOrderExecutedHourlySymbolData(order)`
- `loadOrderExecutedDailyData(order)`
- `loadOrderExecutedDailySymbolData(order)`

### loadOrderFailedStatistics(orderFail: OrderFail): void

This method updates the statistics for a failed order. It calls the following private methods to load and update hourly and daily data:

- `loadOrderFailedHourlyData(orderFail)`
- `loadOrderFailedHourlySymbolData(orderFail)`
- `loadOrderFailedDailyData(orderFail)`
- `loadOrderFailedDailySymbolData(orderFail)`

### getId(prefix: string, timestamp: BigInt): string

This private method generates an ID for a data entity based on the given prefix and timestamp.

### getHourlyDataInstance(id: string): HourlyData

This private method retrieves an instance of `HourlyData` with the given ID. If the instance does not exist, it creates a new one with default values.

### getHourlySymbolDataInstance(id: string): HourlySymbolData

This private method retrieves an instance of `HourlySymbolData` with the given ID. If the instance does not exist, it creates a new one with default values.

### getDailyDataInstance(id: string): DailyData

This private method retrieves an instance of `DailyData` with the given ID. If the instance does not exist, it creates a new one with default values.

### getDailySymbolDataInstance(id: string): DailySymbolData

This private method retrieves an instance of `DailySymbolData` with the given ID. If the instance does not exist, it creates a new one with default values.

### setHourlyDataForOrderExecuted(data: HourlyData, order: Order): void

This private method updates the given `HourlyData` instance with the executed order's information.

### setHourlySymbolDataForOrderExecuted(data: HourlySymbolData, order: Order): void

This private method updates the given `HourlySymbolData` instance with the executed order's information.

### setDailyDataForOrderExecuted(data: DailyData, order: Order): void

This private method updates the given `DailyData` instance with the executed order's information.

### setDailySymbolDataForOrderExecuted(data: DailySymbolData, order: Order): void

This private method updates the given `DailySymbolData` instance with the executed order's information.

### setHourlyDataForOrderFailed(data: HourlyData, orderFail: OrderFail): void

This private method updates the given `HourlyData` instance with the failed order's information.

### setHourlySymbolDataForOrderFailed(data: HourlySymbolData, orderFail: OrderFail): void

This private method updates the given `HourlySymbolData` instance with the failed order's information.

### setDailyDataForOrderFailed(data: DailyData, orderFail: OrderFail): void

This private method updates the given `DailyData` instance with the failed order's information.

### setDailySymbolDataForOrderFailed(data: DailySymbolData, orderFail: OrderFail): void

This private method updates the given `DailySymbolData` instance with the failed order's information.