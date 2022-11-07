import {BalanceSet} from "../../generated/aUSD/aUSD";
import {LiminalMarketInfo} from "../../generated/schema";
import WalletLogic from "./WalletLogic";
import NumberHelper from "../NumberHelper";
import DateHelper from "../DateHelper";
import WalletHistoryLogic from "./WalletHistoryLogic";
export default class AUsdLogic {

    public setBalance(event: BalanceSet) : void {
        let liminalMarketInfo = LiminalMarketInfo.load("1");
        if (liminalMarketInfo == null) return;

        let walletLogic = new WalletLogic();
        let wallet = walletLogic.getWallet(event.params.recipient, liminalMarketInfo);

        let walletHistoryLogic = new WalletHistoryLogic();
        let walletHistory = walletHistoryLogic.add(event.transaction.hash.toHex(), wallet.id,
                    event.params.balance, wallet.balanceWei, event.params.action, event.block.timestamp)

        walletLogic.storeBalanceSet(wallet, event.params.balance, event.block.timestamp, walletHistory.id);

        liminalMarketInfo.balanceWei = liminalMarketInfo.balanceWei.plus(walletHistory.diffWei);
        liminalMarketInfo.balance = NumberHelper.getDecimal(liminalMarketInfo.balanceWei);
        liminalMarketInfo.save();
    }

}