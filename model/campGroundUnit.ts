import { Amenities } from "./amenities";
import { Bookings } from "./bookings";

export interface CampGroundUnit {

    unitName?:string,
    unitType?:String
    unitSize?:number,
    twinBed?:number,
    fullBed?:number,
    queenBed?:number,
    kingBed?:number,
    bunkBed?:number,
    sofaBed?:number,
    futonBed?:number,
    amenities?:Amenities,
    price?:number,
    roomOfThisType?:number
    bookings?:Bookings

}
