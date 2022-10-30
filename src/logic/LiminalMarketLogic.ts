import {LiminalMarketInfo, Order} from "../../generated/schema";
import {BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import SymbolLogic from "./SymbolLogic";
import NumberHelper from "../NumberHelper";

export default class LiminalMarketLogic {

    public getNewLiminalMarketInfo(): LiminalMarketInfo {
        let liminalMarketInfo = new LiminalMarketInfo('1');
        liminalMarketInfo.symbolCount = 0;
        liminalMarketInfo.walletCount = 0;
        liminalMarketInfo.spenderCount = 0;
        liminalMarketInfo.txCount = BigInt.fromI32(0);
        liminalMarketInfo.orderExecutedCount = BigInt.fromI32(0);
        liminalMarketInfo.orderFailedCount = BigInt.fromI32(0);
        liminalMarketInfo.balanceWei = BigInt.fromI32(0)
        liminalMarketInfo.balance = BigDecimal.fromString("0");
        liminalMarketInfo.valueWei = BigInt.fromI32(0);
        liminalMarketInfo.value = BigDecimal.fromString("0");
        liminalMarketInfo.tslWei = BigInt.fromI32(0);
        liminalMarketInfo.tsl = BigDecimal.fromString('0');
        liminalMarketInfo.lastOrderAt = BigInt.fromI32(0);
        liminalMarketInfo.symbols = new Array<string>();
        return liminalMarketInfo;
    }

    public getLiminalMarketInfo(): LiminalMarketInfo {
        let liminalMarketInfo = LiminalMarketInfo.load("1");
        if (liminalMarketInfo == null) {
            liminalMarketInfo = this.getNewLiminalMarketInfo();
        }
        return liminalMarketInfo;
    }

    public storeTransaction(liminalMarketInfo: LiminalMarketInfo, filledAt : BigInt): void {
        let symbolLogic = new SymbolLogic();
        let currentValueWei = BigInt.fromI32(0);
        let currentTslWei = BigInt.fromI32(0);

        liminalMarketInfo.lastOrderAt = filledAt;
        liminalMarketInfo.txCount = liminalMarketInfo.txCount.plus(BigInt.fromI32(1));

        let symbols = liminalMarketInfo.symbols!;
        for (let i = 0; i < symbols.length; i++) {
            let symbol = symbolLogic.get(symbols[i]);
            if (!symbol) continue;

            currentTslWei = currentTslWei.plus(symbol.tslWei)
            currentValueWei = currentValueWei.plus(symbol.valueWei);
        }
        liminalMarketInfo.tslWei = currentTslWei;
        liminalMarketInfo.tsl = NumberHelper.getDecimal(currentTslWei);
        liminalMarketInfo.valueWei = currentValueWei;
        liminalMarketInfo.value = NumberHelper.getDecimal(currentValueWei);
        liminalMarketInfo.save();
    }
}