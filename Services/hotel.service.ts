import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from 'model/hotel';
import { Reviews } from 'model/reviews';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Messages} from '../model/messages';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<any> {
    return this.http.get<any>(environment.Api + 'hotel', this.httpOptions);
  }

  getHotelById(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/' + hotelId,
      this.httpOptions
    );
  }

  getHotelsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/user/',
      this.httpOptions
    );
  }

  updateHotel(hotelId: any, hotel: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/' + hotelId,
      hotel,
      this.httpOptions
    );
  }

  deleteHotel(hotelId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/' + hotelId,
      this.httpOptions
    );
  }
  creatHotel(hotel: Hotel): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel',
      hotel,
      this.httpOptions
    );
  }
  //massegs api
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

  // Review
  getAllReviewsByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/review/' + hotelId,
      this.httpOptions
    );
  }
  createReview(hotelId: any, review: Reviews): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'hotel/review/' + hotelId,
      review,
      this.httpOptions
    );
  }
  deleteReview(hotelId: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'hotel/review/' + hotelId + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(hotelId: any, reviewId: any, review: Reviews): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'hotel/review/' + hotelId + '/' + reviewId,
      review,
      this.httpOptions
    );
  }
  //booking api
  getAllBookingsByHotelId(hotelId: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'hotel/booking/' + hotelId,
      this.httpOptions
    );
  }
}
