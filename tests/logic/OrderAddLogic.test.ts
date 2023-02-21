import {assert, beforeEach, clearStore, describe} from "matchstick-as/assembly/index";
import {test} from "matchstick-as";
import {
    getBigIntWei,
    getOrderExecutedEvent,
    getServiceContractCreatedEvent,
    getTokenCreatedEvent,
    initLiminalMarketInfo,
    WalletAddress, WalletAddress2
} from "../Util";
import {handleOrderExecuted} from "../../src/liminalMarket";
import {BigInt} from "@graphprotocol/graph-ts";
import DateHelper from "../../src/DateHelper";
import NumberHelper from "../../src/NumberHelper";
import SymbolLogic from "../../src/logic/SymbolLogic";
import ServiceContractLogic from "../../src/logic/ServiceContractLogic";

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
        let serviceFee = getBigIntWei(5);
        let aUsdBalance = getBigIntWei(45235)
        let spender = WalletAddress;

        let tokenCreatedEvent = getTokenCreatedEvent(symbolId);
        let tokenLogic = new SymbolLogic();
        tokenLogic.create(tokenCreatedEvent.params.symbol, tokenCreatedEvent.params.tokenAddress, tokenCreatedEvent.block.timestamp);

        let serviceContractEvent = getServiceContractCreatedEvent(spender);
        let serviceContractLogic = new ServiceContractLogic();
        serviceContractLogic.create(serviceContractEvent);

        let event = getOrderExecutedEvent(walletAddress, symbolId, tsl, filledQty, filledAvgPrice, side, filledAt, serviceFee, aUsdBalance, spender);

        handleOrderExecuted(event);

        let costWei = event.params.filledQty.times(event.params.filledAvgPrice).div(BigInt.fromI64(10 ** 18));
        let orderId = event.params.orderId;

        assert.fieldEquals('Order', orderId, 'symbol', event.params.symbol);
        assert.fieldEquals('Order', orderId, 'tslWei', event.params.tsl.toString());
        assert.fieldEquals('Order', orderId, 'tsl', NumberHelper.getDecimal(event.params.tsl).toString());
        assert.fieldEquals('Order', orderId, 'filledQtyWei', event.params.filledQty.toString());
        assert.fieldEquals('Order', orderId, 'filledQty', NumberHelper.getDecimal(event.params.filledQty).toString());
        assert.fieldEquals('Order', orderId, 'filledAvgPriceWei', event.params.filledAvgPrice.toString());
        assert.fieldEquals('Order', orderId, 'filledAvgPrice', NumberHelper.getDecimal(event.params.filledAvgPrice).toString());
        assert.fieldEquals('Order', orderId, 'filledAt', event.params.filledAt.toString());
        assert.fieldEquals('Order', orderId, 'side', event.params.side);
        assert.fieldEquals('Order', orderId, 'serviceFeeWei', event.params.serviceFee.toString());
        assert.fieldEquals('Order', orderId, 'serviceFee', NumberHelper.getDecimal(event.params.serviceFee).toString());
        assert.fieldEquals('Order', orderId, 'aUsdBalanceWei', event.params.aUsdBalance.toString());
        assert.fieldEquals('Order', orderId, 'aUsdBalance', NumberHelper.getDecimal(event.params.aUsdBalance).toString());
        assert.fieldEquals('Order', orderId, 'wallet', event.params.recipient.toHex());
        assert.fieldEquals('Order', orderId, 'costWei', costWei.toString());
        assert.fieldEquals('Order', orderId, 'cost', NumberHelper.getDecimal(costWei).toString());
        assert.fieldEquals('Order', orderId, 'serviceContract', event.params.spender.toHex())

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

        assert.fieldEquals('LiminalMarketInfo', '1', 'walletCount', '1');
        assert.fieldEquals('LiminalMarketInfo', '1', 'lastOrderAt', event.params.filledAt.toString());
        assert.fieldEquals('LiminalMarketInfo', '1', 'txCount', '1');
        assert.fieldEquals('LiminalMarketInfo', '1', 'valueWei', NumberHelper.times(event.params.tsl, event.params.filledAvgPrice).toString());
        assert.fieldEquals('LiminalMarketInfo', '1', 'value', NumberHelper.getDecimal(NumberHelper.times(event.params.tsl, event.params.filledAvgPrice)).toString());


        let serviceContractId = event.params.spender.toHexString()
        assert.fieldEquals('ServiceContract', serviceContractId, 'orderExecutedCount', '1');
        assert.fieldEquals('ServiceContract', serviceContractId, 'txCount', '1');
        assert.fieldEquals('ServiceContract', serviceContractId, 'totalServiceFeeWei', '1666666666666666666');
        assert.fieldEquals('ServiceContract', serviceContractId, 'totalServiceFee', '1.666666666666666666');

        assert.fieldEquals('ServiceContract', serviceContractId, 'name', 'Hello');
        assert.fieldEquals('ServiceContract', serviceContractId, 'url', 'World');
        assert.fieldEquals('ServiceContract', serviceContractId, 'owner', WalletAddress.toHexString());
        assert.fieldEquals('ServiceContract', serviceContractId, 'serviceFeeAddress', WalletAddress2.toHexString());
        assert.fieldEquals('ServiceContract', serviceContractId, 'contractAddress', serviceContractId);


    })

})