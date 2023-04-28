# kyc.ts

`kyc.ts` is a TypeScript code file that handles the account validation process in a Know Your Customer (KYC) system. The file imports the `Account` schema from the generated schema file and the `AccountValidated` event from the generated KYC contract. It defines a function `handleAccountValidated` that is triggered when an account is validated.

## Usage

To use this class, you need to import the `handleAccountValidated` function and call it when the `AccountValidated` event is emitted.

```typescript
import { handleAccountValidated } from './kyc.ts';

// Call the function when the AccountValidated event is emitted
handleAccountValidated(event);
```

## Function

### handleAccountValidated

This function is triggered when an account is validated. It creates a new `Account` instance using the transaction hash and updates its properties with the event parameters. Finally, it saves the updated account instance.

#### Parameters

- `event: AccountValidated`: The `AccountValidated` event object containing the account validation information.

#### Properties

- `accountId`: The unique identifier of the account.
- `walletAddress`: The wallet address associated with the account, represented as a hexadecimal string.

## Technical Concepts

### AccountValidated Event

The `AccountValidated` event is emitted when an account is validated in the KYC system. It contains the following properties:

- `accountId`: The unique identifier of the account.
- `walletAddress`: The wallet address associated with the account.

### Account Schema

The `Account` schema is a generated schema that represents an account in the KYC system. It has the following properties:

- `accountId`: The unique identifier of the account.
- `walletAddress`: The wallet address associated with the account.

## Code

```typescript
import { Account } from "../generated/schema";
import { AccountValidated } from "../generated/KYC/KYC";

export function handleAccountValidated(event: AccountValidated): void {
  let av = new Account(event.transaction.hash.toHex());
  av.accountId = event.params.accountId;
  av.walletAddress = event.params.walletAddress.toHexString();
  av.save();
}
```