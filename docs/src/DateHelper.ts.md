# DateHelper.ts

DateHelper.ts is a TypeScript utility class that provides helper methods for working with dates and timestamps. These methods are particularly useful when dealing with BigInt timestamps and converting them to JavaScript Date objects, ISO strings, or other formats.

## Usage Examples

Here are some examples of how to use the DateHelper class:

```typescript
import DateHelper from './DateHelper';

// Convert a BigInt timestamp to a JavaScript timestamp
const jsTimestamp = DateHelper.getJsTimestamp(BigInt(1629459200));

// Convert a BigInt timestamp to an ISO string
const isoString = DateHelper.toIso(BigInt(1629459200000));

// Get the day ID of a BigInt timestamp
const dayId = DateHelper.getDayId(BigInt(1629459200000));

// Get the hour ID of a BigInt timestamp
const hourId = DateHelper.getHourId(BigInt(1629459200000));
```

## Methods

### getJsTimestamp(timestamp: BigInt): BigInt

This method takes a BigInt timestamp and returns a JavaScript timestamp by multiplying the input timestamp by 1000.

#### Parameters

- `timestamp`: A BigInt timestamp.

### toIso(timestampInMilliseconds: BigInt): string

This method takes a BigInt timestamp in milliseconds and returns an ISO string representation of the date.

#### Parameters

- `timestampInMilliseconds`: A BigInt timestamp in milliseconds.

### getDayId(timestampInMilliseconds: BigInt): BigInt

This method takes a BigInt timestamp in milliseconds and returns a BigInt day ID, which is the UTC timestamp at the start of the day (00:00:00).

#### Parameters

- `timestampInMilliseconds`: A BigInt timestamp in milliseconds.

### getHourId(timestampInMilliseconds: BigInt): BigInt

This method takes a BigInt timestamp in milliseconds and returns a BigInt hour ID, which is the UTC timestamp at the start of the hour (00 minutes and 00 seconds).

#### Parameters

- `timestampInMilliseconds`: A BigInt timestamp in milliseconds.

## Technical Concepts

- BigInt: BigInt is a built-in object in JavaScript that provides a way to represent whole numbers larger than 2^53 - 1, which is the largest number JavaScript can reliably represent with the Number primitive. In this utility class, BigInt is used to handle large timestamp values.

- UTC: Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. In this utility class, UTC is used to ensure consistent date and time calculations across different time zones.