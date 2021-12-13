import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentSettingComponent } from './Component/apartment-setting/apartment-setting/apartment-setting.component';
import { CampgroundSettingsComponent } from './Component/campground-settings/campground-settings.component';
import { CompleteComponent } from './Component/complete/complete.component';
import { DashboardHomeComponent } from './Component/dashboard-home/dashboard-home.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HomeComponent } from './Component/home/home.component';
import { InboxComponent } from './Component/inbox/inbox.component';
import { PropertySettingsComponent } from './Component/property-settings/property-settings/property-settings.component';
import { BookingsComponent } from './Component/reservations/reservations/reservations.component';
import { PropertyReviewsComponent } from './Component/reviews/reviews.component';
import { TransactionsComponent } from './Component/transactions/transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { MatrialModule } from '../matrial/matrial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyComponent } from './property/property.component';


@NgModule({
  declarations: [
    ApartmentSettingComponent,
    CampgroundSettingsComponent,
    CompleteComponent,
    DashboardHomeComponent,
    FooterComponent,
    HomeComponent,
    InboxComponent,
    PropertySettingsComponent,
    BookingsComponent,
    PropertyReviewsComponent,
    TransactionsComponent,
    PropertyComponent,
  ],

  imports: [
    CommonModule,
    //  RouterModule.forChild(routes),
    MatrialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class PropertyModule {}
