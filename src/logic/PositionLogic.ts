import {Order, Position} from "../../generated/schema";
import {BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import Helper from "../Helper";
import SymbolLogic from "./SymbolLogic";

export default class PositionLogic {


    public getOrCreatePosition(userId : string, entity : Order) : Position {
        let positionId = (userId + "_" + entity.symbol).toString();
        let position = Position.load(positionId);
        if (position == null) {
            position = new Position(positionId);
            position.aUSDAmountWei = BigInt.fromI32(0);
            position.aUSDAmount = BigDecimal.fromString("0");
        }
        position.user = userId;
        position.symbol = entity.symbol;
        position.changedAt = entity.filledAt;
        position.qtyWei = entity.qtyWei;
        position.qty = Helper.getDecimal(position.qtyWei);

        let symbolLogic = new SymbolLogic();
        let symbol = symbolLogic.get(entity.symbol);
        if (symbol) {
            position.pricePerShareWei = symbol.pricePerShareWei;
            position.pricePerShare = symbol.pricePerShare;
            position.priceLastUpdated = symbol.priceLastUpdated;

            position.aUSDAmountWei = position.qtyWei.times(symbol.pricePerShareWei).div(BigInt.fromI64(10**18))
            position.aUSDAmount = Helper.getDecimal(position.aUSDAmountWei);
        }
        position.save();

        return position;
    }
}