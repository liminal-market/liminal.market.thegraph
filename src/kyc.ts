import {Account} from "../generated/schema";
import {AccountValidated} from "../generated/KYC/KYC";


export function handleAccountValidated(event : AccountValidated) : void {
    let av = new Account(event.transaction.hash.toHex());
    av.accountId = event.params.accountId;
    av.walletAddress = event.params.walletAddress.toHexString();
    av.save();
}