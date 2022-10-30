import {assert, beforeEach, clearStore, describe, log, test} from "matchstick-as/assembly/index";
import {getOrderFailedEvent, initLiminalMarketInfo, WalletAddress, WalletAddress2} from "../Util";
import {OrderFail} from "../../generated/schema";
import NumberHelper from "../../src/NumberHelper";
import {BigInt} from "@graphprotocol/graph-ts";
import OrderFailLogic from "../../src/logic/OrderFailLogic";
import DateHelper from "../../src/DateHelper";


describe('Test OrderFailLogic', () => {

    beforeEach(() => {
        clearStore();
        initLiminalMarketInfo();
    })



    test('testing one call to handleOrderFailed, should validate orderFail, spender, liminalMarketInfo is updated', () => {
        let symbol = 'AAPL';
        let message = 'Order to old';
        let buyingPower = BigInt.fromI64(1006890006700001);
        let expectedFailCount = '1';
        createOrderFailedAndValidate(symbol, message, buyingPower, expectedFailCount)

    })

    test('testing 2 calls to handleOrderFailed, should validate orderFail, spender, liminalMarketInfo is updated', () => {
        let symbol = 'AAPL';
        let message = 'Order to old';
        let buyingPower = BigInt.fromI64(1006890006700001);
        createOrderFailedAndValidate(symbol, message, buyingPower, '1');

        symbol = 'MSFT';
        message = 'Could not execute';
        buyingPower = BigInt.fromI64(64687333);
        createOrderFailedAndValidate(symbol, message, buyingPower, '2');
    })

})

function createOrderFailedAndValidate(symbol: string, message: string, buyingPower: BigInt, expectedFailCount: string): void {
    let orderFailedEvent = getOrderFailedEvent(WalletAddress, symbol, message, buyingPower, WalletAddress2);

    let orderLogic = new OrderFailLogic();
    orderLogic.addFail(orderFailedEvent);

    let id = orderFailedEvent.transaction.hash.toHex();
    assert.fieldEquals('OrderFail', id, 'symbol', symbol);
    assert.fieldEquals('OrderFail', id, 'message', message);
    assert.fieldEquals('OrderFail', id, 'buyingPowerWei', buyingPower.toString());
    assert.fieldEquals('OrderFail', id, 'buyingPower', NumberHelper.getDecimal(buyingPower).toString());
    assert.fieldEquals('OrderFail', id, 'wallet', WalletAddress.toHex());
    assert.fieldEquals('OrderFail', id, 'spender', WalletAddress2.toHex());
    assert.fieldEquals('OrderFail', id, 'created', DateHelper.getJsTimestamp(orderFailedEvent.block.timestamp).toString());

    assert.fieldEquals('LiminalMarketInfo', '1', 'orderFailedCount', expectedFailCount);

    assert.fieldEquals('Spender', WalletAddress2.toHex(), 'txCount', expectedFailCount);
    assert.fieldEquals('Spender', WalletAddress2.toHex(), 'orderFailedCount', expectedFailCount);

}
