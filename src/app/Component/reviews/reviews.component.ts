import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApartmentService } from 'Services/apartment.service';
import { CampgroundService } from 'Services/campground.service';
import { HotelService } from 'Services/hotel.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  constructor(
    private Apart: ApartmentService,
    private hotelService: HotelService,
    private campService: CampgroundService
  ) {}

  isLoading = false;
  panelOpenState = false;
  apartments: any[] = [];
  apartmentReviews: any[] = [];
  allApartmentReviews: any[] = [];

  allHotels: any[] = [];
  HotelReviews: any[] = [];
  allHotelReviews: any[] = [];

  allCamp: any[] = [];
  campReviews: any[] = [];
  allCamplReviews: any[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.Apart.getApartmentsByUserId().subscribe((DATA) => {
      this.apartments = DATA.data;

      for (let i = 0; i < this.apartments.length; i++) {
        this.Apart.getAllReviewsByApartmentId(this.apartments[i]._id).subscribe(
          (res) => {
            this.apartmentReviews[i] = res.data;

            this.isLoading = false;
          }
        );
      }
    });

    // HotelReview

    this.hotelService.getHotelsByUserId().subscribe((Res) => {
      this.allHotels = Res.data;

      for (let i = 0; i < this.allHotels.length; i++) {
        this.hotelService
          .getAllReviewsByHotelId(this.allHotels[i]._id)
          .subscribe((result) => {
            this.HotelReviews[i] = result.data;

            this.isLoading = false;
          });
      }
    });

    //Campground-Review

    this.campService.getCampGroundsByUserId().subscribe((Res) => {
      this.allCamp = Res.data;

      for (let i = 0; i < this.allCamp.length; i++) {
        this.campService
          .getAllReviewsByCampGroundId(this.allCamp[i]._id)
          .subscribe((result) => {
            this.campReviews[i] = result.data;
            console.log(this.campReviews);
            this.isLoading = false;
          });
      }
    });
  }
}
