import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  UserData: any = {};
  hide = true;
  constructor(private userService: UserService, private router: Router) {}
  wrong: any;
  ngOnInit(): void {}

  login() {
    this.userService.LoginUser(this.UserData).subscribe((result) => {
      console.log('result', result);
      if (!result.success) {
        this.wrong = 'Wrong email or password';
      }
      if (result.data.status == 'active') {
        if (result.success == true) {
          if (result.data.type == 'partner') {
            localStorage.setItem('authentication', result.token);
            window.location.href = 'http://localhost:4200/';
          } else {
            window.location.href = 'http://localhost:3000/auth/' + result.token;
          }
        }
      } else {
        this.router.navigate(['/inactive/']);
      }
    });
  }
}
