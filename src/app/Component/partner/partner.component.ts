import { UploadService } from './../../../../Services/upload.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PartnerService } from 'Services/partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit, AfterViewInit {
  admin: any = {};
  isLoading = false;
  adminID: string = '';
  constructor(private userSer: PartnerService, private upload: UploadService) {}
  ngAfterViewInit(): void {
    this.isLoading = false;
  }
  ngOnInit() {
    this.isLoading = true;
    this.userSer.getLoggedUser().subscribe(
      (user) => {
        this.admin = user.data;
        console.log(user);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  prfilePic: any;
  fileName = '';

  uploadSub!: Subscription;
  selectedFiles?: FileList;
  progressInfos: any[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  uploadImg(idx: number, file: File): void {
    this.isLoading = true;
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    const formData = new FormData();

    formData.append('multiple_images', file);

    if (file) {
      this.upload.uploadImages(formData).subscribe(
        (event: any) => {
          this.isLoading = false;
          this.admin.personalImage = event.data[0];
          if (confirm('Your data will be updated, do you want continue?')) {
            this.userSer
              .updateUser(this.admin._id, this.admin)
              .subscribe((data) => {
                alert('Done!');
              });
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  updateAdmin(): void {
    console.log('as');
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.uploadImg(i, this.selectedFiles[i]);
      }
    } else {
      if (confirm('Your data will be updated, do you want continue?')) {
        this.userSer
          .updateUser(this.admin._id, this.admin)
          .subscribe((data) => {
            alert('Done!');
          });
      }
    }
  }
  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
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
