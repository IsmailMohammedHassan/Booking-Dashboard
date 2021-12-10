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
import { ReservationsComponent } from './Component/reservations/reservations/reservations.component';
import { ReviewsComponent } from './Component/reviews/reviews.component';
import { TransactionsComponent } from './Component/transactions/transactions.component';
import { RouterModule, Routes } from '@angular/router';
import { MatrialModule } from '../matrial/matrial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertyComponent } from './property/property.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ApartmentSettingComponent, pathMatch: 'full'
//   },
// ]; 
 
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
    ReservationsComponent,
    ReviewsComponent,
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