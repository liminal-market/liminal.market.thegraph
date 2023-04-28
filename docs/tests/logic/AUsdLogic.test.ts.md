# AUsdLogic.test.ts

This is a test file for the AUsdLogic class, which is responsible for managing the balance of wallets in a liminal market. The tests cover various scenarios, such as setting the balance for a single wallet, updating the balance with different prices, and handling multiple wallets.

## Table of Contents

- [Test AUsdLogic](#test-ausdlogic)
  - [Test setBalance for 1 wallet, action fund](#test-setbalance-for-1-wallet-action-fund)
  - [Test setBalance for 1 wallet, calling setBalance 3 times with different prices, add balance and lower balance](#test-setbalance-for-1-wallet-calling-setbalance-3-times-with-different-prices-add-balance-and-lower-balance)
  - [Test setBalance for 2 wallets, calling setBalance 3 times with different prices on each wallet, add balance and lower balance](#test-setbalance-for-2-wallets-calling-setbalance-3-times-with-different-prices-on-each-wallet-add-balance-and-lower-balance)
- [validateStorage function](#validatestorage-function)

## Test AUsdLogic

This section contains tests for the AUsdLogic class.

### Test setBalance for 1 wallet, action fund

This test checks the `setBalance` method for a single wallet with the action "fund". It initializes the wallet with a balance of 150 and validates the storage.

### Test setBalance for 1 wallet, calling setBalance 3 times with different prices, add balance and lower balance

This test checks the `setBalance` method for a single wallet, calling it three times with different prices. It adds and lowers the balance and validates the storage after each call.

### Test setBalance for 2 wallets, calling setBalance 3 times with different prices on each wallet, add balance and lower balance

This test checks the `setBalance` method for two wallets, calling it three times with different prices on each wallet. It adds and lowers the balance for each wallet and validates the storage after each call.

## validateStorage function

This function is used to validate the storage after each test. It takes the following parameters:

- `liminalMarketInfoBalanceWei`: The balance of the liminal market in Wei.
- `walletBalanceWei`: The balance of the wallet in Wei.
- `walletHistoryAction`: The action performed on the wallet (e.g., 'Fund', 'OrderBuy', 'OrderSell', 'OrderExecuted').
- `timestamp`: The timestamp of the event.
- `transactionHash`: The transaction hash of the event.
- `walletAddress`: The wallet address.
- `balanceChange`: The change in balance after the event.
- `transactionHashes`: An array of transaction hashes related to the wallet.

The function checks if the storage values match the expected values after each test.