import {BigDecimal, BigInt, log} from "@graphprotocol/graph-ts";
import {OrderExecuted} from "../generated/LiminalMarket/LiminalMarket";
import {Order} from "../generated/schema";

export default class Helper {
    public static getDecimal(value: BigInt): BigDecimal {
        return BigDecimal.fromString(value.toString()).div(BigDecimal.fromString("1" + "0".repeat(18)))
    }

    public static getUsdValueWei(order: Order): BigInt {
        return order.filledQtyWei.times(order.filledAvgPriceWei).div(BigInt.fromI64(10 ** 18));
    }

    public static getDayId(timestamp: BigInt): BigInt {
        log.warning('timestamp:{}', [timestamp.toString()])
        let date = new Date(timestamp.toI64());

        let fullYear = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let dayId = Date.UTC(fullYear, month, day);

        return BigInt.fromI64(dayId);
    }

    public static getHourId(timestamp: BigInt): BigInt {
        let date = new Date(timestamp.toI64());

        let fullYear = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let hour = date.getUTCHours();
        let dayId = Date.UTC(fullYear, month, day, hour);

        return BigInt.fromI64(dayId);
    }

}

