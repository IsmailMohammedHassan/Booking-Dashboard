import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Apartment } from 'model/apartment';
import { CampGround } from 'model/campGround';
import { Hotel } from 'model/hotel';
import { ApartmentService } from 'Services/apartment.service';
import { CampgroundService } from 'Services/campground.service';
import { HotelService } from 'Services/hotel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isLoading = false;

  apart: Apartment[] = [];
  apartments: any[] = [];

  hotel: Hotel[] = [];
  hotelAny: any[] = [];
  hotelBooking: any[] = [];

  campground: CampGround[] = [];
  campgroundAny: any[] = [];

  bookingCount: number[] = [];

  constructor(
    private Apart: ApartmentService,
    private hotelService: HotelService,
    private campgroundService: CampgroundService
  ) {}

  campid: number[] = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.Apart.getApartmentsByUserId().subscribe((DATA) => {
      this.apartments = DATA.data;
      this.isLoading = false;
    });

    this.hotelService.getHotelsByUserId().subscribe((DATA) => {
      this.hotelAny = DATA.data;
      console.log(DATA);
      for (let i = 0; i < this.hotelAny.length; i++) {
        this.hotelService
          .getAllBookingsByHotelId(this.hotelAny[i]._id)
          .subscribe((result) => {
            this.hotelBooking[i] = result.data.length;
          });
        this.isLoading = false;
      }
    });
    //Camp

    this.campgroundService.getCampGroundsByUserId().subscribe((DATA) => {
      this.campgroundAny = DATA.data;

      for (let i = 0; i < this.campgroundAny.length; i++) {
        this.campgroundService
          .getAllBookingsByCampGroundlID(this.campgroundAny[i]._id)
          .subscribe((DATA) => {
            this.campid[i] = DATA.data.length;
          });
        this.isLoading = false;
      }
    });
  }

  fun() {}
  hotelRedirect(hotel: any) {
    window.location.href = `http://localhost:4401/home/hotel/${hotel._id}`;
  }
  campRedirect(camp: any) {
    window.location.href = `http://localhost:4401/home/campground/${camp._id}`;
  }
  apartmentRedirect(apartment: any) {
    window.location.href = `http://localhost:4401/home/apartment/${apartment._id}`;
  }
}
