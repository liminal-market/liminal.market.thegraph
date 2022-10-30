import {BigInt} from "@graphprotocol/graph-ts";

export default class DateHelper {

    public static getJsTimestamp(timestamp : BigInt) : BigInt {
        return BigInt.fromI64(timestamp.times(BigInt.fromI32(1000)).toI64());
    }

    public static getDayId(timestampInMilliseconds: BigInt): BigInt {

        let date = new Date(timestampInMilliseconds.toI64());

        let fullYear = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let dayId = Date.UTC(fullYear, month, day);

        return BigInt.fromI64(dayId);
    }

    public static getHourId(timestampInMilliseconds: BigInt): BigInt {
        let date = new Date(timestampInMilliseconds.toI64());

        let fullYear = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let day = date.getUTCDate();
        let hour = date.getUTCHours();
        let hourId = Date.UTC(fullYear, month, day, hour);

        return BigInt.fromI64(hourId);
    }

}

