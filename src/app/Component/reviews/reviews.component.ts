import { Component, OnInit } from '@angular/core';
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
    this.Apart.getApartmentsByUserId().subscribe((DATA) => {
      this.apartments = DATA.data;
      console.log(this.apartments);
      for (let i = 0; i < this.apartments.length; i++) {
        this.Apart.getAllReviewsByApartmentId(this.apartments[i]._id).subscribe(
          (res) => {
            this.apartmentReviews[i] = res.data;
            console.log(this.apartmentReviews);
          }
        );
      }
    });

    // HotelReview
    this.hotelService.getHotelsByUserId().subscribe((Res) => {
      this.allHotels = Res.data;
      // console.log(this.allHotels);
      for (let i = 0; i < this.allHotels.length; i++) {
        this.hotelService
          .getAllReviewsByHotelId(this.allHotels[i]._id)
          .subscribe((result) => {
            this.HotelReviews[i] = result.data;
            // this.allHotelReviews = [].concat(...this.HotelReviews);
            // console.log(this.allHotelReviews);
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
            // this.allCamplReviews = [].concat(...this.campReviews);
            // console.log(this.allCamplReviews);
          });
      }
    });
  }
}

// for (let i = 0; i < this.apartments.length; i++) {
//   this.Apart.getAllReviewsByApartmentId(this.apartments[i]._id).subscribe(
//     (res) => {
//       this.apartmentReviews[i] = res.data;
//       // console.log('object', this.apartmentReviews);
//       this.allApartmentReviews = [].concat(...this.apartmentReviews);
//      console.log(this.allApartmentReviews);
//     }
//   );
// }
