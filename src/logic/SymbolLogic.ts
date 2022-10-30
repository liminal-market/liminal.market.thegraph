import {TokenCreated} from "../../generated/LiminalMarket/LiminalMarket";
import {Order, Position, Symbol} from "../../generated/schema";
import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts";
import DateHelper from "../DateHelper";
import LiminalMarketLogic from "./LiminalMarketLogic";
import NumberHelper from "../NumberHelper";

export default class SymbolLogic {

    public get(id: string): Symbol | null {
        return Symbol.load(id);
    }

    public create(id : string, tokenAddress : Address, timestamp : BigInt): void {
        let symbol = this.getNewSymbol(id, tokenAddress, timestamp);
        symbol.save();

        let liminalMarketLogic = new LiminalMarketLogic();
        let liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo();

        let symbols = liminalMarketInfo.symbols!;
        symbols.push(symbol.id);
        liminalMarketInfo.symbols = symbols;
        liminalMarketInfo.symbolCount += 1;
        liminalMarketInfo.save();
    }

    public store(order: Order): void {
        let symbol = Symbol.load(order.symbol)
        if (symbol == null) return;

        symbol.txCount = symbol.txCount.plus(BigInt.fromI32(1));
        symbol.tslWei = NumberHelper.uintPlusOrMinus(order.side, symbol.tslWei, order.filledQtyWei);
        symbol.tsl = NumberHelper.getDecimal(symbol.tslWei);
        symbol.pricePerShareWei = order.filledAvgPriceWei;
        symbol.pricePerShare = NumberHelper.getDecimal(symbol.pricePerShareWei);
        symbol.priceLastUpdated = order.filledAt;
        symbol.valueWei = NumberHelper.times(symbol.tslWei, symbol.pricePerShareWei);
        symbol.value = NumberHelper.getDecimal(symbol.valueWei);

        let wallets = symbol.wallets!;
        wallets.push(order.wallet)
        symbol.wallets = wallets;
        symbol.save();
    }



    public getNewSymbol(id : string, tokenAddress : Address, timestamp : BigInt) : Symbol {
        let symbol = new Symbol(id);
        symbol.contract = tokenAddress.toHex();
        symbol.logo = "https://app.liminal.market/img/logos/" + id.toUpperCase() + ".png";
        symbol.pricePerShare = BigDecimal.fromString("0");
        symbol.pricePerShareWei = BigInt.fromI32(0);
        symbol.priceLastUpdated = BigInt.fromI32(0);
        symbol.created = DateHelper.getJsTimestamp(timestamp);
        symbol.tsl = BigDecimal.fromString("0")
        symbol.tslWei = BigInt.fromI32(0);

        symbol.value = BigDecimal.fromString("0")
        symbol.valueWei = BigInt.fromI32(0)
        symbol.txCount = BigInt.fromI32(0);
        symbol.wallets = new Array<string>();
        return symbol;
    }

}