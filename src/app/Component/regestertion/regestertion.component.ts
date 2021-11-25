import { UploadService } from './../../../../Services/upload.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../Services/user.service';
import { Router } from '@angular/router';
import { Country } from '@angular-material-extensions/select-country';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-regestertion',
  templateUrl: './regestertion.component.html',
  styleUrls: ['./regestertion.component.scss'],
})
export class RegestertionComponent implements OnInit {
  UserData: any = {};

  success: any;
  wrong: any;
  constructor(
    private register: UserService,
    private router: Router,
    private upload: UploadService
  ) {}

  ngOnInit(): void {
    this.UserData.type = 'user';
  }
  onCountrySelected(country: Country) {
    console.log(country);
  }
  // registration() {
  //   if (this.UserData.type == 'partner') {
  //     this.register.creatPartner(this.UserData).subscribe((partner) => {
  //       if (partner.success) {
  //         console.log(partner);
  //         this.success =
  //           'Congratiolations, registration completed please login';
  //         setTimeout(() => {
  //           // this.router.navigate(['/login']);
  //         }, 1000);
  //       }
  //       if (!partner.success) {
  //         console.log(partner);
  //         this.wrong = 'Invalid credintials';
  //       }
  //     });
  //   }

  //   if (this.UserData.type == 'user') {
  //     this.register.creatUser(this.UserData).subscribe((user) => {
  //       if (user.success) {
  //         console.log(user);
  //         this.success =
  //           'Congratiolations, registration completed please login';
  //         setTimeout(() => {
  //           // this.router.navigate(['/login']);
  //         }, 1000);
  //       }
  //       if (!user.success) {
  //         console.log(user);
  //         this.wrong = 'Invalid credintials';
  //       }
  //     });
  //   }

  //   console.log(this.UserData);
  // }
  partnerCheck() {
    this.UserData.type = 'partner';
  }
  userCheck() {
    this.UserData.type = 'user';
  }
  prfilePic: any;
  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  uploadAvailable: boolean = true;
  previews: string[] = [];
  imageInfos?: Observable<any>;

  uploadImg(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    const formData = new FormData();

    formData.append('multiple_images', file);

    if (file) {
      this.upload.uploadImages(formData).subscribe(
        (event: any) => {
          console.log(event);
          this.UserData.personalImage = event.data[0];
          console.log(this.UserData);
          if (this.UserData.type == 'partner') {
            this.register.creatPartner(this.UserData).subscribe((partner) => {
              if (partner.success) {
                console.log(partner);
                this.success = 'Registration completed please login';
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1000);
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
                this.wrong = false;
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1000);
              }
              if (!user.success) {
                console.log(user);
                this.wrong = 'Invalid credintials';
              }
            });
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.uploadImg(i, this.selectedFiles[i]);
      }
    }
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
}
