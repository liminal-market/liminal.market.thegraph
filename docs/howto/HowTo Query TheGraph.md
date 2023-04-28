# How to Query TheGraph using GraphQL for Liminal Market

## Introduction

This guide will walk you through querying TheGraph using GraphQL for the Liminal Market schema. You can perform live queries at [https://thegraph.com/hosted-service/subgraph/liminal-market/liminal-market-mumbai](https://thegraph.com/hosted-service/subgraph/liminal-market/liminal-market-mumbai).

## Step-by-Step Instructions

### Step 1: Access the GraphQL Playground

Visit the [GraphQL Playground](https://thegraph.com/hosted-service/subgraph/liminal-market/liminal-market-mumbai) for Liminal Market.

### Step 2: Write a GraphQL Query

In the GraphQL Playground, write a query to fetch the data you need. For example, to fetch the first 5 `LiminalMarketInfo` entities, you can write the following query:

```graphql
query {
  liminalMarketInfos(first: 5) {
    id
    txCount
    orderExecutedCount
    orderFailedCount
    spenderCount
    walletCount
    symbolCount
    balanceWei
    balance
    valueWei
    value
    tslWei
    tsl
    lastOrderAt
  }
}
```

### Step 3: Run the Query

Click the "Play" button in the GraphQL Playground to execute the query. The results will be displayed in the right-hand panel.

### Step 4: Customize the Query

You can customize the query to fetch specific data or filter the results. For example, to fetch a specific `Wallet` entity by its `id`, you can write the following query:

```graphql
query {
  wallet(id: "wallet_id_here") {
    id
    balanceWei
    balance
    lastOrderAt
    updated
    txCount
  }
}
```

Replace `wallet_id_here` with the actual wallet ID.

### Step 5: Fetch Nested Data

You can also fetch nested data by including the related entities in your query. For example, to fetch the first 5 `Order` entities along with their associated `Wallet` and `Symbol` data, you can write the following query:

```graphql
query {
  orders(first: 5) {
    id
    symbol {
      id
      contract
      pricePerShareWei
      pricePerShare
    }
    wallet {
      id
      balanceWei
      balance
    }
    side
    tslWei
    tsl
    filledQtyWei
    filledQty
    filledAvgPriceWei
    filledAvgPrice
    filledAt
  }
}
```

### Step 6: Use Pagination

You can use pagination to fetch more data or navigate through the results. For example, to fetch the next 5 `LiminalMarketInfo` entities after the first 5, you can write the following query:

```graphql
query {
  liminalMarketInfos(first: 5, skip: 5) {
    id
    txCount
    orderExecutedCount
    orderFailedCount
    spenderCount
    walletCount
    symbolCount
    balanceWei
    balance
    valueWei
    value
    tslWei
    tsl
    lastOrderAt
  }
}
```

This query will skip the first 5 entities and fetch the next 5.

## Conclusion

Now you know how to query TheGraph using GraphQL for the Liminal Market schema. You can use these steps to create custom queries and fetch the data you need from the Liminal Market subgraph.