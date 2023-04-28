# Util.test.ts

The `Util.test.ts` file is a test file for the `Util` class, which contains utility functions for handling and converting values related to Wei (the smallest unit of Ether). This file uses the `matchstick-as` testing framework to define and run tests for the `Util` class.

## Table of Contents

- [Test Util class](#test-util-class)
  - [Test: make sure amount is correct](#test-make-sure-amount-is-correct)
- [Imported Functions and Classes](#imported-functions-and-classes)

## Test Util class

This section describes the tests for the `Util` class.

### Test: make sure amount is correct

This test checks if the `getBigIntWei` function correctly converts a given amount to its BigIntWei representation.

Example:

```typescript
import {getBigIntWei} from "./Util";

let amount = 150;
console.log(getBigIntWei(amount).toString()); // Output: "150000000000000000000"
```

#### getBigIntWei(amount: i32): BigInt

This function takes an integer `amount` as input and returns its BigIntWei representation.

- `amount`: The integer value to be converted to BigIntWei.

## Imported Functions and Classes

The following functions and classes are imported from external libraries:

- `describe`, `test`, `assert`: These functions are imported from the `matchstick-as/assembly/index` module and are used to define and run tests in the `matchstick-as` testing framework.
- `getBigIntWei`: This function is imported from the `./Util` module and is used to convert an integer value to its BigIntWei representation.