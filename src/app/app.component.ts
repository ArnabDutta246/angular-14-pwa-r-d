import { Component, NgZone, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs/internal/observable/interval';
import { SwService } from './services/sw/sw.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private swUpdate: SwUpdate, private ngZone: NgZone, private swServ: SwService) { }

  ngOnInit(): void {
    console.log("app component ts", this.swUpdate.isEnabled);

    // if (this.swUpdate.isEnabled) {
    this.ngZone.runOutsideAngular(() =>
      interval(1000 * 10).subscribe(val => {
        console.log("interval:", val)
        this.swServ.check();
        this.swUpdate.available.subscribe(() => {
          console.log("New version available. Load New Version?");
          if (confirm("New version available. Load New Version?")) {
            //  window.location.reload();
          }
        });
      })
    )
    // }
  }
  fun(e, k) {
    // console.log(k);
    // console.log('Calling')
  }
}
