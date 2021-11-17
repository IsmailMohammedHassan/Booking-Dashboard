import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyHomePageComponent } from './Component/add-property-home-page/add-property-home-page.component';
import { ApartmentFormComponent } from './Component/apartment-form/apartment-form.component';
import { CampgroundFormComponent } from './Component/campground-form/campground-form.component';
import { CompleteComponent } from './Component/complete/complete.component';
import { HotelFormComponent } from './Component/hotel-form/hotel-form.component';
import { LoginComponent } from './Component/login/login.component';
import { MainComponent } from './Component/main/main.component';
import { PartnerComponent } from './Component/partner/partner.component';
import { RegestertionComponent } from './Component/regestertion/regestertion.component';
import { ReservationsComponent } from './Component/reservations/reservations.component';
import { ReviewsComponent } from './Component/reviews/reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/grouphomepage', pathMatch: 'full' },
  { path: 'grouphomepage', component: MainComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'partner', component: PartnerComponent },
  { path: 'add-property-home', component: AddPropertyHomePageComponent },
  { path: 'add-new-hotel', component: HotelFormComponent },
  { path: 'add-new-campground', component: CampgroundFormComponent },
  { path: 'add-new-apartment', component: ApartmentFormComponent },
  { path: 'complete', component: CompleteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegestertionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
