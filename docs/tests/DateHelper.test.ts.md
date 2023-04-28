# DateHelper.test.ts

This is a test file for the `DateHelper` class, which provides utility functions for handling date and time operations. The tests are written using the `matchstick-as` testing framework and the `@graphprotocol/graph-ts` library.

## Table of Contents

- [Test Suite: DateHelper](#test-suite-datehelper)
  - [Test: getJsTimestamp](#test-getjstimestamp)
  - [Test: getHourId](#test-gethourid)
  - [Test: getDayId](#test-getdayid)

## Test Suite: DateHelper

This test suite contains tests for the `DateHelper` class.

### Test: getJsTimestamp

This test checks the `getJsTimestamp` method, which converts a given BigInt timestamp to a JavaScript timestamp.

Example:

```typescript
let timestamp = BigInt.fromI64(1666616400);
let jsTimestamp = DateHelper.getJsTimestamp(timestamp);
assert.stringEquals('1666616400000', jsTimestamp.toString());
```

### Test: getHourId

This test checks the `getHourId` method, which returns the hour ID for a given BigInt timestamp. The hour ID is the timestamp of the start of the hour.

Examples:

```typescript
let dt = BigInt.fromI64(1666616500000); // Monday, 24. October 2022 13:01:40
let hourId = DateHelper.getHourId(dt);
assert.stringEquals('1666616400000', hourId.toString()); // Monday, 24. October 2022 13:00:00

dt = BigInt.fromI64(1666619990000); // Monday, 24. October 2022 13:59:50
hourId = DateHelper.getHourId(dt);
assert.stringEquals('1666616400000', hourId.toString()); // Monday, 24. October 2022 13:00:00

dt = BigInt.fromI64(1766629990000); // Thursday, 25. December 2025 2:33:10
hourId = DateHelper.getHourId(dt);
assert.stringEquals('1766628000000', hourId.toString()); // Thursday, 25. December 2025 2:00:00
```

### Test: getDayId

This test checks the `getDayId` method, which returns the day ID for a given BigInt timestamp. The day ID is the timestamp of the start of the day.

Examples:

```typescript
let dt = BigInt.fromI64(1666700540000); // Tuesday, 25. October 2022 12:22:20
let dayId = DateHelper.getDayId(dt);
assert.stringEquals('1666656000000', dayId.toString()); // Tuesday, 25. October 2022 0:00:00

dt = BigInt.fromI64(1641081599000); // Saturday, 1. January 2022 23:59:59
dayId = DateHelper.getDayId(dt);
assert.stringEquals('1640995200000', dayId.toString()); // Saturday, 1. January 2022 0:00:00
```
