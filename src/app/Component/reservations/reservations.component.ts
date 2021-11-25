import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { ApartmentService } from 'Services/apartment.service';
import { CampgroundService } from 'Services/campground.service';
import { HotelService } from 'Services/hotel.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  hotels: any[] = [];
  allBookingHotels: any[] = [];
  HotelsBookings: any[] = [];
  panelOpenState = false;
  apart: any[] = [];
  allAparBooking: any[] = [];
  bookingApart: any[] = [];
  isLoading: any = false;
  camp: any[] = [];
  allCampBooking: any[] = [];
  CampgroundBookings: any[] = [];

  constructor(
    private hotelService: HotelService,
    private apartSerice: ApartmentService,
    private campService: CampgroundService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.hotelService.getHotelsByUserId().subscribe((Res) => {
      this.hotels = Res.data;
      for (let i = 0; i < this.hotels.length; i++) {
        this.hotelService
          .getAllBookingsByHotelId(this.hotels[i]._id)
          .subscribe((res) => {
            this.allBookingHotels[i] = res.data;
            this.HotelsBookings = [].concat(...this.allBookingHotels);
          });
        this.isLoading = false;
      }
    });

    this.apartSerice.getApartmentsByUserId().subscribe((Res) => {
      this.apart = Res.data;

      for (let i = 0; i < this.apart.length; i++) {
        this.bookingApart[i] = this.apart[i].bookings;
      }
      this.isLoading = false;
    });

    this.campService.getCampGroundsByUserId().subscribe((Res) => {
      this.camp = Res.data;
      for (let i = 0; i < this.camp.length; i++) {
        // console.log(this.camp[i]);
        this.campService
          .getAllBookingsByCampGroundlID(this.camp[i]._id)
          .subscribe((res) => {
            this.allCampBooking[i] = res.data;
            this.CampgroundBookings = [].concat(...this.allCampBooking);
            this.isLoading = false;
          });
      }
    });
  }
}
