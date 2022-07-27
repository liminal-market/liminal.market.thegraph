import {log} from "@graphprotocol/graph-ts"
import {OrderExecuted, OrderFailed, TokenCreated} from "../generated/LiminalMarket/LiminalMarket"
import SymbolLogic from "./logic/SymbolLogic";
import OrderLogic from "./logic/OrderLogic";
import StatisticsLogic from "./logic/StatisticsLogic";


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

    let stats = new StatisticsLogic();
    stats.loadData(order);
}

