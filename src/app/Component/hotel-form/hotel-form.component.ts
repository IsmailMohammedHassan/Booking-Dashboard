import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { HotelService } from '../../../../Services/hotel.service';
import { UploadService } from '../../../../Services/upload.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class HotelFormComponent implements OnInit {
  result: any;
  Hotel = this._formBuilder.group({
    hotelName: [
      '',
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(50),
    ],
    starRating: ['', Validators.required, Validators.min(1), Validators.max(7)],
    phone: [
      '',
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(12),
    ],
    country: ['', Validators.required],
    description: ['', Validators.required],
    city: ['', Validators.required],
    streetAddress: ['', Validators.required],
    zipCode: ['', Validators.required],
    cancellation: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    children: ['', Validators.required],
    pets: ['', Validators.required],
    paymentOption: [
      '',
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ],
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
    rooms: this._formBuilder.array([this.addRooms()]),
  });

  @Input() requiredFileType!: string;
  hotelImages: any[] = [];
  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  uploadAvailable: boolean = true;
  previews: string[] = [];
  imageInfos: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private hotelService: HotelService,
    private router: Router,
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

  apiLoaded!: Observable<boolean>;
  click(event: google.maps.MapMouseEvent) {
    console.log(event);
  }

  ngOnInit() {}

  get rooms() {
    return this.Hotel.controls['rooms'] as FormArray;
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
      facilities: ['', Validators.required],
      available: [true],
      smoking: ['', Validators.required],
    });
  }
  onSave() {
    this.result = this.rooms.getRawValue();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }
  addRoom() {
    this.rooms.push(this.addRooms());
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
          this.hotelImages.push(event.data[0]);
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
  deleteImage(index: number) {
    for (let i = 0; i < this.imageInfos.length; i++) {
      if (index == i) {
        this.imageInfos.splice(i, 1);
        this.message.splice(i, 1);
        this.progressInfos.splice(i, 1);
      }
    }
  }
  addHotel() {
    this.Hotel.value.images = this.imageInfos;
    this.Hotel.value.location = this.markerPositions;
    console.log(this.Hotel.value);
    this.hotelService.creatHotel(this.Hotel.value).subscribe(
      (result) => {
        console.log(result);
        if (result.success == true) this.router.navigate(['/complete/']);
        else alert(result.msg);
      },
      (err) => {
        alert(err);
      }
    );
  }
}
