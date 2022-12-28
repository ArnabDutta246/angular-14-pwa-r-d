import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { LoaderInjectService } from './api-loader-state/loader-subject.service';
import { APILoaderAction } from './api-loader-state/loader.action';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptService implements HttpInterceptor {

  constructor(private store: Store, private loaderS: LoaderInjectService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("current api url", request.url);
    let url = request.url;
    let split: string[] = url.split('/');
    let methodName = split[split.length - 1];
    // this.store.dispatch(new APILoaderAction.START_LOADER({ [`${methodName}`]: true }))
    this.loaderS.setLoaderState({ [`${methodName}`]: false });
    return next.handle(request).pipe(
      delay(4000),
      map((event: HttpEvent<any>) => {
        console.log("***** getting reponse******", methodName, { [`${methodName}`]: true })
        this.loaderS.setLoaderState({ [`${methodName}`]: true });
        if (event instanceof HttpResponse) {
          // this.toastr.success("Object created.");
          // this.store.dispatch(new APILoaderAction.START_LOADER({ [`${methodName}`]: false }))
          return event;
        }
        return event;
      }
      ),

    );
  }
}
