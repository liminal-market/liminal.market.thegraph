import {assert, beforeEach, clearStore, describe, test} from "matchstick-as/assembly/index";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {
    getFakeOrder,
    getSymbolAddress,
    getTokenCreatedEvent,
    initLiminalMarketInfo,
    WalletAddress,
    WalletAddress2
} from "../Util";
import {handleTokenCreated} from "../../src/liminalMarket";
import {Order, Symbol} from "../../generated/schema";
import DateHelper from "../../src/DateHelper";
import SymbolLogic from "../../src/logic/SymbolLogic";

export {handleTokenCreated}



describe('Test TokenCreated', () => {

    beforeEach(() => {
        clearStore();

        initLiminalMarketInfo();
    })

    test("Should create token AAPL", () => {
        let symbolId = 'AAPL'
        let tokenCreated = getTokenCreatedEvent(symbolId);

        handleTokenCreated(tokenCreated);

        let mockSymbol = getSymbolAddress(symbolId)

        assert.addressEquals(mockSymbol.contract, Address.fromString("0x0e51e6281812df31e6474b022139ed4f1a7bb6ac"))
        assert.fieldEquals('Symbol', symbolId, 'contract', tokenCreated.params.tokenAddress.toHex())
        assert.fieldEquals('Symbol', symbolId, 'logo', "https://app.liminal.market/img/logos/" + symbolId.toUpperCase() + ".png")
        assert.fieldEquals('Symbol', symbolId, 'pricePerShare', "0")
        assert.fieldEquals('Symbol', symbolId, 'pricePerShareWei', "0")
        assert.fieldEquals('Symbol', symbolId, 'priceLastUpdated', "0")
        assert.fieldEquals('Symbol', symbolId, 'tsl', "0")
        assert.fieldEquals('Symbol', symbolId, 'tslWei', "0")
        assert.fieldEquals('Symbol', symbolId, 'value', "0")
        assert.fieldEquals('Symbol', symbolId, 'valueWei', "0")
        assert.fieldEquals('Symbol', symbolId, 'txCount', "0")
        assert.fieldEquals('Symbol', symbolId, 'wallets', "[]")
        assert.fieldEquals('Symbol', symbolId, 'created', DateHelper.getJsTimestamp(tokenCreated.block.timestamp).toString())

    })

    test('storing of multiple orders, buy and sell, validate TSL is correct', () => {



        let symbol = 'AAPL';
        let tokenAddress = WalletAddress;
        let timestamp = BigInt.fromI32(393939);

        let symbolLogic = new SymbolLogic();
        symbolLogic.create(symbol, tokenAddress, timestamp);

        let order = getFakeOrder(symbol, 'buy', 100,20);
        symbolLogic.store(order);

        assert.fieldEquals('Symbol', symbol, 'tsl', '100')
        assert.fieldEquals('Symbol', symbol, 'value', '2000')

        order = getFakeOrder(symbol, 'buy', 1354,23);
        symbolLogic.store(order);

        assert.fieldEquals('Symbol', symbol, 'tsl', '1454')
        assert.fieldEquals('Symbol', symbol, 'value', '33442')

        order = getFakeOrder(symbol, 'sell', 276,27);
        symbolLogic.store(order);

        assert.fieldEquals('Symbol', symbol, 'tsl', '1178')
        assert.fieldEquals('Symbol', symbol, 'value', '31806')

        order = getFakeOrder(symbol, 'buy', 687,20);
        symbolLogic.store(order);

        assert.fieldEquals('Symbol', symbol, 'tsl', '1865')
        assert.fieldEquals('Symbol', symbol, 'value', '37300')

        order = getFakeOrder(symbol, 'sell', 1865,20);
        symbolLogic.store(order);

        assert.fieldEquals('Symbol', symbol, 'tsl', '0')
        assert.fieldEquals('Symbol', symbol, 'value', '0')

    })



})

