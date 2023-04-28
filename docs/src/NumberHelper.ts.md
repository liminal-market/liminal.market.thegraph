# NumberHelper.ts

`NumberHelper.ts` is a TypeScript utility class that provides helper methods for performing arithmetic operations on BigInt and BigDecimal data types. These methods are useful when dealing with large numbers and precise calculations in the context of the Graph Protocol.

## Usage Examples

Here are some examples of how to use the `NumberHelper` class:

```typescript
import NumberHelper from "./NumberHelper";

// Example 1: Convert a BigInt value to a BigDecimal
let bigIntValue = BigInt.fromI32(1000000000000000000);
let bigDecimalValue = NumberHelper.getDecimal(bigIntValue);
console.log(bigDecimalValue.toString()); // Output: "1"

// Example 2: Multiply two BigInt values
let value1 = BigInt.fromI32(500000000000000000);
let value2 = BigInt.fromI32(2000000000000000000);
let result = NumberHelper.times(value1, value2);
console.log(result.toString()); // Output: "1000000000000000000"
```

## Methods

### getDecimal(value: BigInt): BigDecimal

This method takes a `BigInt` value as input and returns its equivalent `BigDecimal` value. It is useful when you need to perform precise calculations with large numbers.

**Parameters:**

- `value`: A `BigInt` value that you want to convert to a `BigDecimal`.

### times(v1: BigInt, v2: BigInt): BigInt

This method takes two `BigInt` values as input and returns their product as a `BigInt`. It performs the multiplication operation and then divides the result by 10^18 to maintain precision.

**Parameters:**

- `v1`: The first `BigInt` value.
- `v2`: The second `BigInt` value.

### uintPlusOrMinus(side: string, v1: BigInt, v2: BigInt): BigInt

This method takes a string `side`, and two `BigInt` values as input. It performs either addition or subtraction based on the `side` value and returns the result as a `BigInt`. If the result is less than or equal to 0, it returns 0.

**Parameters:**

- `side`: A string value, either 'sell' or 'buy'.
- `v1`: The first `BigInt` value.
- `v2`: The second `BigInt` value.

### plusOrMinus(side: string, v1: BigInt, v2: BigInt): BigInt

This method takes a string `side`, and two `BigInt` values as input. It performs either addition or subtraction based on the `side` value and returns the result as a `BigInt`.

**Parameters:**

- `side`: A string value, either 'sell' or 'buy'.
- `v1`: The first `BigInt` value.
- `v2`: The second `BigInt` value.