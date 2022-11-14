import {
    DailyData,
    DailySymbolData,
    HourlyData,
    HourlySymbolData,
    Order,
    OrderFail
} from "../../generated/schema";
import DateHelper from "../DateHelper";
import {BigDecimal, BigInt, Entity} from "@graphprotocol/graph-ts";
import LiminalMarketLogic from "./LiminalMarketLogic";
import SymbolLogic from "./SymbolLogic";
import NumberHelper from "../NumberHelper";
import {OrderFailed} from "../../generated/LiminalMarket/LiminalMarket";

export default class StatisticsLogic {

    public loadOrderExecutedStatistics(order: Order): void {
        this.loadOrderExecutedHourlyData(order);
        this.loadOrderExecutedHourlySymbolData(order);
        this.loadOrderExecutedDailyData(order);
        this.loadOrderExecutedDailySymbolData(order);
    }

    public loadOrderFailedStatistics(orderFail: OrderFail): void {
        this.loadOrderFailedHourlyData(orderFail);
        this.loadOrderFailedHourlySymbolData(orderFail);
        this.loadOrderFailedDailyData(orderFail);
        this.loadOrderFailedDailySymbolData(orderFail);
    }

    private loadOrderExecutedHourlyData(order: Order): void {
        let id = this.getId('HourlyData', order.filledAt);

        let data = this.getHourlyDataInstance(id);
        if (!data) return;

        this.setHourlyDataForOrderExecuted(data, order);
    }

    private loadOrderExecutedHourlySymbolData(order: Order): void {
        let id = this.getId('HourlySymbolData', order.filledAt);

        let data = this.getHourlySymbolDataInstance(id);
        if (!data) return;

        this.setHourlySymbolDataForOrderExecuted(data, order);
    }

    private loadOrderExecutedDailyData(order: Order): void {
        let id = this.getId('DailyData', order.filledAt);

        let data = this.getDailyDataInstance(id);
        if (!data) return;

        this.setDailyDataForOrderExecuted(data, order);
    }

    private loadOrderExecutedDailySymbolData(order: Order): void {
        let id = this.getId('DailySymbolData', order.filledAt);

        let data = this.getDailySymbolDataInstance(id);
        if (!data) return;

        this.setDailySymbolDataForOrderExecuted(data, order);
    }

    private loadOrderFailedHourlyData(orderFail: OrderFail): void {
        let id = this.getId('HourlyData', orderFail.created);

        let data = this.getHourlyDataInstance(id);
        if (!data) return;
        this.setHourlyDataForOrderFailed(data, orderFail);
    }

    private loadOrderFailedHourlySymbolData(orderFail: OrderFail): void {
        let id = this.getId('HourlySymbolData', orderFail.created);

        let data = this.getHourlySymbolDataInstance(id);
        if (!data) return;
        this.setHourlySymbolDataForOrderFailed(data, orderFail);
    }

    private loadOrderFailedDailyData(orderFail: OrderFail): void {
        let id = this.getId('DailyData', orderFail.created);

        let data = this.getDailyDataInstance(id);
        if (!data) return;
        this.setDailyDataForOrderFailed(data, orderFail);
    }

    private loadOrderFailedDailySymbolData(orderFail: OrderFail): void {
        let id = this.getId('DailySymbolData', orderFail.created);

        let data = this.getDailySymbolDataInstance(id);
        if (!data) return;
        this.setDailySymbolDataForOrderFailed(data, orderFail);
    }


    private setHourlyDataForOrderFailed(data: HourlyData, orderFail: OrderFail): void {

        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();
        data.txCount = info.txCount;

        let orderFails = data.orderFails!;
        orderFails.push(orderFail.id);
        data.orderFails = orderFails;
        data.save();
    }

    private setHourlySymbolDataForOrderFailed(data: HourlySymbolData, orderFail: OrderFail): void {

        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();
        data.txCount = info.txCount;

        let orderFails = data.orderFails!;
        orderFails.push(orderFail.id);
        data.orderFails = orderFails;
        data.save();
    }

