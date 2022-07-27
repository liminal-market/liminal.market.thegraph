import {Address, BigDecimal, BigInt} from "@graphprotocol/graph-ts";
import {LiminalMarketInfo, Order, User} from "../../generated/schema";
import Helper from "../Helper";

export default class UserLogic {

    public getUser(recipient: Address, liminalMarketInfo: LiminalMarketInfo): User {
        let user = User.load(recipient.toHex())
        if (user == null) {
            user = new User(recipient.toHex());
            user.currentAUsdBalance = BigDecimal.fromString("0");
            user.currentAUsdBalanceWei = BigInt.fromI32(0);
            user.lastOrderAt = BigInt.fromI32(0);
            user.orders = new Array<string>()
            user.orderFails = new Array<string>();
            user.positions = new Array<string>();

            liminalMarketInfo.userCount += 1;
        }
        return user;
    }

    public store(user : User, entity : Order, orderId : string, positionId : string) : void {
        let positions = user.positions!;
        positions.push(positionId);
        user.positions = positions;

        let orders = user.orders!;
        orders.push(orderId);
        user.orders = orders;

        user.lastOrderAt = entity.filledAt;
        user.currentAUsdBalanceWei = entity.aUsdBalanceAfterOrderWei;
        user.currentAUsdBalance = Helper.getDecimal(user.currentAUsdBalanceWei);
        user.save();
    }

}