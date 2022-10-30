import {OrderExecuted, OrderFailed, TokenCreated} from "../generated/LiminalMarket/LiminalMarket"
import SymbolLogic from "./logic/SymbolLogic";
import OrderFailLogic from "./logic/OrderFailLogic";
import OrderAddLogic from './logic/OrderAddLogic'
import StatisticsLogic from "./logic/StatisticsLogic";
import {log} from "matchstick-as/assembly/index";



export function handleOrderExecuted(event: OrderExecuted): void {
    let orderLogic = new OrderAddLogic();
    let order = orderLogic.addOrder(event);

    let stats = new StatisticsLogic();
    stats.loadOrderExecutedStatistics(order);
}

export function handleOrderFailed(event: OrderFailed): void {
    let orderLogic = new OrderFailLogic();
    let orderFail = orderLogic.addFail(event);

    let stats = new StatisticsLogic();
    stats.loadOrderFailedStatistics(orderFail);
}

export function handleTokenCreated(event: TokenCreated): void {
    let tokenLogic = new SymbolLogic();
    tokenLogic.create(event.params.symbol, event.params.tokenAddress, event.block.timestamp);
}