    private setDailyDataForOrderFailed(data: DailyData, orderFail: OrderFail): void {

        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();
        data.txCount = info.txCount;

        let orderFails = data.orderFails!;
        orderFails.push(orderFail.id);
        data.orderFails = orderFails;
        data.save();
    }

    private setDailySymbolDataForOrderFailed(data: DailySymbolData, orderFail: OrderFail): void {

        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();
        data.txCount = info.txCount;

        let orderFails = data.orderFails!;
        orderFails.push(orderFail.id);
        data.orderFails = orderFails;
        data.save();
    }


    private getHourlyDataInstance(id: string): HourlyData {
        let data = HourlyData.load(id);
        if (data) return data;

        data = new HourlyData(id);
        data.date = BigInt.fromString(data.id);
        data.walletCount = 0
        data.symbolCount = 0;
        data.txCount = BigInt.fromI32(0);
        data.sharesWei = BigInt.fromI32(0);
        data.shares = BigDecimal.fromString("0");
        data.tslWei = BigInt.fromI64(0);
        data.value = BigDecimal.fromString('0');
        data.valueWei = BigInt.fromI32(0);
        data.tsl = BigDecimal.fromString('0');
        data.aUsdVolumeWei = BigInt.fromI32(0);
        data.aUsdVolume = BigDecimal.fromString("0");
        data.orders = new Array<string>();
        data.orderFails = new Array<string>();
        return data;
    }

    private getHourlySymbolDataInstance(id: string): HourlySymbolData {
        let data = HourlySymbolData.load(id);
        if (data) return data;

        data = new HourlySymbolData(id);
        data.symbol = id;
        data.date = BigInt.fromString(data.id);
        data.txCount = BigInt.fromI32(0);
        data.sharesWei = BigInt.fromI32(0);
        data.shares = BigDecimal.fromString("0");
        data.tslWei = BigInt.fromI64(0);
        data.tsl = BigDecimal.fromString('0');
        data.value = BigDecimal.fromString('0');
        data.valueWei = BigInt.fromI32(0);
        data.aUsdVolumeWei = BigInt.fromI32(0);
        data.aUsdVolume = BigDecimal.fromString("0");
        data.orders = new Array<string>();
        data.orderFails = new Array<string>();
        return data;
    }

    private getDailyDataInstance(id: string): DailyData {
        let data = DailyData.load(id);
        if (data) return data;

        data = new DailyData(id);
        data.date = BigInt.fromString(data.id);
        data.walletCount = 0
        data.symbolCount = 0;
        data.txCount = BigInt.fromI32(0);
        data.sharesWei = BigInt.fromI32(0);
        data.shares = BigDecimal.fromString("0");
        data.tslWei = BigInt.fromI64(0);
        data.tsl = BigDecimal.fromString('0');
        data.value = BigDecimal.fromString('0');
        data.valueWei = BigInt.fromI32(0);
        data.aUsdVolumeWei = BigInt.fromI32(0);
        data.aUsdVolume = BigDecimal.fromString("0");
        data.orders = new Array<string>();
        data.orderFails = new Array<string>();
        return data;
    }

    private getDailySymbolDataInstance(id: string): DailySymbolData {
        let data = DailySymbolData.load(id);
        if (data) return data;

        data = new DailySymbolData(id);
        data.symbol = id;
        data.date = BigInt.fromString(data.id);
        data.txCount = BigInt.fromI32(0);
        data.sharesWei = BigInt.fromI32(0);
        data.shares = BigDecimal.fromString("0");
        data.tslWei = BigInt.fromI64(0);
        data.tsl = BigDecimal.fromString('0');
        data.value = BigDecimal.fromString('0');
        data.valueWei = BigInt.fromI32(0);
        data.aUsdVolumeWei = BigInt.fromI32(0);
        data.aUsdVolume = BigDecimal.fromString("0");
        data.orders = new Array<string>();
        data.orderFails = new Array<string>();
        return data;
    }


