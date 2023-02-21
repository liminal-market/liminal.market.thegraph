import {OrderExecuted} from "../../generated/LiminalMarket/LiminalMarket";
import {Order} from "../../generated/schema";
import LiminalMarketLogic from "./LiminalMarketLogic";
import WalletLogic from "./WalletLogic";
import PositionLogic from "./PositionLogic";
import SymbolLogic from "./SymbolLogic";
import NumberHelper from "../NumberHelper";
import {BigInt} from "@graphprotocol/graph-ts";
import DateHelper from "../DateHelper";
import ServiceContractLogic from "./ServiceContractLogic";

export default class OrderAddLogic {
    liminalMarketLogic : LiminalMarketLogic;
    walletLogic : WalletLogic;
    positionLogic : PositionLogic;
    symbolLogic : SymbolLogic;
    spenderLogic : ServiceContractLogic;
    serviceContractLogic : ServiceContractLogic;

    constructor() {
        this.liminalMarketLogic = new LiminalMarketLogic();
        this.walletLogic = new WalletLogic();
        this.positionLogic = new PositionLogic();
        this.symbolLogic = new SymbolLogic();
        this.spenderLogic = new ServiceContractLogic();
        this.serviceContractLogic = new ServiceContractLogic();
    }

    public addOrder(event: OrderExecuted): Order {
        let liminalMarketInfo = this.liminalMarketLogic.getLiminalMarketInfo();
        let wallet = this.walletLogic.getWallet(event.params.recipient, liminalMarketInfo);
        let serviceContract = this.serviceContractLogic.getServiceContract(event.params.spender);

        let order = this.storeOrder(event, wallet.id, serviceContract.id);

        let position = this.positionLogic.getOrCreatePosition(wallet.id, order);
        this.symbolLogic.store(order);

        this.walletLogic.storeOrderExecuted(wallet, order, position.id, event.transaction.hash.toHex(), event.block.timestamp);
        this.liminalMarketLogic.storeTransaction(liminalMarketInfo, order.filledAt)
        this.serviceContractLogic.addOrder(event, order);

        return order;
    }


    private storeOrder(event: OrderExecuted, walletId: string, serviceContractId : string): Order {

        let order = new Order(event.params.orderId);
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
        order.serviceFeeWei = event.params.serviceFee;
        order.serviceFee = NumberHelper.getDecimal(event.params.serviceFee)
        order.aUsdBalanceWei = event.params.aUsdBalance;
        order.aUsdBalance = NumberHelper.getDecimal(event.params.aUsdBalance)
        order.wallet = walletId;
        order.costWei = order.filledQtyWei.times(order.filledAvgPriceWei).div(BigInt.fromI64(10 ** 18));
        order.cost = NumberHelper.getDecimal(order.costWei);
        order.serviceContract = serviceContractId;
        order.transactionHash = event.transaction.hash.toHexString();
        order.save();
        return order;
    }

}