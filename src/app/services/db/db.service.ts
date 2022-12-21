import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I_API_RESPONSE } from './apiResponse';

@Injectable({
  providedIn: 'root'
})
export class DbService<G> {

  constructor(
    private http: HttpClient
  ) { }
  // Build Url
  buildApiUrl(service: string, method: string): string {
    return environment.BASEURL + service + method;
  }

  // Get Method
  getHttpApi<T>(url: string, obj: T): Observable<I_API_RESPONSE<G>> {
    return this.commonHttpMethod('GET', url, obj) as Observable<I_API_RESPONSE<G>>;
  }
  // Post Method
  postHttpApi<T>(url: string, obj: T): Observable<I_API_RESPONSE<G>> {
    return this.commonHttpMethod('GET', url, obj) as Observable<I_API_RESPONSE<G>>;
  }
  // Put Method
  putHttpApi<T>(url: string, obj: T): Observable<I_API_RESPONSE<G>> {
    return this.commonHttpMethod('GET', url, obj) as Observable<I_API_RESPONSE<G>>;
  }
  // Delete Method
  deleteHttpApi<T>(url: string, obj: T): Observable<I_API_RESPONSE<G>> {
    return this.commonHttpMethod('GET', url, obj) as Observable<I_API_RESPONSE<G>>;
  }

  // Common Method Call
  commonHttpMethod<T>(flag: 'GET' | 'POST' | 'PUT' | 'DELETE', url, obj: T): Observable<I_API_RESPONSE<G>> {
    let apiResponse;
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json; charset=utf-8'
    });
    switch (flag) {
      case 'POST':
        return this.http.post(url, obj, { headers: headers }) as Observable<I_API_RESPONSE<G>>
        break;
      default:
        break;
    }
  }
}
