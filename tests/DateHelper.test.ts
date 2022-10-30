import {assert, describe, test} from "matchstick-as/assembly/index";
import {BigInt} from "@graphprotocol/graph-ts";
import DateHelper from "../src/DateHelper";

describe('Test DateHelper', () => {

    test('test getJsTimestamp', () => {
        let timestamp = BigInt.fromI64(1666616400);

        let jsTimestamp = DateHelper.getJsTimestamp(timestamp);
        assert.stringEquals('1666616400000', jsTimestamp.toString())

    })


    test('test hourId', () => {
        let dt = BigInt.fromI64(1666616500000); //Monday, 24. October 2022 13:01:40
        let hourId = DateHelper.getHourId(dt);

        //1666616400000 == Monday, 24. October 2022 13:00:00
        assert.stringEquals('1666616400000', hourId.toString())

        dt = BigInt.fromI64(1666619990000); //Monday, 24. October 2022 13:59:50
        hourId = DateHelper.getHourId(dt);

        //1666616400000 == Monday, 24. October 2022 13:00:00
        assert.stringEquals('1666616400000', hourId.toString())

        dt = BigInt.fromI64(1766629990000); //Thursday, 25. December 2025 2:33:10
        hourId = DateHelper.getHourId(dt);

        //1766628000000 == Thursday, 25. December 2025 2:00:00
        assert.stringEquals('1766628000000', hourId.toString())
    })

    test('test dayId', () => {
        let dt = BigInt.fromI64(1666700540000); //Tuesday, 25. October 2022 12:22:20
        let dayId = DateHelper.getDayId(dt);

        //1666656000000 = Tuesday, 25. October 2022 0:00:00
        assert.stringEquals('1666656000000', dayId.toString())

        dt = BigInt.fromI64(1641081599000); //Saturday, 1. January 2022 23:59:59
        dayId = DateHelper.getDayId(dt);

        //1640995200000 = Saturday, 1. January 2022 0:00:00
        assert.stringEquals('1640995200000', dayId.toString())
    })
})