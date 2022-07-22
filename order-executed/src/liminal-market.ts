import { BigInt } from "@graphprotocol/graph-ts"
import {
  OrderExecuted,
  OrderFailed,
  TokenCreated
} from "../generated/LiminalMarket/LiminalMarket"
import { OrderExecutedEntity } from "../generated/schema"

export function handleOrderExecuted(event: OrderExecuted): void {
  let entity = new OrderExecutedEntity(event.transaction.from.toHex())

  entity.recipient =  event.params.recipient;
  entity.symbol = event.params.symbol;
  entity.qty = event.params.qty;
  entity.filledQty = event.params.filledQty;
  entity.filledAvgPrice = event.params.filledAvgPrice;
  entity.side = event.params.side;
  entity.filledAt = event.params.filledAt;
  entity.commission = event.params.commission;
  entity.aUsdBalance = event.params.aUsdBalance;

  entity.save()
}

