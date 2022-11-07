import {assert, beforeEach, clearStore, describe, test} from "matchstick-as/assembly/index";
import AUsdLogic from "../../src/logic/AUsdLogic";
import {
    getBalanceSetEvent,
    getBigIntWei,
    initLiminalMarketInfo,
    WalletAddress,
    WalletAddress2
} from "../Util";
import {Address, BigInt, log} from "@graphprotocol/graph-ts";
import NumberHelper from "../../src/NumberHelper";
import DateHelper from "../../src/DateHelper";
import {WalletHistory} from "../../generated/schema";


describe('Test AUsdLogic', () => {

    beforeEach(() => {
        clearStore();
        initLiminalMarketInfo();
    })

    test('Test setBalance for 1 wallet, action fund', () => {
        let balanceWei = getBigIntWei(150);
        let walletAddress = WalletAddress;
        let event = getBalanceSetEvent(balanceWei, 1, walletAddress)

        let aUsdLogic = new AUsdLogic();
        aUsdLogic.setBalance(event);

        let timestamp = DateHelper.getJsTimestamp(event.block.timestamp);
        validateStorage(balanceWei, balanceWei, 1, 'Fund', timestamp, event.transaction.hash.toHex()
            , walletAddress, '150', [event.transaction.hash.toHex()])
    })


    test('Test setBalance for 1 wallet, calling setBalance 3 times with different prices, add balance and lower balance', () => {
        let walletAddress = WalletAddress;

        let balanceWei = getBigIntWei(500);
        let event = getBalanceSetEvent(balanceWei, 1, walletAddress)
        let timestamp = DateHelper.getJsTimestamp(event.block.timestamp);

        let aUsdLogic = new AUsdLogic();
        aUsdLogic.setBalance(event);

        validateStorage(balanceWei, balanceWei, 1, 'Fund', timestamp, event.transaction.hash.toHex()
            , walletAddress, '500', [event.transaction.hash.toHex()])

        let balanceWei2 = getBigIntWei(736);
        let event2 = getBalanceSetEvent(balanceWei2, 2, walletAddress)
        let timestamp2 = DateHelper.getJsTimestamp(event2.block.timestamp);

        aUsdLogic.setBalance(event2);

        validateStorage(balanceWei2, balanceWei2, 2, 'OrderBuy', timestamp2, event2.transaction.hash.toHex()
            , walletAddress, '236', [event.transaction.hash.toHex(), event2.transaction.hash.toHex()])

        let balanceWei3 = getBigIntWei(131);
        let event3 = getBalanceSetEvent(balanceWei3, 3, walletAddress)
        let timestamp3 = DateHelper.getJsTimestamp(event3.block.timestamp);

        aUsdLogic.setBalance(event3);

        validateStorage(balanceWei3, balanceWei3, 3, 'OrderSell', timestamp3, event3.transaction.hash.toHex()
            , walletAddress, '-605', [event.transaction.hash.toHex(), event2.transaction.hash.toHex(), event3.transaction.hash.toHex()])
    })

    test('Test setBalance for 2 wallets, calling setBalance 3 times with different prices on each wallet, add balance and lower balance', () => {
        let walletAddress = WalletAddress;
        let walletAddress2 = WalletAddress2;

        let balanceWei = getBigIntWei(10500);
        let event = getBalanceSetEvent(balanceWei, 1, walletAddress)
        let timestamp = DateHelper.getJsTimestamp(event.block.timestamp);
        let liminalMarketBalance = balanceWei;

        let aUsdLogic = new AUsdLogic();
        aUsdLogic.setBalance(event);

        validateStorage(liminalMarketBalance, balanceWei, 1, 'Fund', timestamp, event.transaction.hash.toHex()
            , walletAddress, '10500', [event.transaction.hash.toHex()])

        let balanceWei2 = getBigIntWei(23500);
        let event2 = getBalanceSetEvent(balanceWei2, 4, walletAddress2)
        let timestamp2 = DateHelper.getJsTimestamp(event2.block.timestamp);
        let liminalMarketBalance2 = balanceWei2.plus(getBigIntWei(10500));

        aUsdLogic.setBalance(event2);

        validateStorage(liminalMarketBalance2, balanceWei2, 4, 'OrderExecuted', timestamp2, event2.transaction.hash.toHex()
            , walletAddress2, '23500', [event2.transaction.hash.toHex()])

        let balanceWei3 = getBigIntWei(12687);
        let event3 = getBalanceSetEvent(balanceWei3, 2, walletAddress2)
        let timestamp3 = DateHelper.getJsTimestamp(event3.block.timestamp);
        let liminalMarketBalance3 = balanceWei3.plus(getBigIntWei(10500));

        aUsdLogic.setBalance(event3);

        validateStorage(liminalMarketBalance3, balanceWei3, 2, 'OrderBuy', timestamp3, event3.transaction.hash.toHex()
            , walletAddress2, '-10813', [event2.transaction.hash.toHex(), event3.transaction.hash.toHex()])

        let balanceWei4 = getBigIntWei(50123);
        let event4 = getBalanceSetEvent(balanceWei4, 3, walletAddress)
        let timestamp4 = DateHelper.getJsTimestamp(event4.block.timestamp);
        let liminalMarketBalance4 = balanceWei4.plus(getBigIntWei(12687));

        aUsdLogic.setBalance(event4);
        validateStorage(liminalMarketBalance4, balanceWei4, 3, 'OrderSell', timestamp4, event4.transaction.hash.toHex()
            , walletAddress, '39623',
            [event.transaction.hash.toHex(), event4.transaction.hash.toHex()])

        let balanceWei5 = getBigIntWei(500);
        let event5 = getBalanceSetEvent(balanceWei5, 1, walletAddress2)
        let timestamp5 = DateHelper.getJsTimestamp(event5.block.timestamp);
        let liminalMarketBalance5 = balanceWei5.plus(getBigIntWei(50123));

        aUsdLogic.setBalance(event5);
        validateStorage(liminalMarketBalance5, balanceWei5, 1, 'Fund', timestamp5, event5.transaction.hash.toHex()
            , walletAddress2, '-12187',
            [event2.transaction.hash.toHex(), event3.transaction.hash.toHex()
                , event5.transaction.hash.toHex()])
    })


})


