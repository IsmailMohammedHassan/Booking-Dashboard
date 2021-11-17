import { ApartmentBedRoom } from './apartment-bed-room';
import { ApartmentFacilities } from './apartment-facilities';
import { ApartmentLivingRoom } from './apartment-living-room';
import { Bookings } from './bookings';
import { Messages } from './messages';
import { Reviews } from './reviews';

export interface Apartment {
  apartmentName?: string;
  country?: string;
  city?: string;
  streetName?: string;
  homeNumber?: number;
  apartmentNumber?: number;
  bedRooms?: ApartmentBedRoom;
  livingRooms?: ApartmentLivingRoom;
  bathRooms?: number;
  kitchen?: number;
  paymentOption?: number;
  images?: string[];
  facilities?: ApartmentFacilities;
  checkIn?: Date;
  checkOut?: Date;
  price?: number;
  cancellationPolicy?: number;
  bookings?: Bookings[];
  messages?: Messages[];
  reviews?: Reviews[];
}
