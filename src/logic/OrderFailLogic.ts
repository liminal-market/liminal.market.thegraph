import {OrderFailed} from "../../generated/LiminalMarket/LiminalMarket";
import {OrderFail} from "../../generated/schema";
import WalletLogic from "./WalletLogic";
import LiminalMarketLogic from "./LiminalMarketLogic";
import {BigInt} from "@graphprotocol/graph-ts";
import NumberHelper from "../NumberHelper";
import SpenderLogic from "./SpenderLogic";
import DateHelper from "../DateHelper";

export default class OrderFailLogic {

    public addFail(event: OrderFailed): OrderFail {
        let liminalMarketLogic = new LiminalMarketLogic();
        let liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo();

        let walletLogic = new WalletLogic();
        let wallet = walletLogic.getWallet(event.params.recipient, liminalMarketInfo);

        let spenderLogic = new SpenderLogic();
        let spender = spenderLogic.getSpender(event.params.spender, liminalMarketInfo);
        spenderLogic.addFail(spender);

        let createdInMilliseconds = DateHelper.getJsTimestamp(event.block.timestamp);
        let orderFail = new OrderFail(event.transaction.hash.toHex());
        orderFail.dailyId = DateHelper.getDayId(createdInMilliseconds);
        orderFail.hourlyId = DateHelper.getHourId(createdInMilliseconds);
        orderFail.symbol = event.params.symbol;
        orderFail.message = event.params.message;
        orderFail.buyingPowerWei = event.params.buyingPower;
        orderFail.buyingPower = NumberHelper.getDecimal(orderFail.buyingPowerWei);
        orderFail.wallet = wallet.id;
        orderFail.spender = spender.id;
        orderFail.created = createdInMilliseconds;
        orderFail.save();

        liminalMarketInfo.orderFailedCount = liminalMarketInfo.orderFailedCount.plus(BigInt.fromI32(1));
        liminalMarketInfo.txCount = liminalMarketInfo.txCount.plus(BigInt.fromI32(1));
        liminalMarketInfo.save();

        return orderFail;
    }





}