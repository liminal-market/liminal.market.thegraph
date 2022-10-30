import {BigDecimal, BigInt, Bytes, crypto} from "@graphprotocol/graph-ts";

export default class NumberHelper {

    public static getDecimal(value: BigInt): BigDecimal {
        return BigDecimal.fromString(value.toString()).div(BigDecimal.fromString("1" + "0".repeat(18)))
    }

    public static times(v1: BigInt, v2: BigInt): BigInt {
        return v1.times(v2).div(BigInt.fromI64(10 ** 18))
    }

    public static getTradeId(wallet: string, symbol: string, filledAt: BigInt, filledQtyWei: BigInt, filledAvgPriceWei: BigInt, side: string): string {
        return crypto.keccak256(Bytes.fromUTF8(wallet + symbol + filledAt.toString() + filledQtyWei.toString() + filledAvgPriceWei.toString() + side))
            .toHex();
    }

    public static uintPlusOrMinus(side: string, v1: BigInt, v2: BigInt): BigInt {
        let result = this.plusOrMinus(side, v1, v2);
        if (result.le(BigInt.fromI32(0))) return BigInt.fromI32(0);
        return result;
    }

    public static plusOrMinus(side: string, v1: BigInt, v2: BigInt): BigInt {
        if (side == 'sell') {
            return v1.minus(v2);
        }
        return v1.plus(v2);
    }
}