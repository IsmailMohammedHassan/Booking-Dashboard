import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Apartment } from 'model/apartment';
import { Reviews } from 'model/reviews';
import { Bookings } from 'model/bookings';
import { Messages } from '../model/messages';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  getAllApartments(): Observable<any> {
    return this.http.get<any>(environment.Api + 'apartment', this.httpOptions);
  }

  getApartmentbyId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/' + ApartmentId,
      this.httpOptions
    );
  }
  getApartmentsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/user/',
      this.httpOptions
    );
  }

  updateApartment(ApartmentId: any, Apartment: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/' + ApartmentId,
      Apartment,
      this.httpOptions
    );
  }

  deleteApartment(ApartmentId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/' + ApartmentId,
      this.httpOptions
    );
  }
  creatApartment(ApartmentId: Apartment): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment',
      ApartmentId,
      this.httpOptions
    );
  }
//  msg API
  getAllMessagesByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/message/' + ApartmentId,
      this.httpOptions
    );
  }

  getAllMessagesByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/message/' + hotelId,
      this.httpOptions
    );
  }

  createMessage(hotelId: any, message: Messages): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/message/' + hotelId,
      message,
      this.httpOptions
    );
  }
  deleteMessage(hotelId: any, messageId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/message/' + hotelId + '/' + messageId,
      this.httpOptions
    );
  }

  updateMessage(
    hotelId: any,
    messageId: any,
    message: Messages
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/message/' + hotelId + '/' + messageId,
      message,
      this.httpOptions
    );
  }
  createReplay(propId: any, messageId: any, replay: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/message/replay/' + propId + '/' + messageId,
      replay,
      this.httpOptions
    );
  }

  //Review api
  getAllReviewsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/review/' + ApartmentId,
      this.httpOptions
    );
  }
  createReview(ApartmentId: any, review: Reviews): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/review/' + ApartmentId,
      review,
      this.httpOptions
    );
  }
  deleteReview(ApartmentId: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'apartment/review/' + ApartmentId + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(
    ApartmentId: any,
    reviewId: any,
    review: Reviews
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'apartment/review/' + ApartmentId + '/' + reviewId,
      review,
      this.httpOptions
    );
  }

  // /booking api
  getAllBookingsByApartmentId(ApartmentId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'apartment/booking/' + ApartmentId,
      this.httpOptions
    );
  }

  createBooking(ApartmentId: any, booking: Bookings): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'apartment/booking/' + ApartmentId,
      booking,
      this.httpOptions
    );
  }

  updateBooking(
    ApartmentId: any,
    roomId: any,
    bookingId: any,
    booking: Bookings
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api +
        'apartment/booking/' +
        ApartmentId +
        '/' +
        roomId +
        '/' +
        bookingId,
      booking,
      this.httpOptions
    );
  }

  deleteBooking(
    ApartmentId: any,
    roomId: any,
    bookingId: any
  ): Observable<any> {
    return this.http.delete<any>(
      environment.Api +
        'apartment/booking/' +
        ApartmentId +
        '/' +
        roomId +
        '/' +
        bookingId,
      this.httpOptions
    );
  }
}
