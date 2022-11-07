import {beforeEach, clearStore, describe, test} from "matchstick-as/assembly/index";
import {handleBalanceSet} from "../src/ausd";
import {getBalanceSetEvent, initLiminalMarketInfo} from "./Util";
import {BigInt} from "@graphprotocol/graph-ts";

export {handleBalanceSet}

describe('Test aUSD', () => {
    beforeEach(() => {
        clearStore();
        initLiminalMarketInfo();
    })

    test('Test handleBalanceSet', () => {
        let balanceSetEvent = getBalanceSetEvent(BigInt.fromI32(1039230), 1);

        handleBalanceSet(balanceSetEvent)

    })

})