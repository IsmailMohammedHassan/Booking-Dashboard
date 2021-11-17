import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regestertion',
  templateUrl: './regestertion.component.html',
  styleUrls: ['./regestertion.component.scss'],
})
export class RegestertionComponent implements OnInit {
  UserData: any = {};
  success: any;
  wrong: any;
  constructor(private register: UserService, private router: Router) {}

  ngOnInit(): void {
    this.UserData.type = 'user';
  }

  registration() {
    if (this.UserData.type == 'partner') {
      this.register.creatPartner(this.UserData).subscribe((partner) => {
        if (partner.success) {
          console.log(partner);
          this.success =
            'Congratiolations, registration completed please login';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        if (!partner.success) {
          console.log(partner);
          this.wrong = 'Invalid credintials';
        }
      });
    }

    if (this.UserData.type == 'user') {
      this.register.creatUser(this.UserData).subscribe((user) => {
        if (user.success) {
          console.log(user);
          this.success =
            'Congratiolations, registration completed please login';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        if (!user.success) {
          console.log(user);
          this.wrong = 'Invalid credintials';
        }
      });
    }

    console.log(this.UserData);
  }
  partnerCheck() {
    this.UserData.type = 'partner';
  }
  userCheck() {
    this.UserData.type = 'user';
  }
}
