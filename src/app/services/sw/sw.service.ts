import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
export enum SW_EVENTS {
  VERSION_DETECTED = 'VERSION_DETECTED',
  VERSION_READY = 'VERSION_READY',
  VERSION_INSTALLATION_FAILED = 'VERSION_INSTALLATION_FAILED',
}
export interface sw_interface {
  event: SW_EVENTS;
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class SwService {
  public swEvent = new BehaviorSubject<sw_interface | null>(null);
  private eventMsg = {
    [SW_EVENTS.VERSION_READY]: 'New Version Getted, Please Reload the page',
    [SW_EVENTS.VERSION_INSTALLATION_FAILED]: 'Version Instalation Faild Please Reload the page'
  }

  constructor(public updates: SwUpdate) {
    console.log("service is activated");
    //=================
    updates.versionUpdates.subscribe(evt => {
      console.log("service is activated", evt, evt.type);
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          // this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY] })
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          // this.swEvent.next({ event: SW_EVENTS.VERSION_INSTALLATION_FAILED, msg: this.eventMsg[SW_EVENTS.VERSION_INSTALLATION_FAILED] })
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


    updates.checkForUpdate().then((res: boolean) => {
      console.log("check for update working result", res);
      if (res) {
        updates.versionUpdates.subscribe(evt => {
          console.log("service is activated", evt, evt.type);
          switch (evt.type) {
            case 'VERSION_DETECTED':
              console.log(`Downloading new app version: ${evt.version.hash}`);
              break;
            case 'VERSION_READY':
              console.log(`Current app version: ${evt.currentVersion.hash}`);
              console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY] })
              break;
            case 'VERSION_INSTALLATION_FAILED':
              console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_INSTALLATION_FAILED, msg: this.eventMsg[SW_EVENTS.VERSION_INSTALLATION_FAILED] })
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

    console.log(updates.isEnabled.valueOf());
    console.log(updates.isEnabled);

  }

  check() {
    this.updates.checkForUpdate().then((res: boolean) => {
      console.log("check for update working result", res);
      if (res) {
        this.updates.versionUpdates.subscribe(evt => {
          console.log("service is activated", evt, evt.type);
          switch (evt.type) {
            case 'VERSION_DETECTED':
              console.log(`Downloading new app version: ${evt.version.hash}`);
              break;
            case 'VERSION_READY':
              console.log(`Current app version: ${evt.currentVersion.hash}`);
              console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_READY, msg: this.eventMsg[SW_EVENTS.VERSION_READY] })
              break;
            case 'VERSION_INSTALLATION_FAILED':
              console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
              this.swEvent.next({ event: SW_EVENTS.VERSION_INSTALLATION_FAILED, msg: this.eventMsg[SW_EVENTS.VERSION_INSTALLATION_FAILED] })
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

    console.log(this.updates.isEnabled.valueOf());
    console.log(this.updates.isEnabled);
  }
}