    private setHourlyDataForOrderExecuted(data: HourlyData, order: Order): void {
        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();

        data.symbolCount = info.symbolCount;
        data.txCount = info.txCount;
        data.walletCount = info.walletCount;

        data.sharesWei = NumberHelper.uintPlusOrMinus(order.side, data.sharesWei, order.filledQtyWei)
        data.shares = NumberHelper.getDecimal(data.sharesWei);
        data.tsl = info.tsl;
        data.tslWei = info.tslWei;
        data.aUsdVolumeWei = NumberHelper.uintPlusOrMinus(order.side, data.aUsdVolumeWei, order.costWei);
        data.aUsdVolume = NumberHelper.getDecimal(data.aUsdVolumeWei);
        data.valueWei = info.valueWei;
        data.value = info.value;

        let orders = data.orders!;
        orders.push(order.id);
        data.orders = orders;

        data.save();
    }

    private setHourlySymbolDataForOrderExecuted(data: HourlySymbolData, order: Order): void {
        let symbolLogic = new SymbolLogic();
        let symbol = symbolLogic.get(order.symbol);
        if (!symbol) return;

        data.symbol = order.symbol;
        data.txCount = symbol.txCount;

        data.sharesWei = NumberHelper.uintPlusOrMinus(order.side, data.sharesWei, order.filledQtyWei)
        data.shares = NumberHelper.getDecimal(data.sharesWei);
        data.tsl = symbol.tsl;
        data.tslWei = symbol.tslWei;
        data.aUsdVolumeWei = NumberHelper.uintPlusOrMinus(order.side, data.aUsdVolumeWei, order.costWei);
        data.aUsdVolume = NumberHelper.getDecimal(data.aUsdVolumeWei);
        data.valueWei = symbol.valueWei;
        data.value = symbol.value;

        let orders = data.orders!;
        orders.push(order.id);
        data.orders = orders;

        data.save();
    }

    private setDailyDataForOrderExecuted(data: DailyData, order: Order): void {
        let liminalMarketLogic = new LiminalMarketLogic();
        let info = liminalMarketLogic.getLiminalMarketInfo();

        data.symbolCount = info.symbolCount;
        data.txCount = info.txCount;
        data.walletCount = info.walletCount;

        data.sharesWei = NumberHelper.uintPlusOrMinus(order.side, data.sharesWei, order.filledQtyWei)
        data.shares = NumberHelper.getDecimal(data.sharesWei);
        data.tsl = info.tsl;
        data.tslWei = info.tslWei;
        data.aUsdVolumeWei = NumberHelper.uintPlusOrMinus(order.side, data.aUsdVolumeWei, order.costWei);
        data.aUsdVolume = NumberHelper.getDecimal(data.aUsdVolumeWei);
        data.valueWei = info.valueWei;
        data.value = info.value;

        let orders = data.orders!;
        orders.push(order.id);
        data.orders = orders;

        data.save();
    }

    private setDailySymbolDataForOrderExecuted(data: DailySymbolData, order: Order): void {
        let symbolLogic = new SymbolLogic();
        let symbol = symbolLogic.get(order.symbol);
        if (!symbol) return;

        data.symbol = order.symbol;
        data.txCount = symbol.txCount;

        data.sharesWei = NumberHelper.uintPlusOrMinus(order.side, data.sharesWei, order.filledQtyWei)
        data.shares = NumberHelper.getDecimal(data.sharesWei);
        data.tsl = symbol.tsl;
        data.tslWei = symbol.tslWei;
        data.aUsdVolumeWei = NumberHelper.uintPlusOrMinus(order.side, data.aUsdVolumeWei, order.costWei);
        data.aUsdVolume = NumberHelper.getDecimal(data.aUsdVolumeWei);
        data.valueWei = symbol.valueWei;
        data.value = symbol.value;

        let orders = data.orders!;
        orders.push(order.id);
        data.orders = orders;

        data.save();
    }

    private getId(name: string, dateTimeInMilliseconds: BigInt): string {
        return (name.indexOf('Hourly') != -1)
            ? DateHelper.getHourId(dateTimeInMilliseconds).toString()
            : DateHelper.getDayId(dateTimeInMilliseconds).toString();
    }


}