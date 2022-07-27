import {LiminalMarketInfo, Order} from "../../generated/schema";
import {BigDecimal, BigInt, log} from "@graphprotocol/graph-ts";
import Helper from "../Helper";

export default class LiminalMarketLogic {
    public getLiminalMarketInfo(): LiminalMarketInfo {
        let liminalMarketInfo = LiminalMarketInfo.load("1");
        if (liminalMarketInfo == null) {
            liminalMarketInfo = new LiminalMarketInfo("1");
            liminalMarketInfo.symbolCount = 0;
            liminalMarketInfo.userCount = 0;
            liminalMarketInfo.txCount = BigInt.fromI32(0);

            liminalMarketInfo.tvlAUSDWei = BigInt.fromI32(0)
            liminalMarketInfo.tvlAUSD = BigDecimal.fromString("0");
            liminalMarketInfo.tvlSymbolUSD = BigDecimal.fromString("0");
            liminalMarketInfo.tvlSymbolUSDWei = BigInt.fromI32(0);
            liminalMarketInfo.lastOrderAt = BigInt.fromI32(0);
        }
        return liminalMarketInfo;
    }

    public storeTransaction(liminalMarketInfo: LiminalMarketInfo, entity: Order): void {

        let bigUsdValue = Helper.getUsdValueWei(entity);
        if (entity.side == 'sell') {
            liminalMarketInfo.tvlSymbolUSDWei = liminalMarketInfo.tvlSymbolUSDWei.minus(bigUsdValue);
        } else {
            liminalMarketInfo.tvlSymbolUSDWei = liminalMarketInfo.tvlSymbolUSDWei.plus(bigUsdValue)
        }
        liminalMarketInfo.tvlSymbolUSD = Helper.getDecimal(liminalMarketInfo.tvlSymbolUSDWei);
        log.error('handleOrderExecuted - symbol:{} | after tvlSymbolUSD:{}', [entity.symbol, liminalMarketInfo.tvlSymbolUSD.toString()])
        liminalMarketInfo.lastOrderAt = entity.filledAt;
        liminalMarketInfo.txCount = liminalMarketInfo.txCount.plus(BigInt.fromI32(1));
        liminalMarketInfo.save();
    }
}