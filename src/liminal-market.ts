import {BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import {OrderExecuted, OrderFailed, TokenCreated} from "../generated/LiminalMarket/LiminalMarket"
import SymbolLogic from "./logic/SymbolLogic";
import OrderLogic from "./logic/OrderLogic";
import {HourData, DayData, DaySymbolData, HourSymbolData, Order, OrderFail} from "../generated/schema";
import Helper from "./Helper";
import LiminalMarketLogic from "./logic/LiminalMarketLogic";


export function handleTokenCreated(event: TokenCreated): void {
    log.error('call handleTokenCreated for {}', [event.params.symbol]);

    let tokenLogic = new SymbolLogic();
    tokenLogic.create(event);
}

export function handleOrderFailed(event: OrderFailed): void {
    log.error('call handleOrderFailed for {}', [event.params.symbol]);

    let orderLogic = new OrderLogic();
    orderLogic.addFail(event);
}

export function handleOrderExecuted(event: OrderExecuted): void {
    let transactionLogic = new OrderLogic();
    let order = transactionLogic.addOrder(event);

    loadHourlyData(order);
    loadDailyData(order);
    loadDailySymbolData(order);
    loadHourlySymbolData(order);
}


function loadHourlyData(order: Order): void {
    let hourId = Helper.getHourId(order.filledAt)

    let hourData = HourData.load(hourId.toString());
    if (hourData == null) {
        hourData = new HourData(hourId.toString())
        hourData.date = hourId;
        hourData.volumeUsdWei = BigInt.fromI32(0);
        hourData.tvlUSDWei = BigInt.fromI32(0);
        hourData.orders = new Array<string>()
    }

    let liminalMarketLogic = new LiminalMarketLogic();
    let info = liminalMarketLogic.getLiminalMarketInfo();

    let bigUsdValue = Helper.getUsdValueWei(order);
    hourData.volumeUsdWei = hourData.volumeUsdWei.plus(bigUsdValue)
    hourData.volumeUsd = Helper.getDecimal(hourData.volumeUsdWei);
    hourData.tvlUSDWei = info.tvlAUSDWei;
    hourData.tvlUSD = info.tvlAUSD;
    hourData.symbolCount = info.symbolCount;
    hourData.txCount = info.txCount;
    hourData.userCount = info.userCount;

    let orders = hourData.orders!;
    orders.push(order.id);
    hourData.orders = orders;

    hourData.save();
}

function loadDailyData(order: Order): void {
    let dayId = Helper.getDayId(order.filledAt)

    let dayData = DayData.load(dayId.toString());
    if (dayData == null) {
        dayData = new DayData(dayId.toString())
        dayData.date = dayId;
        dayData.volumeUsdWei = BigInt.fromI32(0);
        dayData.orders = new Array<string>();
    }

    let liminalMarketLogic = new LiminalMarketLogic();
    let info = liminalMarketLogic.getLiminalMarketInfo();

    let bigUsdValue = Helper.getUsdValueWei(order);
    dayData.volumeUsdWei = dayData.volumeUsdWei.plus(bigUsdValue)
    dayData.volumeUsd = Helper.getDecimal(dayData.volumeUsdWei);
    dayData.tvlUSDWei = info.tvlAUSDWei;
    dayData.tvlUSD = info.tvlAUSD;
    dayData.symbolCount = info.symbolCount;
    dayData.txCount = info.txCount;
    dayData.userCount = info.userCount;

    let orders = dayData.orders!;
    orders.push(order.id);
    dayData.orders = orders;

    dayData.save();
}

function loadHourlySymbolData(order: Order): void {
    let symbolLogic = new SymbolLogic();
    let symbol = symbolLogic.get(order.symbol)
    if (!symbol) return;

    let hourId = Helper.getHourId(order.filledAt)
    let id = order.symbol + "_" + hourId.toString();

    let hourData = HourSymbolData.load(id);
    if (hourData == null) {
        hourData = new HourSymbolData(id)
        hourData.date = hourId;
        hourData.symbol = order.symbol;
        hourData.volumeUsdWei = BigInt.fromI32(0);
        hourData.users = new Array<string>();
        hourData.orders = new Array<string>();
    }
    hourData.volumeUsdWei = order.filledQtyWei
    hourData.volumeUsd = Helper.getDecimal(hourData.volumeUsdWei);
    hourData.tvlUSDWei = symbol.tvlUsdWei
    hourData.tvlUSD = Helper.getDecimal(hourData.tvlUSDWei);
    hourData.txCount = symbol.txCount;

    let users = hourData.users!;
    users.push(order.recipient.toHex())
    hourData.users = users;

    let orders = hourData.orders!;
    orders.push(order.id);
    hourData.orders = orders;

    hourData.save();
}

function loadDailySymbolData(order: Order): void {
    let symbolLogic = new SymbolLogic();
    let symbol = symbolLogic.get(order.symbol)
    if (!symbol) return;

    let dayId = Helper.getDayId(order.filledAt)
    let id = order.symbol + "_" + dayId.toString();

    let dayData = HourSymbolData.load(id);
    if (dayData == null) {
        dayData = new HourSymbolData(id)
        dayData.date = dayId;
        dayData.symbol = order.symbol;
        dayData.volumeUsdWei = BigInt.fromI32(0);
        dayData.users = new Array<string>();
        dayData.orders = new Array<string>();
    }
    dayData.volumeUsdWei = order.filledQtyWei
    dayData.volumeUsd = Helper.getDecimal(dayData.volumeUsdWei);
    dayData.tvlUSDWei = symbol.tvlUsdWei
    dayData.tvlUSD = Helper.getDecimal(dayData.tvlUSDWei);
    dayData.txCount = symbol.txCount;

    let users = dayData.users!;
    users.push(order.recipient.toHex())
    dayData.users = users;

    let orders = dayData.orders!;
    orders.push(order.id);
    dayData.orders = orders;

    dayData.save();
}