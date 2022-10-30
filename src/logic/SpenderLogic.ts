import {LiminalMarketInfo, Spender} from "../../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";

export default class SpenderLogic {

    public getSpender(spenderAddress: Address, liminalMarketInfo: LiminalMarketInfo): Spender {
        let spender = Spender.load(spenderAddress.toHex());
        if (spender == null) {
            spender = new Spender(spenderAddress.toHex());
            spender.txCount = BigInt.fromI32(0);
            spender.orderExecutedCount = BigInt.fromI32(0);
            spender.orderFailedCount = BigInt.fromI32(0);

            liminalMarketInfo.spenderCount += 1;
        }
        return spender;
    }

    public addFail(spender: Spender) : void {
        spender.txCount = spender.txCount.plus(BigInt.fromI32(1));
        spender.orderFailedCount = spender.orderFailedCount.plus(BigInt.fromI32(1));
        spender.save();
    }

}