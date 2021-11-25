import { PartnerService } from 'Services/partner.service';
import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: PartnerService) {}
  faBell = faBell;

  notifi: any = 0;
  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((data) => {
      this.notifi = data.data.notifications.length;
    });
  }
  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200/login';
  }
}
