import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampGround } from 'model/campGround';
import { Reviews } from 'model/reviews';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Messages} from '../model/messages';

@Injectable({
  providedIn: 'root',
})
export class CampgroundService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authentication: localStorage.getItem('authentication') || '',
    }),
  };

  getAllCampGrounds(): Observable<any> {
    return this.http.get<any>(environment.Api + 'campground', this.httpOptions);
  }

  getCampGroundById(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/' + campID,
      this.httpOptions
    );
  }
  getCampGroundsByUserId(): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/user/',
      this.httpOptions
    );
  }

  updateCampGround(campId: any, campground: any): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/' + campId,
      campground,
      this.httpOptions
    );
  }

  deleteCampGround(campID: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/' + campID,
      this.httpOptions
    );
  }

  creatCampGround(camp: CampGround): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground',
      camp,
      this.httpOptions
    );
  }

  getAllBookingsByCampGroundlID(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/booking/' + campID,
      this.httpOptions
    );
  }

  //Review
  getAllReviewsByCampGroundId(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/review/' + campID,
      this.httpOptions
    );
  }
  createReview(campID: any, review: Reviews): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/review/' + campID,
      review,
      this.httpOptions
    );
  }
  deleteReview(campID: any, reviewId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/review/' + campID + '/' + reviewId,
      this.httpOptions
    );
  }
  updateReview(campID: any, reviewId: any, review: Reviews): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/review/' + campID + '/' + reviewId,
      review,
      this.httpOptions
    );
  }
  getAllReviewsByCampId(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/review/' + campID,
      this.httpOptions
    );
  }

  // msg
  getAllMessagesByCampGroundId(campID: any): Observable<any> {
    return this.http.get<any>(
      environment.Api + 'campground/message/' + campID,
      this.httpOptions
    );
  }
  createMessage(campID: any, message: Messages): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/message/' + campID,
      message,
      this.httpOptions
    );
  }
  deleteMessage(campID: any, messageId: any): Observable<any> {
    return this.http.delete<any>(
      environment.Api + 'campground/message/' + campID + '/' + messageId,
      this.httpOptions
    );
  }

  updateMessage(
    campID: any,
    messageId: any,
    message: Messages
  ): Observable<any> {
    return this.http.put<any>(
      environment.Api + 'campground/message/' + campID + '/' + messageId,
      message,
      this.httpOptions
    );
  }
  createReplay(propId: any, messageId: any, replay: any): Observable<any> {
    return this.http.post<any>(
      environment.Api + 'campground/message/replay/' + propId + '/' + messageId,
      replay,
      this.httpOptions
    );
  }
}
