This configuration file is for the liminal.market.thegraph project. It is used to define the data sources, mappings, and event handlers for the project. The file is structured as follows:

```
specVersion: 0.0.4
schema:
  file: ./schema.graphql
```

The `specVersion` specifies the version of the configuration file format. The `schema` section points to the GraphQL schema file used for the project.

There are four data sources defined in the `dataSources` section:

1. LiminalMarket
2. aUSD
3. KYC
4. ServiceContract

Each data source has the following properties:

- `kind`: The type of data source (e.g., Ethereum).
- `name`: The name of the data source.
- `source`: The source of the data, including the ABI, contract address, and start block.
- `mapping`: The mapping information, including the kind, API version, language, entities, ABIs, event handlers, and the file containing the mapping code.
- `network`: The Ethereum network used for the data source (e.g., mumbai).

For example, the LiminalMarket data source is defined as follows:

```
- kind: ethereum
  name: LiminalMarket
  source:
    abi: LiminalMarket
    address: "0x0D8c3D4F4B29EfC3c54172803dA8a7f1CA2E6189"
    startBlock: 32211000
  mapping:
    kind: ethereum/events
    apiVersion: 0.0.6
    language: wasm/assemblyscript
    entities:
      - Order
      - OrderFailed
      - Role
    abis:
      - name: LiminalMarket
        file: ./abis/LiminalMarket.json
    eventHandlers:
      - event: OrderExecuted(string,address,string,uint256,uint256,uint256,string,uint256,uint256,uint256,address)
        handler: handleOrderExecuted
      - event: OrderFailed(address,string,uint256,string,address)
        handler: handleOrderFailed
      - event: TokenCreated(address,string)
        handler: handleTokenCreated
      - event: RoleGranted(indexed bytes32,indexed address,indexed address)
        handler: handleGrantRole
    file: ./src/liminalMarket.ts
  network: mumbai
```

The LiminalMarket data source has four event handlers:

1. `handleOrderExecuted`: Handles the `OrderExecuted` event.
2. `handleOrderFailed`: Handles the `OrderFailed` event.
3. `handleTokenCreated`: Handles the `TokenCreated` event.
4. `handleGrantRole`: Handles the `RoleGranted` event.

The other data sources (aUSD, KYC, and ServiceContract) have similar structures and event handlers.