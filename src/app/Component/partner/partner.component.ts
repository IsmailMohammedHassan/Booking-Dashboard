import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'Services/partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit {
  admin: any = {};

  adminID: string = '';
  constructor(private userSer: PartnerService) {}
  ngOnInit() {
    //  this.adminID=localStorage.getItem("adminID");
    //  console.log(this.adminID)
    //   this.userSer.getUserById(this.adminID).subscribe(user=>{this.admin=user.data;},(err)=>{console.log(err)})

    // this.adminID=localStorage.getItem("adminID");
    //  console.log(this.adminID)
    this.userSer.getLoggedUser().subscribe(
      (user) => {
        this.admin = user.data;
        console.log(user)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAdmin() {
    if (confirm('are U sure About This Data Update?')) {
      this.userSer.updateUser(this.admin._id, this.admin).subscribe((data) => {
        alert('Done!');
      });
    }
  }
}
