
import {
    NewOwnerOnServiceContract,
    ServiceContractCreated,
    ServiceContractUpdated
} from "../generated/ServiceContract/ServiceContract";
import {ServiceContract} from "../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";
import ServiceContractLogic from "./logic/ServiceContractLogic";

export function handleServiceContractCreated(event : ServiceContractCreated) : void {
    let serviceContractLogic = new ServiceContractLogic();
    serviceContractLogic.create(event);
}

export function handleServiceContractUpdated(event : ServiceContractUpdated) : void {
    let serviceContractLogic = new ServiceContractLogic();
    serviceContractLogic.update(event);
}

export function handleNewOwnerOnServiceContract(event : NewOwnerOnServiceContract) : void {
    let serviceContractLogic = new ServiceContractLogic();
    serviceContractLogic.newOwner(event);

}