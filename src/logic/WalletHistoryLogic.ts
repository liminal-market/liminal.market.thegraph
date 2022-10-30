import {WalletHistory} from "../../generated/schema";
import NumberHelper from "../NumberHelper";
import {BigInt, log} from "@graphprotocol/graph-ts";
import DateHelper from "../DateHelper";

export default class WalletHistoryLogic {
    static BalanceSet: string = 'BalanceSet';
    static OrderExecuted: string = 'OrderExecuted';

    public add(transactionId: string, walletId: string, balanceWei: BigInt, currentBalanceWei: BigInt, action: string, createdInSeconds: BigInt): WalletHistory {
        let diffWei = balanceWei.minus(currentBalanceWei);
        let createdInMilliseconds = DateHelper.getJsTimestamp(createdInSeconds);

        let walletHistory = new WalletHistory(transactionId);
        walletHistory.dailyId = DateHelper.getDayId(createdInMilliseconds);
        walletHistory.hourlyId = DateHelper.getHourId(createdInMilliseconds)
        walletHistory.wallet = walletId;
        walletHistory.balanceWei = balanceWei;
        walletHistory.balance = NumberHelper.getDecimal(balanceWei);
        walletHistory.diffWei = diffWei
        walletHistory.diff = NumberHelper.getDecimal(diffWei);
        walletHistory.action = action;
        walletHistory.created = createdInMilliseconds;
        walletHistory.createdISO = new Date(createdInMilliseconds.toI64()).toISOString();
        walletHistory.save();
        return walletHistory;
    }
}