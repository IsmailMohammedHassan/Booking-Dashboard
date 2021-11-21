import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CampgroundService } from '../../../../Services/campground.service';
import { UploadService } from '../../../../Services/upload.service';

@Component({
  selector: 'app-campground-form',
  templateUrl: './campground-form.component.html',
  styleUrls: ['./campground-form.component.scss'],
})
export class CampgroundFormComponent implements OnInit {
  uploadSub: any;
  uploadProgress!: number;
  progressInfos: any;
  message: string[] = [];
  campgroundImages: any[] = [];
  selectedFiles: any;
  previews!: any[];
  imageInfos?: Observable<any>;
  images: any;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private campgroundService: CampgroundService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  Campground = this._formBuilder.group({
    campgroundName: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    phone: ['', Validators.required],
    streetAddress: ['', Validators.required],
    facilities: this._formBuilder.group({
      parking: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      popularFacilities: ['', Validators.required],
    }),
    amenities: this._formBuilder.group({
      room: [''],
      food: [''],
      bathroom: [''],
      media: [''],
      services: [''],
      view: [''],
      accessibility: [''],
      entertainment: [''],
    }),
    cancellationPolicy: [''],
    checkIn: [''],
    checkOut: [''],
    children: [''],
    pets: [''],
    paymentOption: [''],
    rooms: this._formBuilder.array([this.addRooms()]),
  });

  get rooms() {
    return this.Campground.controls['rooms'] as FormArray;
  }

  addRooms() {
    return this._formBuilder.group({
      roomName: [''],
      type: [''],
      customName: [''],
      numOfRoomOfThisType: [''],
      roomSize: [''],
      price: [''],
      bedType: [''],
      bedsNumber: [''],
      guestsNumber: [''],
      available: [true],
      smoking: [''],
    });
  }

  addRoom() {
    this.rooms.push(this.addRooms());
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }

  uploadImg(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    const formData = new FormData();

    formData.append('multiple_images', file);

    if (file) {
      this.upload.uploadImages(formData).subscribe(
        (event: any) => {
          this.progressInfos[idx].value = 100;
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.campgroundImages.push(event.data[0]);
        },
        (err: any) => {
          console.log(err);
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
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

  addCampground() {
    this.Campground.value.images = this.campgroundImages;
    this.campgroundService.creatCampGround(this.Campground.value).subscribe(
      (result) => {
        console.log(result);
        if (result.success == true) this.router.navigate(['/complete/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.upload
      .getImages('1637165347938-Kiss_The_Landscape_Part2_05.jpg')
      .subscribe((img) => {
        let unsafeImageUrl = URL.createObjectURL(img);
        this.images = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        console.log(this.images);
      });
  }
}
