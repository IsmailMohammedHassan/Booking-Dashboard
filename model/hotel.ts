import { Facilities } from './facilities';
import { Messages } from './messages';
import { Reviews } from './reviews';
import { Room } from './room';

export interface Hotel {
  hotelName: string;
  description?: string;
  images?: string[];
  country?: string;
  city?: string;
  streetAddress?: string;
  zipCode?: number;
  phone?: string;
  paymentOption?: number;
  children?: boolean;
  pets?: boolean;
  checkIn?: Date;
  checkOut?: Date;
  cancellation?: string;
  parking?: boolean;
  breakfast?: boolean;
  lunch?: boolean;
  dinner?: boolean;
  rooms?: Room;
  facilities?: Facilities;
  status?: string;
  messages?: Messages;
  reviews?: Reviews;
}
