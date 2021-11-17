import { Bookings } from './bookings';

export interface Room {
  type?: string;
  smoking?: boolean;
  roomName?: string;
  customName?: string;
  numOfRoomOfThisType?: number;
  roomSize?: number;
  price?: number;
  bedType?: string;
  bedsNumber?: number;
  guestsNumber?: number;
  facilities?: string[];
  available?: boolean;
  booking?: Bookings[];
}
