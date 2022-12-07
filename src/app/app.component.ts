import { Component, NgZone, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';
import { environment } from 'src/environments/environment';
import { SwService } from './services/sw/sw.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentApplicationVersion = environment.appVersion;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Profile', url: '/profile', icon: 'warning' },
    { title: 'Dashboard', url: '/dashboard', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private swUpdate: SwUpdate, private ngZone: NgZone, private swServ: SwService) { }

  ngOnInit(): void {
    console.log("app component ts", this.swUpdate.isEnabled);
  }
  fun(e, k) {
    // console.log(k);
    // console.log('Calling')
  }
}
