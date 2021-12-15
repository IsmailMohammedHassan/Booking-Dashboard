import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'Services/partner.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private userService: PartnerService,
    private route: ActivatedRoute
  ) {}

  confirmationCode: any;
  error: any;
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.confirmationCode = params.get('confirmationCode');
    });
    console.log(this.confirmationCode);
    this.userService.verifyUser(this.confirmationCode).subscribe((data) => {
      if (!data.success) {
        console.log(data);
        this.error = data.msg;
        console.log(data);
      }
    });
  }
}
