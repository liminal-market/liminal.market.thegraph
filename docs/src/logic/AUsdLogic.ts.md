# AUsdLogic.ts

This is a TypeScript code file that contains the `AUsdLogic` class. The class is responsible for handling the balance setting logic for aUSD (a token) in the Liminal Market. It imports several helper classes and libraries to perform its functions.

## Table of Contents

- [Usage](#usage)
- [Methods](#methods)
  - [setBalance](#setbalance)
- [Helper Classes](#helper-classes)

## Usage

To use the `AUsdLogic` class, you need to import it into your project and create an instance of the class. Then, you can call the `setBalance` method to update the balance of a wallet in the Liminal Market.

```typescript
import AUsdLogic from "./AUsdLogic";

const aUsdLogic = new AUsdLogic();
aUsdLogic.setBalance(event);
```

## Methods

### setBalance

This method updates the balance of a wallet in the Liminal Market when a `BalanceSet` event is triggered.

```typescript
public setBalance(event: BalanceSet): void
```

**Parameters:**

- `event: BalanceSet` - The event object containing the balance set information.

**Description:**

The method first checks if the Liminal Market exists. If it does not exist, the method returns without performing any action. Then, it retrieves the wallet associated with the recipient of the event using the `WalletLogic` class. It also creates a new `WalletHistory` entry using the `WalletHistoryLogic` class.

Finally, it updates the wallet's balance and the Liminal Market's balance using the `storeBalanceSet` method from the `WalletLogic` class and saves the updated information.

## Helper Classes

The `AUsdLogic` class uses several helper classes to perform its functions:

- `WalletLogic`: A class that handles wallet-related operations, such as retrieving a wallet and storing balance set information.
- `NumberHelper`: A class that provides utility functions for working with numbers, such as converting between different formats.
- `DateHelper`: A class that provides utility functions for working with dates and timestamps.
- `WalletHistoryLogic`: A class that handles wallet history-related operations, such as adding a new wallet history entry.