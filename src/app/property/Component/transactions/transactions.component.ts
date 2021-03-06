import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApartmentService } from '../../../../../Services/apartment.service';
import { CampgroundService } from '../../../../../Services/campground.service';
import { HotelService } from '../../../../../Services/hotel.service';
import { SharedService } from '../../../../../Services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    private hotelService: HotelService,
    private shared: SharedService,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  isLoading = false;
  propId: any;
  prop: any;
  property: any;
  bookingAccount: any;
  dues: any;
  allTransactions: any;
  withdrals: any;
  withdrawAmount = 0;
  allWithdrawlsAmount = 0;
  panelOpenState = false;
  withdrawDetails: any[] = [];
  dataSource: any;
  allTransactionsAmount = 0;
  displayedColumns: string[] = ['transactionDate', 'withdrawAt', 'price'];
  displayedColumns2: string[] = ['transactionDate', 'Amount'];
  displayedColumns3: string[] = ['transactionDate', 'withdrawAt', 'Amount'];

  float2int(num: any) {
    console.log(num, 'aaaaaaaaaaaaaaaa');
    return Math.trunc(+num);
  }

  paypalAcc: any;
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
    });

    switch (this.prop) {
      case 'hotel':
        this.hotelService.getHotelById(this.propId).subscribe((result) => {
          this.property = result.data;
          this.bookingAccount = result.data.bookingAccount;
          this.allTransactions = result.data.allTransaction;
          this.withdrals = result.data.Withdrawals;
          this.dues = Math.trunc(result.data.dues);
          this.paypalAcc = result.data.paymentOption;

          for (let trans of this.allTransactions) {
            this.allTransactionsAmount += trans.Amount;
          }
          for (let trans of this.withdrals) {
            this.allWithdrawlsAmount += trans.Amount;
          }
          for (let booking of result.data.bookingAccount) {
            let date = new Date(booking.withdrawAt);
            if (date <= new Date()) {
              this.withdrawAmount += Math.trunc(booking.price);
              this.withdrawDetails.push(booking);
              this.dataSource = this.withdrawDetails;
            }
          }
          this.allTransactionsAmount = Math.trunc(this.allTransactionsAmount);
          this.allWithdrawlsAmount = Math.trunc(this.allWithdrawlsAmount);
          this.isLoading = false;
          console.log(this.withdrawDetails);
        });
        break;
      case 'apartment':
        this.apartmentService
          .getApartmentbyId(this.propId)
          .subscribe((result) => {
            this.property = result.data;
            this.bookingAccount = result.data.bookingAccount;
            this.allTransactions = result.data.allTransaction;
            this.withdrals = result.data.Withdrawals;
            this.paypalAcc = result.data.paymentOption;
            this.dues = Math.trunc(result.data.dues);
            console.log(result);
            for (let trans of this.allTransactions) {
              this.allTransactionsAmount += trans.Amount;
            }
            for (let trans of this.withdrals) {
              this.allWithdrawlsAmount += trans.Amount;
            }

            for (let booking of result.data.bookingAccount) {
              let date = new Date(booking.withdrawAt);

              if (date <= new Date()) {
                this.withdrawAmount += booking.price;
                this.withdrawDetails.push(booking);
              }
            }
            this.allTransactionsAmount = Math.trunc(this.allTransactionsAmount);
            this.allWithdrawlsAmount = Math.trunc(this.allWithdrawlsAmount);
            this.isLoading = false;
          });
        break;
      case 'campground':
        this.campgroundService
          .getCampGroundById(this.propId)

          .subscribe((result) => {
            this.property = result.data;
            this.bookingAccount = result.data.bookingAccount;
            this.allTransactions = result.data.allTransaction;
            this.withdrals = result.data.Withdrawals;
            this.dues = Math.trunc(result.data.dues);
            this.paypalAcc = result.data.paymentOption;
            for (let trans of this.allTransactions) {
              this.allTransactionsAmount += trans.Amount;
            }
            for (let trans of this.withdrals) {
              this.allWithdrawlsAmount += trans.Amount;
            }
            for (let booking of result.data.bookingAccount) {
              let date = new Date(booking.withdrawAt);
              if (date <= new Date()) {
                this.withdrawAmount += booking.price;
                this.withdrawDetails.push(booking);
              }
            }

            this.allTransactionsAmount = Math.trunc(this.allTransactionsAmount);
            this.allWithdrawlsAmount = Math.trunc(this.allWithdrawlsAmount);
            this.isLoading = false;
          });
        break;
    }
  }
  openSnackBar() {
    this.shared
      .withdrawRequest(this.prop, this.propId, {
        paypalAccount: this.paypalAcc,
      })
      .subscribe((data) => {
        console.log(data);
        this._snackBar.open(
          'Your request has been sent successfully, you will be answered within 72 hours',
          'ok'
        );
      });
  }
  paypalInput = false;
  openPaypalInput() {
    this.paypalInput = !this.paypalInput;
    console.log(this.paypalInput);
  }
}
