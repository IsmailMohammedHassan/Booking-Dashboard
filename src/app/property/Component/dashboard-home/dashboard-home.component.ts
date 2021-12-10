import { Observable } from 'rxjs';
import { Apartment } from '../../../../../model/apartment';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService } from '../../../../../Services/apartment.service';
import { CampgroundService } from '../../../../../Services/campground.service';
import { HotelService } from '../../../../../Services/hotel.service';
 import { SharedService } from '../../../../../Services/shared.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit, AfterViewInit {
  propId: any;
  prop: any;
  localProp: any;
  localPropid: any;
  property: any;
  propertyName: any;
  routePathParam!: Observable<string>;
  constructor(
    private el: ElementRef,
    private shared: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService
  ) {}
  ngAfterViewInit(): void {
    console.log(this.localProp);
  }

  ngOnInit(): void {
    this.shared.prop.subscribe((res) => {
      this.localProp = res;
    });
    this.shared.propId.subscribe((res) => {
      this.localPropid = res;
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
    });
  }

  homeRedirect() {
    console.log(this.localProp, this.localPropid);
    this.router.navigate([
      '/property/home/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  bookingsRedirect() {
    this.router.navigate([
      '/property/bookings/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  inboxRedirect() {
    this.router.navigate([
      '/property/inbox/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  reviewsRedirect() {
    this.router.navigate([
      '/property/reviews/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  settingsRedirect() {
    this.router.navigate([
      '/property/settings/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  transactionsRedirect() {
    this.router.navigate([
      '/property/transactions/',
      localStorage.getItem('prop'),
      localStorage.getItem('propId'),
    ]);
  }
  back() {
    window.location.href = 'http://localhost:4200/grouphomepage';
  }
}