function validateStorage(
    liminalMarketInfoBalanceWei: BigInt,
    walletBalanceWei: BigInt,
    // @ts-ignore
    walletHistoryAction : i32,
    walletHistoryActionName : string,
    timestamp: BigInt,
    walletHistoryId: string,
    walletAddress: Address,
    walletHistoryDiff: string,
    walletHistoryArray: Array<string>
) : void {
    let history = getHistoryArrayString(walletHistoryArray);

    assert.fieldEquals('LiminalMarketInfo', '1', 'balanceWei', liminalMarketInfoBalanceWei.toString())
    assert.fieldEquals('LiminalMarketInfo', '1', 'balance', NumberHelper.getDecimal(liminalMarketInfoBalanceWei).toString())

    assert.fieldEquals('Wallet', walletAddress.toHex(), 'balanceWei', walletBalanceWei.toString())
    assert.fieldEquals('Wallet', walletAddress.toHex(), 'balance', NumberHelper.getDecimal(walletBalanceWei).toString())
    assert.fieldEquals('Wallet', walletAddress.toHex(), 'updated', timestamp.toString())
    assert.fieldEquals('Wallet', walletAddress.toHex(), 'history', '[' + history + ']')

    assert.fieldEquals('WalletHistory', walletHistoryId, 'wallet', walletAddress.toHex());
    assert.fieldEquals('WalletHistory', walletHistoryId, 'balanceWei', walletBalanceWei.toString());
    assert.fieldEquals('WalletHistory', walletHistoryId, 'balance', NumberHelper.getDecimal(walletBalanceWei).toString());
    assert.fieldEquals('WalletHistory', walletHistoryId, 'diffWei', walletHistoryDiff + '0'.repeat(18));
    assert.fieldEquals('WalletHistory', walletHistoryId, 'diff', walletHistoryDiff);
    assert.fieldEquals('WalletHistory', walletHistoryId, 'created', timestamp.toString());
    assert.fieldEquals('WalletHistory', walletHistoryId, 'action', walletHistoryAction.toString());
    assert.fieldEquals('WalletHistory', walletHistoryId, 'actionName', walletHistoryActionName);
    assert.fieldEquals('WalletHistory', walletHistoryId, 'createdISO', new Date(timestamp.toI64()).toISOString());
}

function getHistoryArrayString(walletHistoryArray : Array<string>) : string {
    let str = '';
    for (let i = 0; i < walletHistoryArray.length; i++) {
        if (str != '') str += ', '
        str += walletHistoryArray[i];
    }
    return str;
}
