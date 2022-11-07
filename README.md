# liminal.market.thegraph

For documentation, check out our [Documentation repository](https://github.com/liminal-market/liminal.market.docs)

## LiminalMarketInfo
Gives you general information of what value is in the system.

## Statistics
There are 4 objects that you can use for that gives some statistical movements in the system.

### Daily and hourly on LiminalMarket
Daily & hourly data give the overall status of the system at each time. The data stored represents the last 
transaction that happened in that day or hour. 
- DailyData
- HourlyData
- 
### Daily and hourly on a Symbol
Daily & hourly data give the overall status of a specific symbol. The data stored represents the last
transaction that happened in that day or hour.
- DailySymbolData
- HourlySymbolData

## Time units
All time units are stored a milliseconds from 1. jan 1970. 
Any block.timestamp that is stored in the system is converted to time with milliseconds before storing it.

## Running tests
To set up unit testing, check out https://thegraph.com/docs/en/developing/unit-testing-framework/
If you are using Windows, you need to run through WSL. 

Go to path on c: driver, for example /mnt/c/users/{username}/source/repos/liminal.market.thegraph
Might need to install node first: nvm install node
Run: npm run test

