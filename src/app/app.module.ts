import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InjectorShareService } from './pages/dashboard/shared-injector/injectors';
// import { StoreModule } from '@ngrx/store';
// import { LoaderReducer } from './states/loader/loader.reducer';
// import { LOADER_FEARTURE_KEY } from './states/loader/loader.selector';
//For NGXS
import { NgxsModule } from '@ngxs/store';
import { PostState } from './pages/basic-ngxs/ngxs/basic-ngxs.state';
import { LoaderInterceptService } from './services/intercept/loaderIntercept.service';
import { ApiLoaderState } from './services/intercept/api-loader-state/loader.state';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxsModule.forRoot([PostState]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    }),
    HttpClientModule,
    // StoreModule.forFeature(LOADER_FEARTURE_KEY, LoaderReducer),
    NgxsModule.forRoot([ApiLoaderState])
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
