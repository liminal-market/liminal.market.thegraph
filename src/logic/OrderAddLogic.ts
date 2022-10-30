import {OrderExecuted} from "../../generated/LiminalMarket/LiminalMarket";
import {Order, OrderTrade} from "../../generated/schema";
import LiminalMarketLogic from "./LiminalMarketLogic";
import WalletLogic from "./WalletLogic";
import PositionLogic from "./PositionLogic";
import SymbolLogic from "./SymbolLogic";
import NumberHelper from "../NumberHelper";
import {BigInt, log} from "@graphprotocol/graph-ts";
import DateHelper from "../DateHelper";

export default class OrderAddLogic {
    liminalMarketLogic : LiminalMarketLogic;
    walletLogic : WalletLogic;
    positionLogic : PositionLogic;
    symbolLogic : SymbolLogic;

    constructor() {
        this.liminalMarketLogic = new LiminalMarketLogic();
        this.walletLogic = new WalletLogic();
        this.positionLogic = new PositionLogic();
        this.symbolLogic = new SymbolLogic();
    }

    public addOrder(event: OrderExecuted): Order {
        let liminalMarketInfo = this.liminalMarketLogic.getLiminalMarketInfo();
        let wallet = this.walletLogic.getWallet(event.params.recipient, liminalMarketInfo);

        let order = this.storeOrder(event, wallet.id);

        let position = this.positionLogic.getOrCreatePosition(wallet.id, order);
        this.symbolLogic.store(order);

        this.walletLogic.storeOrderExecuted(wallet, order, position.id, event.transaction.hash.toHex(), event.block.timestamp);
        this.liminalMarketLogic.storeTransaction(liminalMarketInfo, order.filledAt)

        return order;
    }


    private storeOrder(event: OrderExecuted, walletId: string): Order {

        let order = new Order(event.transaction.hash.toHex());
        order.dailyId = DateHelper.getDayId(event.params.filledAt);
        order.hourlyId = DateHelper.getDayId(event.params.filledAt);
        order.symbol = event.params.symbol;
        order.tslWei = event.params.tsl;
        order.tsl = NumberHelper.getDecimal(event.params.tsl);
        order.filledQtyWei = event.params.filledQty;
        order.filledQty = NumberHelper.getDecimal(event.params.filledQty);
        order.filledAvgPriceWei = event.params.filledAvgPrice;
        order.filledAvgPrice = NumberHelper.getDecimal(event.params.filledAvgPrice);
        order.filledAt = event.params.filledAt;
        order.side = event.params.side;
        order.commissionWei = event.params.commission;
        order.commission = NumberHelper.getDecimal(event.params.commission)
        order.aUsdBalanceWei = event.params.aUsdBalance;
        order.aUsdBalance = NumberHelper.getDecimal(event.params.aUsdBalance)
        order.wallet = walletId;
        order.costWei = order.filledQtyWei.times(order.filledAvgPriceWei).div(BigInt.fromI64(10 ** 18));
        order.cost = NumberHelper.getDecimal(order.costWei);
        order.spender = event.params.spender.toHex();
        let tradeId = NumberHelper.getTradeId(order.wallet, order.symbol, order.filledAt, order.filledQtyWei, order.filledAvgPriceWei, order.side);
        order.tradeId = tradeId;
        order.save();

        this.storeOrderTrade(tradeId, order);

        return order;
    }

    private storeOrderTrade(tradeId: string, order: Order) : void {
        let orderTrade = OrderTrade.load(tradeId);
        if (orderTrade == null) {
            orderTrade = new OrderTrade(tradeId);
            orderTrade.orders = new Array<string>();
        }
        let orders = orderTrade.orders!;
        orders.push(order.id);
        orderTrade.orders = orders;
        orderTrade.count = orders.length;
        orderTrade.lastFilledAt = order.filledAt;
        orderTrade.save();
    }
}