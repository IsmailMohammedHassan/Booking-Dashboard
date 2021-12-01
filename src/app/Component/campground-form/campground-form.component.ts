import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CampgroundService } from '../../../../Services/campground.service';
import { UploadService } from '../../../../Services/upload.service';
import { catchError, map } from 'rxjs/operators';

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
  imageInfos: any[] = [];
  images: any;
  apiLoaded!: Observable<boolean>;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private campgroundService: CampgroundService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyD017M6hIYH7wqssOlEDzwzKApuA6VrAVE',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
  center: google.maps.LatLngLiteral = { lat: 25, lng: 29 };
  zoom = 5;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions!: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = event.latLng!.toJSON();
    console.log(this.markerPositions);
  }

  Campground = this._formBuilder.group({
    campgroundName: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    phone: ['', Validators.required],
    streetAddress: ['', Validators.required],
    description: ['', Validators.required],
    facilities: this._formBuilder.group({
      parking: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      popularFacilities: ['', Validators.required],
    }),
    amenities: this._formBuilder.group({
      room: ['', Validators.required],
      food: ['', Validators.required],
      bathroom: ['', Validators.required],
      media: ['', Validators.required],
      services: ['', Validators.required],
      view: ['', Validators.required],
      accessibility: ['', Validators.required],
      entertainment: ['', Validators.required],
    }),
    cancellation: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    children: ['', Validators.required],
    pets: ['', Validators.required],
    paymentOption: ['', Validators.required],
    rooms: this._formBuilder.array([this.addRooms()]),
  });

  get rooms() {
    return this.Campground.controls['rooms'] as FormArray;
  }

  addRooms() {
    return this._formBuilder.group({
      roomName: ['', Validators.required],
      type: ['', Validators.required],
      customName: ['', Validators.required],
      numOfRoomOfThisType: ['', Validators.required],
      roomSize: ['', Validators.required],
      price: ['', Validators.required],
      bedType: ['', Validators.required],
      bedsNumber: ['', Validators.required],
      guestsNumber: ['', Validators.required],
      available: [true],
      smoking: ['', Validators.required],
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
  deleteImage(index: number) {
    for (let i = 0; i < this.imageInfos.length; i++) {
      if (index == i) {
        this.imageInfos.splice(i, 1);
        this.message.splice(i, 1);
        this.progressInfos.splice(i, 1);
      }
    }
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
          this.imageInfos.push(event.data[0]);
          this.previews = [];
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
    this.Campground.value.images = this.imageInfos;
    this.Campground.value.location = this.markerPositions;
    this.campgroundService.creatCampGround(this.Campground.value).subscribe(
      (result) => {
        console.log(result);
        if (result.success == true) this.router.navigate(['/complete/']);
        else alert(result.msg);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
