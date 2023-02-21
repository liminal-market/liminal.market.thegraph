import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import {Order, ServiceContract, ServiceContractByDay} from "../../generated/schema";
import DateHelper from "../DateHelper";
import {OrderExecuted, OrderFailed} from "../../generated/LiminalMarket/LiminalMarket";
import {
    NewOwnerOnServiceContract,
    ServiceContractCreated,
    ServiceContractUpdated
} from "../../generated/ServiceContract/ServiceContract";
import { log } from '@graphprotocol/graph-ts'
import NumberHelper from "../NumberHelper";
export default class ServiceContractLogic {


    public addFail(event : OrderFailed): void {
        let serviceContract = ServiceContract.load(event.params.spender.toHexString());
        if (!serviceContract) return;

        serviceContract.orderFailedCount = serviceContract.orderFailedCount.plus(BigInt.fromI32(1));
        serviceContract.txCount = serviceContract.txCount.plus(BigInt.fromI32(1))
        serviceContract.save();
    }


    public addOrder(event: OrderExecuted, order : Order) : void {

        let serviceContract = ServiceContract.load(event.params.spender.toHexString());

        if (!serviceContract) return;

        let percentage = serviceContract.serviceFeePoints.toBigDecimal().div(serviceContract.serviceFeePoints.plus(BigInt.fromI32(200)).toBigDecimal())

        let serviceFeeWei = BigDecimal.fromString(event.params.serviceFee.toBigDecimal().times(percentage).toString()).truncate(0);

        serviceContract.totalServiceFeeWei = serviceContract.totalServiceFeeWei.plus(serviceFeeWei.digits);
        serviceContract.totalServiceFee = NumberHelper.getDecimal(serviceContract.totalServiceFeeWei);
        serviceContract.orderExecutedCount = serviceContract.orderExecutedCount.plus(BigInt.fromI32(1))
        serviceContract.txCount = serviceContract.txCount.plus(BigInt.fromI32(1))
        serviceContract.save();

        let dayId = DateHelper.getDayId(event.params.filledAt).toString()
        let serviceContractByDay = ServiceContractByDay.load(event.params.spender.toHexString() + '_' + dayId)
        if (!serviceContractByDay) {
            serviceContractByDay = new ServiceContractByDay(event.params.spender.toHexString() + '_' + dayId);
            serviceContractByDay.serviceContract = event.params.spender.toHexString();
            serviceContractByDay.serviceFeeWei = BigInt.fromI32(0)
            serviceContractByDay.serviceFee = BigDecimal.zero();
            serviceContractByDay.date = event.params.filledAt;
            serviceContractByDay.dateISO = DateHelper.toIso(event.params.filledAt);
            serviceContractByDay.orders = new Array<string>();
        }
        serviceContractByDay.serviceFeeWei = serviceContractByDay.serviceFeeWei.plus(serviceFeeWei.digits);
        serviceContractByDay.serviceFee = NumberHelper.getDecimal(serviceContractByDay.serviceFeeWei);
        let orders = serviceContractByDay.orders!;
        orders.push(order.id)
        serviceContractByDay.orders = orders;

        serviceContractByDay.save();

    }


    public create(event: ServiceContractCreated) : void {
        let sc = new ServiceContract(event.params.contractAddress.toHexString());
        sc.owner = event.params.owner.toHexString();
        sc.contractAddress = event.params.contractAddress.toHexString();
        sc.serviceFeeAddress = event.params.serviceFeeAddress.toHexString();
        sc.serviceFeePoints = event.params.serviceFeePoints;
        sc.totalServiceFeeWei = BigInt.fromI32(0);
        sc.totalServiceFee = BigDecimal.zero();
        sc.name = event.params.name;
        sc.url = event.params.url;
        sc.txCount = BigInt.fromI32(0);
        sc.orderExecutedCount = BigInt.fromI32(0)
        sc.orderFailedCount = BigInt.fromI32(0);
        sc.save();
    }

    public update(event: ServiceContractUpdated) : void {
        let sc = ServiceContract.load(event.params.contractAddress.toHexString());
        if (!sc) return;

        sc.owner = event.params.owner.toHexString();
        sc.contractAddress = event.params.contractAddress.toHexString();
        sc.serviceFeeAddress = event.params.serviceFeeAddress.toHexString();
        sc.serviceFeePoints = event.params.serviceFeePoints;

        sc.name = event.params.name;
        sc.url = event.params.url;
        sc.save();

    }

    public newOwner(event: NewOwnerOnServiceContract) : void {
        let sc = ServiceContract.load(event.params.contractAddress.toHexString());
        if (!sc) return;

        sc.owner = event.params.newOwner.toHexString();
        sc.save();
    }

    public getServiceContract(spender: Address) : ServiceContract {
        let sc = ServiceContract.load(spender.toHexString())!;
        return sc;
    }
}