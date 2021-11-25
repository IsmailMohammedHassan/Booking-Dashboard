import { NotificationsComponent } from './Component/notifications/notifications.component';
import { UserAuthGuard } from './Component/login/user-auth.guard';
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
import { LoginAuthGuard } from './Component/login/login-auth.guard';
import { GoogleDashboardComponent } from './Component/google-dashboard/google-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/grouphomepage', pathMatch: 'full' },
  {
    path: 'grouphomepage',
    component: MainComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'reviews',
    component: ReviewsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'partner',
    component: PartnerComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'add-property-home',
    component: AddPropertyHomePageComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'add-new-hotel',
    component: HotelFormComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'add-new-campground',
    component: CampgroundFormComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'add-new-apartment',
    component: ApartmentFormComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'complete',
    component: CompleteComponent,
    canActivate: [UserAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
  { path: 'dashboard', component: GoogleDashboardComponent },

  {
    path: 'registration',
    component: RegestertionComponent,
    canActivate: [LoginAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
