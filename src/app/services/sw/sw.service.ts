import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable } from 'rxjs';
export enum SW_EVENTS {
  VERSION_DETECTED = 'VERSION_DETECTED',
  VERSION_READY = 'VERSION_READY',
  VERSION_INSTALLATION_FAILED = 'VERSION_INSTALLATION_FAILED',
}
export interface sw_interface {
  event: SW_EVENTS;
  msg: string;
  showReload: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class SwService {
  public swEvent = new BehaviorSubject<sw_interface | null>(null);
  private eventMsg = {
    [SW_EVENTS.VERSION_DETECTED]: 'New Version Getted, Please Reload the page',
    [SW_EVENTS.VERSION_READY]: 'New Version Ready To Load, Please Reload the page',
    [SW_EVENTS.VERSION_INSTALLATION_FAILED]: 'Version Instalation Faild Please Reload the page'
  }


  constructor(public updates: SwUpdate) {
    console.log("service is activated");
    //======================[Check PWA Version Updates]========================//
    updates.versionUpdates.subscribe(evt => {
      console.log("service is activated (versionUpdates)", evt, evt.type);
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version  (versionUpdates): ${evt.version.hash}`);
          this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY], showReload: true })
          break;
        case 'VERSION_READY':
          console.log(`Current app version  (versionUpdates): ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY], showReload: true })
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version  (versionUpdates) '${evt.version.hash}': ${evt.error}`);
          this.swEvent.next({ event: SW_EVENTS.VERSION_INSTALLATION_FAILED, msg: this.eventMsg[SW_EVENTS.VERSION_INSTALLATION_FAILED], showReload: true })
          break;
      }
    });
    //=================
    updates.unrecoverable.subscribe(event => {
      console.log(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
    this.checkPWAUpdatedion()
    console.log(updates.isEnabled.valueOf());
    console.log(updates.isEnabled);
  }

  //======================[Check PWA UPDATE]========================//
  checkPWAUpdatedion() {
    this.updates.checkForUpdate().then((res: boolean) => {
      console.log("check for update working result (checkForUpdate)", res);
      if (res) {
        this.updates.versionUpdates.subscribe(evt => {
          console.log("service is activated (checkForUpdate)", evt, evt.type);
          switch (evt.type) {
            case 'VERSION_DETECTED':
              console.log(`Downloading new app version: ${evt.version.hash}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY], showReload: true })
              break;
            case 'VERSION_READY':
              console.log(`Current app version (checkForUpdate): ${evt.currentVersion.hash}`);
              console.log(`New app version ready for use (checkForUpdate): ${evt.latestVersion.hash}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY], showReload: true })
              break;
            case 'VERSION_INSTALLATION_FAILED':
              console.log(`Failed to install app version (checkForUpdate)'${evt.version.hash}': ${evt.error}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_INSTALLATION_FAILED, msg: this.eventMsg[SW_EVENTS.VERSION_INSTALLATION_FAILED], showReload: true })
              break;
          }
        }, err => {
          console.log("getting error", err);
        });
      } else {
        console.log("vesion false");
      }
    }).catch((err) => {
      console.log("error check update", err);
    })
  }
  //======================[Cached Clean And Reload]========================//
  cachecCleanAndReload() {
    this.updates.activateUpdate().then(() => {
      // window.location.reload();
      if ('caches' in window) {
        caches.keys()
          .then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
              return caches.delete(key);
            }));
          })
      }
      window.location.reload();
    })

  }
}
