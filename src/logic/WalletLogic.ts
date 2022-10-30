import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import {LiminalMarketInfo, Order, Wallet, WalletHistory} from "../../generated/schema";
import NumberHelper from "../NumberHelper";
import WalletHistoryLogic from "./WalletHistoryLogic";
import DateHelper from "../DateHelper";

export default class WalletLogic {


    public getNewWallet(id : string) : Wallet {
        let wallet = new Wallet(id);
        wallet.balance = BigDecimal.fromString("0");
        wallet.balanceWei = BigInt.fromI32(0);
        wallet.lastOrderAt = BigInt.fromI32(0);
        wallet.txCount = BigInt.fromI32(0);
        wallet.updated = BigInt.fromI32(0);
        wallet.orders = new Array<string>()
        wallet.orderFails = new Array<string>();
        wallet.positions = new Array<string>();
        wallet.history = new Array<string>();
        return wallet;
    }


    public getWallet(recipient: Address, liminalMarketInfo: LiminalMarketInfo): Wallet {
        let wallet = Wallet.load(recipient.toHex())
        if (wallet == null) {
            wallet = this.getNewWallet(recipient.toHex())
            liminalMarketInfo.walletCount += 1;
        }
        return wallet;
    }

    public storeBalanceSet(wallet : Wallet, balanceWei : BigInt, updated : BigInt, historyId : string) : void {
        wallet.balanceWei = balanceWei;
        wallet.balance = NumberHelper.getDecimal(balanceWei);
        wallet.updated = DateHelper.getJsTimestamp(updated);

        let history = wallet.history!;
        history.push(historyId);
        wallet.history = history;

        wallet.save();
    }

    public storeOrderExecuted(wallet : Wallet, order : Order, positionId : string, transactionId : string, created : BigInt) : void {
        let walletHistoryLogic = new WalletHistoryLogic();
        let walletHistory = walletHistoryLogic.add(transactionId, wallet.id, order.aUsdBalanceWei,
                                                wallet.balanceWei, WalletHistoryLogic.OrderExecuted, created);

        let history = wallet.history!;
        history.push(walletHistory.id);
        wallet.history = history;

        let positions = wallet.positions!;
        positions.push(positionId);
        wallet.positions = positions;

        let orders = wallet.orders!;
        orders.push(order.id);
        wallet.orders = orders;

        wallet.txCount = wallet.txCount.plus(BigInt.fromI32(1));
        wallet.lastOrderAt = DateHelper.getJsTimestamp(created);
        wallet.updated = DateHelper.getJsTimestamp(created);
        wallet.balanceWei = order.aUsdBalanceWei;
        wallet.balance = NumberHelper.getDecimal(wallet.balanceWei);
        wallet.save();
    }



}