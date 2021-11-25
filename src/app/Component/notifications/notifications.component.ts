import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'Services/partner.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(private userSer: PartnerService) {}
  user: any;

  ngOnInit(): void {
    this.userSer.getLoggedUser().subscribe(
      (user) => {
        this.user = user.data;
        console.log(user);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
