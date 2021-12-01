import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApartmentService } from '../../../../Services/apartment.service';
import { UploadService } from '../../../../Services/upload.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
  result: any;
  uploadSub: any;
  uploadProgress: any;
  message: any[] = [];
  progressInfos: any[] = [];
  selectedFiles: any;
  previews: any[] = [];
  apartmentImages: any[] = [];
  panelOpenState = false;
  panelOpenState2 = false;
  imageInfos: any[] = [];
  apiLoaded!: Observable<boolean>;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private apartmentService: ApartmentService,
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

  Apartment = this._formBuilder.group({
    apartmentName: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    streetAddress: ['', Validators.required],
    homeNumber: ['', Validators.required],
    apartmentNumber: ['', Validators.required],
    paymentOption: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    cancellation: ['', Validators.required],
    price: ['', Validators.required],
    pets: ['', Validators.required],
    children: ['', Validators.required],
    events: ['', Validators.required],
    smoking: ['', Validators.required],
    description: ['', Validators.required],

    facilities: this._formBuilder.group({
      general: ['', Validators.required],
      cookingAndCleaening: ['', Validators.required],
      entertainment: ['', Validators.required],
      view: ['', Validators.required],
    }),

    size: ['', Validators.required],
    guestsNum: ['', Validators.required],
    bathRooms: ['', Validators.required],
    bedRooms: this._formBuilder.array([this.addBedRooms()]),
    livingRooms: this._formBuilder.array([this.addLivingRooms()]),
  });
  addBedRooms() {
    return this._formBuilder.group({
      twinBed: [''],
      fullBed: [''],
      queenBed: [''],
      kingBed: [''],
      bunkBed: [''],
      sofaBed: [''],
      futonBed: [''],
    });
  }

  addLivingRooms() {
    return this._formBuilder.group({
      sofaBed: [''],
    });
  }
  get bedRooms() {
    return this.Apartment.controls['bedRooms'] as FormArray;
  }
  get livingRooms() {
    return this.Apartment.controls['livingRooms'] as FormArray;
  }

  onSave() {
    this.result = this.bedRooms.getRawValue();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }
  addBedRoom() {
    this.bedRooms.push(this.addBedRooms());
  }
  addLivingRoom() {
    this.livingRooms.push(this.addLivingRooms());
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
          this.apartmentImages.push(event.data[0]);
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
  addApartment() {
    this.Apartment.value.images = this.imageInfos;
    this.Apartment.value.location = this.markerPositions;
    this.apartmentService.creatApartment(this.Apartment.value).subscribe(
      (result) => {
        console.log(result);
        if (result.success == true) this.router.navigate(['/complete/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
