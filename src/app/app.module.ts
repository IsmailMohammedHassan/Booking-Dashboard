import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { MainComponent } from './Component/main/main.component';
import { FooterComponent } from './Component/footer/footer.component';
import { ReviewsComponent } from './Component/reviews/reviews.component';
import { ReservationsComponent } from './Component/reservations/reservations.component';
import { PartnerComponent } from './Component/partner/partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialModule } from './matrial/matrial.module';
import { AddPropertyHomePageComponent } from './Component/add-property-home-page/add-property-home-page.component';
import { HotelFormComponent } from './Component/hotel-form/hotel-form.component';
import { CampgroundFormComponent } from './Component/campground-form/campground-form.component';
import { ApartmentFormComponent } from './Component/apartment-form/apartment-form.component';
import { CompleteComponent } from './Component/complete/complete.component';
import { LoginComponent } from './Component/login/login.component';
import { RegestertionComponent } from './Component/regestertion/regestertion.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { GoogleDashboardComponent } from './Component/google-dashboard/google-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NotificationsComponent } from './Component/notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ReviewsComponent,
    ReservationsComponent,
    PartnerComponent,
    AddPropertyHomePageComponent,
    HotelFormComponent,
    CampgroundFormComponent,
    ApartmentFormComponent,
    CompleteComponent,
    LoginComponent,
    RegestertionComponent,
    GoogleDashboardComponent,
    NotificationsComponent,
  ],
  imports: [
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatrialModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '646600498472-ba82ab7qt0knnmcksvn4k4b01mkicdn6.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
