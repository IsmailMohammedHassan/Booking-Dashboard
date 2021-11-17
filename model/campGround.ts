import { CampGroundUnit } from "./campGroundUnit";
import { Messages } from "./messages";
import { Reviews } from "./reviews";

export interface CampGround {
    owner?:any, //user----
    campgroundName?:string, 
    guestsCanUse?:string[],
    breakfast?:boolean,
    smoking?:boolean,
    pets?:boolean,
    children?:boolean,
    parties?:boolean,
    isBathRoomPrivate?:boolean,
    bathroomItems?:string[],
    country?:string,
    city?:string,
    units?:CampGroundUnit,
    paymentOption?:number,
    images?:string //{ data: Buffer, contentType: String }
    checkIn?:Date,
    checkOut?:Date,
    cancellationPolicy?:number,
    messages?:Messages,
    reviews?:Reviews
}
