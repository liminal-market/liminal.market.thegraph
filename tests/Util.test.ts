import {describe, test, assert} from "matchstick-as/assembly/index";
import {getBigIntWei} from "./Util";


describe('Test Util class', () => {

    test('make sure amount is correct', () => {
        let amount = 150;
        assert.stringEquals(getBigIntWei(amount).toString(), amount.toString() + "0".repeat(18))

    })

})