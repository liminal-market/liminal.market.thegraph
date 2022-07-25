import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OrderExecuted,
  OrderFailed,
  TokenCreated
} from "../generated/LiminalMarket/LiminalMarket"

/*
export function createOrderExecutedEvent(
  recipient: Address,
  symbol: string,
  qty: BigInt,
  filledQty: BigInt,
  filledAvgPrice: BigInt,
  side: string,
  filledAt: BigInt,
  commission: BigInt,
  aUsdBalance: BigInt
): OrderExecuted {
  let orderExecutedEvent = changetype<OrderExecuted>(newMockEvent())

  orderExecutedEvent.parameters = new Array()

  orderExecutedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam("qty", ethereum.Value.fromUnsignedBigInt(qty))
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "filledQty",
      ethereum.Value.fromUnsignedBigInt(filledQty)
    )
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "filledAvgPrice",
      ethereum.Value.fromUnsignedBigInt(filledAvgPrice)
    )
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam("side", ethereum.Value.fromString(side))
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "filledAt",
      ethereum.Value.fromUnsignedBigInt(filledAt)
    )
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "commission",
      ethereum.Value.fromUnsignedBigInt(commission)
    )
  )
  orderExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "aUsdBalance",
      ethereum.Value.fromUnsignedBigInt(aUsdBalance)
    )
  )

  return orderExecutedEvent
}

export function createOrderFailedEvent(
  recipient: Address,
  symbol: string,
  buyingPower: BigInt,
  cost: BigInt,
  message: string
): OrderFailed {
  let orderFailedEvent = changetype<OrderFailed>(newMockEvent())

  orderFailedEvent.parameters = new Array()

  orderFailedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  orderFailedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  orderFailedEvent.parameters.push(
    new ethereum.EventParam(
      "buyingPower",
      ethereum.Value.fromUnsignedBigInt(buyingPower)
    )
  )
  orderFailedEvent.parameters.push(
    new ethereum.EventParam("cost", ethereum.Value.fromUnsignedBigInt(cost))
  )
  orderFailedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )

  return orderFailedEvent
}


export function createTokenCreatedEvent(
  tokenAddress: Address,
  symbol: string
): TokenCreated {
  let tokenCreatedEvent = changetype<TokenCreated>(newMockEvent())

  tokenCreatedEvent.parameters = new Array()

  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return tokenCreatedEvent
}
*/