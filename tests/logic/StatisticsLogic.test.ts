import {assert, beforeEach, describe, test} from "matchstick-as/assembly/index";
import {
    getBigIntWei,
    getOrderExecutedEvent,
    getServiceContractCreatedEvent,
    initLiminalMarketInfo,
    WalletAddress
} from "../Util";
import {BigInt, log} from "@graphprotocol/graph-ts";
import DateHelper from "../../src/DateHelper";
import NumberHelper from "../../src/NumberHelper";
import SymbolLogic from "../../src/logic/SymbolLogic";
import {handleOrderExecuted} from "../liminalMarket";
import ServiceContractLogic from "../../src/logic/ServiceContractLogic";

describe('test StatisticsLogic', () => {

    beforeEach(() => {
        initLiminalMarketInfo();
    })


    test('test statistics by executing order', () => {
        let symbol = 'AAPL';
        let tsl = getBigIntWei(33);
        let filledQty = getBigIntWei(33);
        let filledAvgPrice = getBigIntWei(2);
        let side = 'buy';
        let filledAt = BigInt.fromI64(1666896054000); //Thursday, 27. October 2022 18:40:54
        let serviceFee = getBigIntWei(2);
        let aUsdBalance = getBigIntWei(1000);
        let spender = WalletAddress;
        let symbolLogic = new SymbolLogic();
        symbolLogic.create(symbol, WalletAddress, BigInt.fromI32(1));

        let serviceContractEvent = getServiceContractCreatedEvent(spender);
        let serviceContractLogic = new ServiceContractLogic();
        serviceContractLogic.create(serviceContractEvent);

        let fakeOrder = getOrderExecutedEvent(WalletAddress, symbol, tsl, filledQty, filledAvgPrice, side, filledAt, serviceFee, aUsdBalance, spender)

        let expectedHourId = '1666893600000';
        let expectedDayId = '1666828800000'

        handleOrderExecuted(fakeOrder)
        let hourId = DateHelper.getHourId(filledAt);
        let dayId = DateHelper.getDayId(filledAt);
        let aUsdVolumeWei = NumberHelper.times(filledQty, filledAvgPrice);

        log.info('Validate HourlyData', [])
        assert.stringEquals(expectedHourId, hourId.toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'date', hourId.toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'symbolCount', '1');
        assert.fieldEquals('HourlyData', hourId.toString(), 'txCount', '1');
        assert.fieldEquals('HourlyData', hourId.toString(), 'walletCount', '1');
        assert.fieldEquals('HourlyData', hourId.toString(), 'sharesWei', filledQty.toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'shares', NumberHelper.getDecimal(filledQty).toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'tslWei', tsl.toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'tsl', NumberHelper.getDecimal(tsl).toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'aUsdVolumeWei', aUsdVolumeWei.toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'aUsdVolume', NumberHelper.getDecimal(aUsdVolumeWei).toString());
        assert.fieldEquals('HourlyData', hourId.toString(), 'orders', '[' + fakeOrder.params.orderId + ']');

        log.info('Validate HourlySymbolData', [])
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'date', hourId.toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'symbol', symbol);
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'txCount', '1');
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'sharesWei', filledQty.toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'shares', NumberHelper.getDecimal(filledQty).toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'tslWei', tsl.toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'tsl', NumberHelper.getDecimal(tsl).toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'aUsdVolumeWei', aUsdVolumeWei.toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'aUsdVolume', NumberHelper.getDecimal(aUsdVolumeWei).toString());
        assert.fieldEquals('HourlySymbolData', hourId.toString(), 'orders', '[' + fakeOrder.params.orderId + ']');

        log.info('Validate DailyData', [])
        assert.stringEquals(expectedDayId, dayId.toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'date', dayId.toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'symbolCount', '1');
        assert.fieldEquals('DailyData', dayId.toString(), 'txCount', '1');
        assert.fieldEquals('DailyData', dayId.toString(), 'walletCount', '1');
        assert.fieldEquals('DailyData', dayId.toString(), 'sharesWei', filledQty.toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'shares', NumberHelper.getDecimal(filledQty).toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'tslWei', tsl.toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'tsl', NumberHelper.getDecimal(tsl).toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'aUsdVolumeWei', aUsdVolumeWei.toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'aUsdVolume', NumberHelper.getDecimal(aUsdVolumeWei).toString());
        assert.fieldEquals('DailyData', dayId.toString(), 'orders', '[' + fakeOrder.params.orderId + ']');

        log.info('Validate DailySymbolData', [])
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'date', dayId.toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'symbol', symbol);
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'txCount', '1');
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'sharesWei', filledQty.toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'shares', NumberHelper.getDecimal(filledQty).toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'tslWei', tsl.toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'tsl', NumberHelper.getDecimal(tsl).toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'aUsdVolumeWei', aUsdVolumeWei.toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'aUsdVolume', NumberHelper.getDecimal(aUsdVolumeWei).toString());
        assert.fieldEquals('DailySymbolData', dayId.toString(), 'orders', '[' + fakeOrder.params.orderId + ']');


    })

})