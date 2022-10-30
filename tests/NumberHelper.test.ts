import {assert, describe, test} from "matchstick-as/assembly/index";
import {getBigIntWei} from "./Util";
import NumberHelper from "../src/NumberHelper";
import {BigInt} from "@graphprotocol/graph-ts";

describe('Test NumberHelper', () => {


    test('test getDecimal', () => {
        let weiNumber = getBigIntWei(123);
        let number = NumberHelper.getDecimal(weiNumber);

        assert.stringEquals('123', number.toString())
    })
    test('test getDecimal below 1', () => {
        let weiNumber = BigInt.fromString('2345' + '0'.repeat(14));
        let number = NumberHelper.getDecimal(weiNumber);

        assert.stringEquals('0.2345', number.toString())
    })

    test('test times for two BigInt', () => {
        let weiNumber1 = getBigIntWei(100);
        let weiNumber2 = getBigIntWei(2);

        let newNumber = NumberHelper.times(weiNumber1, weiNumber2)
        assert.stringEquals('200' + '0'.repeat(18), newNumber.toString())
    })

    test('test plusMinus for buy', () => {
        let weiNumber1 = getBigIntWei(100);
        let weiNumber2 = getBigIntWei(2);

        let result = NumberHelper.uintPlusOrMinus('buy', weiNumber1, weiNumber2);
        assert.stringEquals('102' + '0'.repeat(18), result.toString())
    })

    test('test plusMinus for sell', () => {
        let weiNumber1 = getBigIntWei(684);
        let weiNumber2 = getBigIntWei(40);

        let result = NumberHelper.plusOrMinus('sell', weiNumber1, weiNumber2);
        assert.stringEquals('644' + '0'.repeat(18), result.toString())
    })
    test('test plusMinus for sell, should return -1', () => {
        let weiNumber1 = getBigIntWei(35);
        let weiNumber2 = getBigIntWei(40);

        let result = NumberHelper.plusOrMinus('sell', weiNumber1, weiNumber2);
        assert.stringEquals('-5' + '0'.repeat(18), result.toString())
    })

    test('test uintPlusMinus for sell, should be 0', () => {
        let weiNumber1 = getBigIntWei(50);
        let weiNumber2 = getBigIntWei(400);

        let result = NumberHelper.uintPlusOrMinus('sell', weiNumber1, weiNumber2);
        assert.stringEquals('0', result.toString())
    })

})