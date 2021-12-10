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
import { PropertyComponent } from './property/property/property.component';
import { HomeComponent } from './property/Component/home/home.component';
import { PropertySettingsComponent } from './property/Component/property-settings/property-settings/property-settings.component';
import { CampgroundSettingsComponent } from './property/Component/campground-settings/campground-settings.component';
import { ApartmentSettingComponent } from './property/Component/apartment-setting/apartment-setting/apartment-setting.component';
import { TransactionsComponent } from './property/Component/transactions/transactions.component';
import { InboxComponent } from './property/Component/inbox/inbox.component';

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

  {
    path: 'property',
    component: PropertyComponent,
    children: [
      {
        path: 'apart',
        component: ApartmentSettingComponent,
      },
      {
        path: 'home/:prop/:id',
        component: HomeComponent,

        canActivate: [UserAuthGuard],
      },
      {
        path: 'complete',
        component: CompleteComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'inbox/:prop/:id',
        component: InboxComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'bookings/:prop/:id',
        component: ReservationsComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'reviews/:prop/:id',
        component: ReviewsComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'settings/hotel/:id',
        component: PropertySettingsComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'settings/campground/:id',
        component: CampgroundSettingsComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'settings/apartment/:id',
        component: ApartmentSettingComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: 'transactions/:prop/:id',
        component: TransactionsComponent,
        canActivate: [UserAuthGuard],
      },
    ],
  },
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
