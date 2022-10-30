import {assert, describe, test} from "matchstick-as/assembly/index";
import LiminalMarketLogic from "../../src/logic/LiminalMarketLogic";
import {BigInt} from "@graphprotocol/graph-ts";
import {getFakeOrder, initLiminalMarketInfo, WalletAddress} from "../Util";
import SymbolLogic from "../../src/logic/SymbolLogic";

describe('test liminalMarketLogic', () => {

    test('Test value in LiminalMarket', () => {
        let filledAt = BigInt.fromI64(100);
        let symbol1 = 'AAPL';
        let symbol2 = 'MSFT';
        let symbol3 = 'TSLA';

        initLiminalMarketInfo();

        let symbolLogic = new SymbolLogic();
        symbolLogic.create(symbol1, WalletAddress, filledAt);
        symbolLogic.create(symbol2, WalletAddress, filledAt);
        symbolLogic.create(symbol3, WalletAddress, filledAt);

        let liminalMarketLogic = new LiminalMarketLogic();
        let liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo();

        liminalMarketLogic.storeTransaction(liminalMarketInfo, filledAt)

        assert.fieldEquals('LiminalMarketInfo', '1', 'value', '0')

        let order = getFakeOrder(symbol1, 'buy', 3547,168); //3547 * 168 = 595896
        symbolLogic.store(order)

        order = getFakeOrder(symbol2, 'buy', 5,26870); //134350
        symbolLogic.store(order)

        order = getFakeOrder(symbol3, 'buy', 85410,168); //14348880
        symbolLogic.store(order)

        liminalMarketLogic.storeTransaction(liminalMarketInfo, filledAt);
        assert.fieldEquals('LiminalMarketInfo', '1', 'value', (595896+134350+14348880).toString());

        order = getFakeOrder(symbol3, 'buy', 68,175); //(68+85410) * 175 = 14958650
        symbolLogic.store(order)

        liminalMarketLogic.storeTransaction(liminalMarketInfo, filledAt);
        assert.fieldEquals('LiminalMarketInfo', '1', 'value', (595896+134350+14958650).toString());

        order = getFakeOrder(symbol1, 'sell', 5000,169); //845000 but tsl becomes 0 since qty is more than in system, so valueWei will be 0
        symbolLogic.store(order)

        liminalMarketLogic.storeTransaction(liminalMarketInfo, filledAt);
        assert.fieldEquals('LiminalMarketInfo', '1', 'value', (0+134350+14958650).toString());

    })

})