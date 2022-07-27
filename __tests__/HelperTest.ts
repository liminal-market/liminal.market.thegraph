import Helper from "../src/Helper";
import {BigInt} from "@graphprotocol/graph-ts";


describe("test", () => {
    it("sh", () => {
        let date = new Date("2022-07-27T14:01")

        let ble = Helper.getDayInfo(BigInt.fromI64(date.getTime()))
        expect(ble).toBe("12")

    })
})