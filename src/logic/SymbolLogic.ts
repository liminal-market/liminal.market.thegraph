import {TokenCreated} from "../../generated/LiminalMarket/LiminalMarket";
import {Order, Symbol} from "../../generated/schema";
import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts";
import Helper from "../Helper";
import LiminalMarketLogic from "./LiminalMarketLogic";

export default class SymbolLogic {

    public get(id: string) : Symbol | null {
        return Symbol.load(id);
    }

    public create(event: TokenCreated) : void {
        let symbol = Symbol.load(event.params.symbol)
        if (symbol != null) return;

        this.createSymbol(event.params.symbol, event.params.tokenAddress);

        let liminalMarketLogic = new LiminalMarketLogic();
        let liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo()
        liminalMarketInfo.symbolCount += 1;
        liminalMarketInfo.save();
    }

    public store(order : Order) : void {
        let symbol = Symbol.load(order.symbol)
        if (symbol == null) return;

        log.error('load symbol:{} | tvl:{}', [order.symbol, symbol.tvl.toString()])
        let bigDec = Helper.getDecimal(order.filledQtyWei);
        if (order.side == "sell") {
            symbol.tvlWei = symbol.tvlWei.minus(order.filledQtyWei);
            symbol.tvl = symbol.tvl.minus(bigDec);
        } else {
            symbol.tvlWei = symbol.tvlWei.plus(order.filledQtyWei);
            symbol.tvl = symbol.tvl.plus(bigDec);
        }
        symbol.pricePerShareWei = order.filledAvgPriceWei;
        symbol.pricePerShare = Helper.getDecimal(order.filledAvgPriceWei);
        symbol.priceLastUpdated = order.filledAt;

        symbol.tvlUsdWei = symbol.tvlUsdWei.times(symbol.pricePerShareWei).div(BigInt.fromI64(10 ** 18));
        symbol.tvlUsd = Helper.getDecimal(symbol.tvlWei.times(symbol.pricePerShareWei).div(BigInt.fromI64(10 ** 18)));

        log.error("loadSymbol - symbol:{} | TVL:{} | pricePerShare:{} | tvlUsd:{}", [symbol.id, symbol.tvl.toString(), symbol.pricePerShare.toString(), symbol.tvlUsd.toString()])
        symbol.save();
    }

    public createSymbol(id : string, tokenAddress : Address) : Symbol {
        log.error('create symbol:{}', [id])
        let symbol = new Symbol(id);
        symbol.contract = tokenAddress.toHex();
        symbol.logo = "https://app.liminal.market/img/logos/" + id.toUpperCase() + ".png";

        symbol.pricePerShare = BigDecimal.fromString("0");
        symbol.pricePerShareWei = BigInt.fromI32(0);
        symbol.priceLastUpdated = BigInt.fromI32(0);

        symbol.tvl = BigDecimal.fromString("0")
        symbol.tvlWei = BigInt.fromI32(0);

        symbol.tvlUsd = BigDecimal.fromString("0")
        symbol.tvlUsdWei = BigInt.fromI32(0)
        symbol.txCount = BigInt.fromI32(0);
        symbol.save();
        return symbol;
    }
}