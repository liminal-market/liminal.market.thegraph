import {handleOrderExecuted, handleOrderFailed, handleTokenCreated} from "../src/liminalMarket";
import {beforeEach, clearStore, describe, test} from "matchstick-as";
import {
    getOrderExecutedEvent,
    getOrderFailedEvent,
    getTokenCreatedEvent,
    initLiminalMarketInfo,
    WalletAddress,
    WalletAddress2
} from "./Util";
import {BigInt} from "@graphprotocol/graph-ts";

export  { handleOrderExecuted, handleOrderFailed, handleTokenCreated }


describe('Test OrderLogic', () => {

    beforeEach(() => {
        clearStore();
        initLiminalMarketInfo();
    })

    test('handleOrderExecuted', () => {
       // let orderExecutedEvent = getOrderExecutedEvent();
       // handleOrderExecuted(orderExecutedEvent);
    })

    test('handleOrderFailed', () => {
        let symbol = 'AAPL';
        let message = 'Order to old';
        let buyingPower = BigInt.fromI64(1006890006700001);

        let orderFailedEvent = getOrderFailedEvent(WalletAddress, symbol, message, buyingPower, WalletAddress2);
        //handleOrderFailed(orderFailedEvent);
    })

    test("tokenCreated", () => {
        let event = getTokenCreatedEvent('AAPL')
        handleTokenCreated(event)

    })
})