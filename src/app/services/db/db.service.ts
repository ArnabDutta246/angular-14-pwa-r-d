import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I_API_RESPONSE, I_EXTRA_HEADERS } from './apiResponse';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private http: HttpClient
  ) { }
  // Build Url
  public buildApiUrl(service: string, method: string): string {
    return environment.BASEURL + service + method;
  }

  // Get Method
  public getHttpApi<I_POST, I_GET>(url: string, obj: I_POST, withHeaderToken: boolean = true, extra_headers: I_EXTRA_HEADERS = null): Observable<I_API_RESPONSE<I_GET>> {
    return this.commonHttpMethod('GET', url, obj, withHeaderToken, extra_headers) as Observable<I_API_RESPONSE<I_GET>>;
  }
  // Post Method
  public postHttpApi<I_POST, I_GET>(url: string, obj: I_POST, withHeaderToken: boolean = true, extra_headers: I_EXTRA_HEADERS = null): Observable<I_API_RESPONSE<I_GET>> {
    return this.commonHttpMethod('POST', url, obj, withHeaderToken, extra_headers) as Observable<I_API_RESPONSE<I_GET>>;
  }
  // Put Method
  public putHttpApi<I_POST, I_GET>(url: string, obj: I_POST, withHeaderToken: boolean = true, extra_headers: I_EXTRA_HEADERS = null): Observable<I_API_RESPONSE<I_GET>> {
    return this.commonHttpMethod('PUT', url, obj, withHeaderToken, extra_headers) as Observable<I_API_RESPONSE<I_GET>>;
  }
  // Delete Method
  public deleteHttpApi<I_POST, I_GET>(url: string, obj: I_POST, withHeaderToken: boolean = true, extra_headers: I_EXTRA_HEADERS = null): Observable<I_API_RESPONSE<I_GET>> {
    return this.commonHttpMethod('DELETE', url, obj, withHeaderToken, extra_headers) as Observable<I_API_RESPONSE<I_GET>>;
  }

  // Common Method Call
  private commonHttpMethod<I_POST, I_GET>(flag: 'GET' | 'POST' | 'PUT' | 'DELETE', url, obj: I_POST, withHeaderToken: boolean = true, extra_headers: I_EXTRA_HEADERS = null): Observable<I_API_RESPONSE<I_GET>> {
    let apiResponse;
    let headerObj = withHeaderToken ?
      { 'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'application/json; charset=utf-8' } : {
        'Content-Type': 'application/json; charset=utf-8'
      };
    headerObj = extra_headers ? { ...headerObj, ...extra_headers } : { ...headerObj };
    let headers = new HttpHeaders({ ...headerObj });
    switch (flag) {
      case 'POST':
        return this.http.post(url, obj, { headers: headers }) as Observable<I_API_RESPONSE<I_GET>>
        break;
      case 'GET':
        // return this.http.get(url, obj, { headers: headers }) as Observable<I_API_RESPONSE<I_GET>>
        break;
      default:
        break;
    }
  }
}
