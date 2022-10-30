import {Order, Position} from "../../generated/schema";
import {BigDecimal, BigInt, log} from "@graphprotocol/graph-ts";
import DateHelper from "../DateHelper";
import SymbolLogic from "./SymbolLogic";
import NumberHelper from "../NumberHelper";

export default class PositionLogic {


    public getOrCreatePosition(walletId : string, order : Order) : Position {
        let positionId = (walletId + "_" + order.symbol).toString();
        let position = Position.load(positionId);
        if (position == null) {
            position = new Position(positionId);
            position.txCount = BigInt.fromI32(0);
        }
        position.wallet = walletId;
        position.symbol = order.symbol;
        position.tslWei = order.tslWei;
        position.tsl = NumberHelper.getDecimal(position.tslWei);
        position.txCount = position.txCount.plus(BigInt.fromI32(1))
        position.updated = order.filledAt;
        position.save();

        return position;
    }
}