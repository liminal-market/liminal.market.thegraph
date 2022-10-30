import {BalanceSet} from "../generated/aUSD/aUSD";
import AUsdLogic from "./logic/AUsdLogic";


export function handleBalanceSet(event: BalanceSet): void {
    let aUsdLogic = new AUsdLogic();
    aUsdLogic.setBalance(event);
}
