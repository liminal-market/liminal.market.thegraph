import {Address, BigInt, Bytes, ethereum, store} from "@graphprotocol/graph-ts";
import {OrderExecuted, OrderFailed, TokenCreated} from "../generated/LiminalMarket/LiminalMarket";
import {newMockEvent} from "matchstick-as";
import {LiminalMarketInfo, Order, ServiceContract } from "../generated/schema";
import LiminalMarketLogic from "../src/logic/LiminalMarketLogic";
import {BalanceSet} from "../generated/aUSD/aUSD";
import NumberHelper from "../src/NumberHelper";
import {ServiceContractCreated} from "../generated/ServiceContract/ServiceContract";

export let WalletAddress = Address.fromString('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
export let WalletAddress2 = Address.fromString('0x90F79bf6EB2c4f870365E785982E1f101E93b906');
let nonce = BigInt.fromI32(1);

// @ts-ignore
export function getFakeOrder(symbol : string, side : string, filledQty : i64, avgPrice : i64, tslWei: i64 = 0) : Order {
    let multiplier = BigInt.fromI64(10).pow(18);
    let order = new Order(nonce.toString());
    order.symbol = symbol;
    order.side = side;
    order.tslWei = BigInt.fromI64(tslWei).times(multiplier);
    order.filledQtyWei = BigInt.fromI64(filledQty).times(multiplier);
    order.filledAvgPriceWei = BigInt.fromI64(avgPrice).times(multiplier);
    order.costWei = NumberHelper.times(order.filledQtyWei, order.filledAvgPriceWei);
    order.filledAt = BigInt.fromI32(2);
    order.wallet = WalletAddress2.toHex();

    nonce = nonce.plus(BigInt.fromI32(1))
    return order;
}

export function initLiminalMarketInfo(): LiminalMarketInfo {
    nonce = BigInt.fromI32(0);
    let liminalMarketLogic = new LiminalMarketLogic();
    let liminalMarketInfo = liminalMarketLogic.getNewLiminalMarketInfo();

    store.set('LiminalMarketInfo', '1', liminalMarketInfo);
    return liminalMarketInfo;
}

export function getLiminalMarketInfo(): LiminalMarketInfo {
    return store.get('LiminalMarketInfo', '1') as LiminalMarketInfo;
}

export function getSpender(address: Address): ServiceContract {
    return store.get('ServiceContract', address.toHex()) as ServiceContract;
}

export function getStringParam(key: string, value: string): ethereum.EventParam {
    return new ethereum.EventParam(key, ethereum.Value.fromString(value));
}

export function getBigIntParam(key: string, value: BigInt): ethereum.EventParam {
    return new ethereum.EventParam(key, ethereum.Value.fromUnsignedBigInt(value));
}
// @ts-ignore
export function geti32Param(key: string, value: i32): ethereum.EventParam {
    return new ethereum.EventParam(key, ethereum.Value.fromI32(value));
}
export function getAddressParam(key: string, value: Address): ethereum.EventParam {
    return new ethereum.EventParam(key, ethereum.Value.fromAddress(value));
}

export function getSymbolAddressParam(key: string, value: string): ethereum.EventParam {
    let mockSymbol = getSymbolAddress(value);
    let param = new ethereum.EventParam(key, ethereum.Value.fromAddress(mockSymbol.contract));
    return param;
}

export function getSymbolAddress(key: string): MockSymbol {
    let symbols = getSymbols();
    for (let i = 0; i < symbols.length; i++) {
        if (symbols[i].id == key) {
            return symbols[i]
        }
    }
    throw new Error('Could not find symbol: ' + key)
}

// @ts-ignore
export function getBigIntWei(amount: i64): BigInt {
    let multiplier = BigInt.fromI64(10).pow(18);
    return BigInt.fromI64(amount).times(multiplier);
}


function getNextTimestamp(): BigInt {
    nonce = nonce.plus(BigInt.fromI32(1));
    return nonce;
}

let hashArray = ['0xb25a7ba7c6e0dac2e7a685be3986503c12def933', '0x78a362a9c92a9226ff2f892a100423b79d36b5ae',
    '0x08fdd536b1714ba8667e2a433b387fad3422b118',
    '0xf02dda19c289825965bb5fc029ba4df977854839',
    '0xb25a7ba7c6e0dac2e7a685be3986503c12def933',
    '0x95667f0ea09824c81cb3f85b2aec86def2bcaf57',
    '0x7912d49076a36c722ae9e2379eecd203edae4244',
    '0x2bd080b91a7a510afcf0d5610922de875bd66223'
]

// @ts-ignore
export function getBalanceSetEvent(balance: BigInt, action : i32, recipient: Address = WalletAddress): BalanceSet {
    // @ts-ignore
    let balanceSet = changetype<BalanceSet>(newMockEvent());
    balanceSet.parameters = new Array<ethereum.EventParam>();
    balanceSet.parameters.push(getAddressParam('recipient', recipient));
    balanceSet.parameters.push(getBigIntParam('balance', balance));
    balanceSet.parameters.push(geti32Param('action', action));
    balanceSet.block.timestamp = getNextTimestamp();
    balanceSet.transaction.hash = Address.fromString(hashArray[nonce.toI32()]) as Bytes;
    return balanceSet;
}

export function getTokenCreatedEvent(symbol: string): TokenCreated {
    // @ts-ignore
    let tokenCreated = changetype<TokenCreated>(newMockEvent());

    tokenCreated.parameters = new Array();
    tokenCreated.parameters.push(getSymbolAddressParam('tokenAddress', symbol));
    tokenCreated.parameters.push(getStringParam('symbol', symbol));
    return tokenCreated;
}
export function getServiceContractCreatedEvent(serviceContractId: Address): ServiceContractCreated {
    // @ts-ignore
    let serviceContract = changetype<ServiceContractCreated>(newMockEvent());

    serviceContract.parameters = new Array();
    serviceContract.parameters.push(getAddressParam('owner', WalletAddress));
    serviceContract.parameters.push(getAddressParam('contractAddress', serviceContractId));
    serviceContract.parameters.push(getAddressParam('serviceFeeAddress', WalletAddress2));
    serviceContract.parameters.push(getBigIntParam('serviceFeePoints', BigInt.fromI32(100)));
    serviceContract.parameters.push(getStringParam('name', "Hello"));
    serviceContract.parameters.push(getStringParam('url', 'World'));
    return serviceContract;
}
export function getOrderFailedEvent(recipient: Address, symbol: string, message: string, buyingPower: BigInt, spender: Address): OrderFailed {
    // @ts-ignore
    let orderFailed = changetype<OrderFailed>(newMockEvent());

    orderFailed.parameters = new Array();

    orderFailed.parameters.push(getAddressParam('recipient', recipient));
    orderFailed.parameters.push(getStringParam('symbol', symbol));
    orderFailed.parameters.push(getBigIntParam('buyingPower', buyingPower));
    orderFailed.parameters.push(getStringParam('message', message));
    orderFailed.parameters.push(getAddressParam('spender', spender));
    orderFailed.parameters.push(getBigIntParam('created', BigInt.fromI32(1)));
    return orderFailed;
}

export function getOrderExecutedEvent(walletAddress: Address, symbol: string, tsl: BigInt, filledQty: BigInt,
                                      filledAvgPrice: BigInt, side: string, filledAt: BigInt, serviceFee: BigInt, aUsdBalance: BigInt,
                                      spender: Address = Address.fromString('0x2BFb0207BC88BA9e2Ac74F19c9e88EdCcdBbC2a9')): OrderExecuted {
    // @ts-ignore
    let orderExecuted = changetype<OrderExecuted>(newMockEvent());
    orderExecuted.parameters = new Array<ethereum.EventParam>();
    orderExecuted.parameters.push(getStringParam('orderId', '123'));
    orderExecuted.parameters.push(getAddressParam('recipient', walletAddress));
    orderExecuted.parameters.push(getStringParam('symbol', symbol));
    orderExecuted.parameters.push(getBigIntParam('tsl', tsl));
    orderExecuted.parameters.push(getBigIntParam('filledQty', filledQty));
    orderExecuted.parameters.push(getBigIntParam('filledAvgPrice', filledAvgPrice));
    orderExecuted.parameters.push(getStringParam('side', side));
    orderExecuted.parameters.push(getBigIntParam('filledAt', filledAt))
    orderExecuted.parameters.push(getBigIntParam('serviceFee', serviceFee));
    orderExecuted.parameters.push(getBigIntParam('aUsdBalance', aUsdBalance));
    orderExecuted.parameters.push(getAddressParam('spender', spender));

    return orderExecuted;
}


class MockSymbol {
    id: string;
    contract: Address;

    constructor(id: string, address: Address) {
        this.id = id;
        this.contract = address;
    }
}

export function getSymbols(): Array<MockSymbol> {
    let MockSymbols = new Array<MockSymbol>();
    MockSymbols.push(new MockSymbol("AAPL", Address.fromString("0x0e51e6281812df31e6474b022139ed4f1a7bb6ac")))
    return MockSymbols;
}


