import {OrderExecuted, OrderFailed} from "../../generated/LiminalMarket/LiminalMarket";
import {Order, OrderFail, User} from "../../generated/schema";
import PositionLogic from "./PositionLogic";
import SymbolLogic from "./SymbolLogic";
import UserLogic from "./UserLogic";
import LiminalMarketLogic from "./LiminalMarketLogic";
import {BigInt} from "@graphprotocol/graph-ts";
import Helper from "../Helper";

export default class OrderLogic {

    public addFail(event: OrderFailed) : void {
        let orderFail = new OrderFail(event.transaction.hash.toHex());
        orderFail.symbol = event.params.symbol;
        orderFail.message = event.params.message;
        orderFail.costWei = event.params.cost;
        orderFail.cost = Helper.getDecimal(orderFail.costWei);
        orderFail.buyingPowerWei = event.params.buyingPower;
        orderFail.buyingPower = Helper.getDecimal(orderFail.buyingPowerWei);
        orderFail.save();
    }

    public addOrder(event: OrderExecuted): Order {

        let liminalMarketLogic = new LiminalMarketLogic();
        let liminalMarketInfo = liminalMarketLogic.getLiminalMarketInfo();

        let userLogic = new UserLogic();
        let user = userLogic.getUser(event.params.recipient, liminalMarketInfo);
        let order = this.getOrder(event, user);

        let positionLogic = new PositionLogic();
        let position = positionLogic.getOrCreatePosition(user.id, order);

        let symbolLogic = new SymbolLogic();
        symbolLogic.store(order);

        userLogic.store(user, order, order.id, position.id);
        liminalMarketLogic.storeTransaction(liminalMarketInfo, order)

        return order;
    }

    private getOrder(event: OrderExecuted, user: User) : Order {
        let entity = new Order(event.transaction.hash.toHex());
        entity.recipient = event.params.recipient;
        entity.symbol = event.params.symbol;
        entity.qtyWei = event.params.qty;
        entity.qty = Helper.getDecimal(event.params.qty);
        entity.filledQtyWei = event.params.filledQty;
        entity.filledQty = Helper.getDecimal(event.params.filledQty);
        entity.filledAvgPriceWei = event.params.filledAvgPrice;
        entity.filledAvgPrice = Helper.getDecimal(event.params.filledAvgPrice);
        entity.filledAt = event.params.filledAt;
        entity.side = event.params.side;
        entity.commissionWei = event.params.commission;
        entity.commission = Helper.getDecimal(event.params.commission)
        entity.aUsdBalanceAfterOrderWei = event.params.aUsdBalance;
        entity.aUsdBalanceAfterOrder = Helper.getDecimal(event.params.aUsdBalance)
        entity.user = user.id;
        entity.save();
        return entity;
    }



}