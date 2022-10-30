import {assert, beforeEach, clearStore, describe} from "matchstick-as/assembly/index";
import {test} from "matchstick-as";
import {
    getBigIntWei,
    getOrderExecutedEvent,
    getTokenCreatedEvent,
    initLiminalMarketInfo,
    WalletAddress
} from "../Util";
import {handleOrderExecuted, handleTokenCreated} from "../../src/liminalMarket";
import {Address, BigInt, Bytes, ethereum, store} from "@graphprotocol/graph-ts";
import DateHelper from "../../src/DateHelper";
import NumberHelper from "../../src/NumberHelper";
import SymbolLogic from "../../src/logic/SymbolLogic";
import WalletHistoryLogic from "../../src/logic/WalletHistoryLogic";

describe('Test OrderAddLogic', () => {

    beforeEach(() => {

        clearStore();
        initLiminalMarketInfo();
    })

    test('test handleOrderExecuted', () => {
        let walletAddress = WalletAddress;
        let symbolId = 'AAPL';
        let tsl = getBigIntWei(137);
        let filledQty = getBigIntWei(137);
        let filledAvgPrice = getBigIntWei(4357);
        let side = 'buy';
        let filledAt = DateHelper.getJsTimestamp(BigInt.fromI32(1000));
        let commission = getBigIntWei(5);
        let aUsdBalance = getBigIntWei(45235)

        let tokenCreatedEvent = getTokenCreatedEvent(symbolId);
        let tokenLogic = new SymbolLogic();
        tokenLogic.create(tokenCreatedEvent.params.symbol, tokenCreatedEvent.params.tokenAddress, tokenCreatedEvent.block.timestamp);

        let event = getOrderExecutedEvent(walletAddress, symbolId, tsl, filledQty, filledAvgPrice, side, filledAt, commission, aUsdBalance);
        handleOrderExecuted(event)

        let costWei = event.params.filledQty.times(event.params.filledAvgPrice).div(BigInt.fromI64(10 ** 18));
        let tradeId = NumberHelper.getTradeId(event.params.recipient.toHex(), event.params.symbol, event.params.filledAt,
            event.params.filledQty, event.params.filledAvgPrice, event.params.side);
        let orderId = event.transaction.hash.toHex();

        assert.fieldEquals('Order', orderId, 'symbol', event.params.symbol);
        assert.fieldEquals('Order', orderId, 'tslWei', event.params.tsl.toString());
        assert.fieldEquals('Order', orderId, 'tsl', NumberHelper.getDecimal(event.params.tsl).toString());
        assert.fieldEquals('Order', orderId, 'filledQtyWei', event.params.filledQty.toString());
        assert.fieldEquals('Order', orderId, 'filledQty', NumberHelper.getDecimal(event.params.filledQty).toString());
        assert.fieldEquals('Order', orderId, 'filledAvgPriceWei', event.params.filledAvgPrice.toString());
        assert.fieldEquals('Order', orderId, 'filledAvgPrice', NumberHelper.getDecimal(event.params.filledAvgPrice).toString());
        assert.fieldEquals('Order', orderId, 'filledAt', event.params.filledAt.toString());
        assert.fieldEquals('Order', orderId, 'side', event.params.side);
        assert.fieldEquals('Order', orderId, 'commissionWei', event.params.commission.toString());
        assert.fieldEquals('Order', orderId, 'commission', NumberHelper.getDecimal(event.params.commission).toString());
        assert.fieldEquals('Order', orderId, 'aUsdBalanceWei', event.params.aUsdBalance.toString());
        assert.fieldEquals('Order', orderId, 'aUsdBalance', NumberHelper.getDecimal(event.params.aUsdBalance).toString());
        assert.fieldEquals('Order', orderId, 'wallet', event.params.recipient.toHex());
        assert.fieldEquals('Order', orderId, 'costWei', costWei.toString());
        assert.fieldEquals('Order', orderId, 'cost', NumberHelper.getDecimal(costWei).toString());
        assert.fieldEquals('Order', orderId, 'spender', event.params.spender.toHex())
        assert.fieldEquals('Order', orderId, 'tradeId', tradeId);

        assert.fieldEquals('OrderTrade', tradeId, 'count', '1');
        assert.fieldEquals('OrderTrade', tradeId, 'lastFilledAt', event.params.filledAt.toString());
        assert.fieldEquals('OrderTrade', tradeId, 'orders', '[' + event.transaction.hash.toHex() + ']');

        let positionId = (event.params.recipient.toHex() + '_' + event.params.symbol);
        assert.fieldEquals('Position', positionId, 'wallet', event.params.recipient.toHex());
        assert.fieldEquals('Position', positionId, 'symbol', event.params.symbol);
        assert.fieldEquals('Position', positionId, 'tslWei', event.params.tsl.toString());
        assert.fieldEquals('Position', positionId, 'tsl', NumberHelper.getDecimal(event.params.tsl).toString());
        assert.fieldEquals('Position', positionId, 'txCount', '1');
        assert.fieldEquals('Position', positionId, 'updated', event.params.filledAt.toString());

        assert.fieldEquals('Symbol', event.params.symbol, 'tslWei', event.params.tsl.toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'tsl', NumberHelper.getDecimal(event.params.tsl).toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'pricePerShareWei', event.params.filledAvgPrice.toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'pricePerShare', NumberHelper.getDecimal(event.params.filledAvgPrice).toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'priceLastUpdated', event.params.filledAt.toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'valueWei', NumberHelper.times(event.params.tsl, event.params.filledAvgPrice).toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'value', NumberHelper.getDecimal(NumberHelper.times(event.params.tsl, event.params.filledAvgPrice)).toString());
        assert.fieldEquals('Symbol', event.params.symbol, 'wallets', '[' + event.params.recipient.toHex() + ']');

        let walletHistoryId = event.transaction.hash.toHex();
        assert.fieldEquals('WalletHistory', walletHistoryId, 'wallet', event.params.recipient.toHex());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'balanceWei', event.params.aUsdBalance.toString());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'balance', NumberHelper.getDecimal(event.params.aUsdBalance).toString());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'diffWei', event.params.aUsdBalance.toString());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'diff', NumberHelper.getDecimal(event.params.aUsdBalance).toString());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'action', 'OrderExecuted');
        assert.fieldEquals('WalletHistory', walletHistoryId, 'created', DateHelper.getJsTimestamp(event.block.timestamp).toString());
        assert.fieldEquals('WalletHistory', walletHistoryId, 'createdISO', new Date(DateHelper.getJsTimestamp(event.block.timestamp).toI64()).toISOString());

        let walletId = event.params.recipient.toHex();
        assert.fieldEquals('Wallet', walletId, 'txCount', '1');
        assert.fieldEquals('Wallet', walletId, 'lastOrderAt', DateHelper.getJsTimestamp(event.block.timestamp).toString());
        assert.fieldEquals('Wallet', walletId, 'updated', DateHelper.getJsTimestamp(event.block.timestamp).toString());
        assert.fieldEquals('Wallet', walletId, 'balanceWei', event.params.aUsdBalance.toString());
        assert.fieldEquals('Wallet', walletId, 'balance', NumberHelper.getDecimal(event.params.aUsdBalance).toString());
        assert.fieldEquals('Wallet', walletId, 'orders', '[' + orderId + ']');
        assert.fieldEquals('Wallet', walletId, 'positions', '[' + positionId + ']');
        assert.fieldEquals('Wallet', walletId, 'history', '[' + walletHistoryId + ']');

        assert.fieldEquals('LiminalMarketInfo', '1', 'walletCount', '1');
        assert.fieldEquals('LiminalMarketInfo', '1', 'lastOrderAt', event.params.filledAt.toString());
        assert.fieldEquals('LiminalMarketInfo', '1', 'txCount', '1');
        assert.fieldEquals('LiminalMarketInfo', '1', 'valueWei', NumberHelper.times(event.params.tsl, event.params.filledAvgPrice).toString());
        assert.fieldEquals('LiminalMarketInfo', '1', 'value', NumberHelper.getDecimal(NumberHelper.times(event.params.tsl, event.params.filledAvgPrice)).toString());

    })

})