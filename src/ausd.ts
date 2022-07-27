import {LiminalMarketInfo} from "../generated/schema"
import {BalanceSet} from "../generated/aUSD/aUSD";
import Helper from "./Helper";
import UserLogic from "./logic/UserLogic";


export function handleBalanceSet(event: BalanceSet): void {
    let liminalMarketInfo = LiminalMarketInfo.load("1");
    if (liminalMarketInfo == null) return;

    let userLogic = new UserLogic();
    let user = userLogic.getUser(event.params.recipient, liminalMarketInfo)
    let currentAmount = user.currentAUsdBalanceWei;
    let diff = event.params.amount.minus(currentAmount);

    let diffDecimal = Helper.getDecimal(diff);

    liminalMarketInfo.tvlAUSD = liminalMarketInfo.tvlAUSD.plus(diffDecimal);
    user.currentAUsdBalanceWei = event.params.amount;
    user.currentAUsdBalance = Helper.getDecimal(user.currentAUsdBalanceWei);

    liminalMarketInfo.save();
    user.save();
}
