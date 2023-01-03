import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AlertController, IonSlides } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { SwService, sw_interface } from 'src/app/services/sw/sw.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('img', { static: true }) img: IonSlides
  @ViewChild('clickAddToHome', { static: true, read: ElementRef<HTMLElement> }) clickAddToHome: ElementRef<HTMLElement>;
  public currentApplicationVersion = environment.appVersion;
  public msg: string;

  //================Add To Home Screen ======================//
  deferredPrompt: any;
  showButton = true;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log("hostlistener:", e);
    this.deferredPrompt = e;
    this.showButton = true;
    e.preventDefault();
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log("this is standalone app");
      this.showButton = false;
    } else {
      console.log("this is not standalone app");
    }
  }

  constructor(
    private swUpdate: SwUpdate,
    private activatedRoute: ActivatedRoute,
    private swService: SwService,
    private common: CommonService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.checkAppAlreadyAdd();
    this.getServiceWorkerUpdate();
  }
  ngAfterViewInit(): void {
    if (this.clickAddToHome) {
      // let el: HTMLElement = this.clickAddToHome.nativeElement;
      // el.click();
      let element: HTMLElement = document.getElementById('click-trigger') as HTMLElement;
      element.click();
    }
  }
  //================*******======================//
  getServiceWorkerUpdate() {
    this.swService.swEvent.subscribe((res: sw_interface) => {
      console.log("get response", res);
      this.msg = res ? res.msg : '';
    })
  }
  reloadPage() {
    this.swUpdate.activateUpdate().then(() => {
      console.log("heww");
      // window.location.reload();
      this.swService.cachecCleanAndReload();
    })
  }
  updateCheckPwa() {
    this.swService.checkPWAUpdatedion();
  }




  //==============[Check Already Installed PWA]====================
  async checkAppAlreadyAdd() {
    console.log("Has not already installed:",);
    console.log("navigator['getInstalledRelatedApps']", navigator['getInstalledRelatedApps']);

    //check if browser version supports the api
    if ('getInstalledRelatedApps' in window.navigator) {
      const relatedApps = await (window.navigator as any).getInstalledRelatedApps();
      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed
        console.log("Has already installed:", app.platform, app.url);
        // window.open('app.application-testing-ad7df.web.app/folder/Inbox')
        if (window.matchMedia('(display-mode: standalone)').matches) {
          console.log("this is standalone app");
          this.showButton = false;
        } else {
          console.log("this is not standalone app");
          this.showButton = false;
          // window.open(environment.url)
          this.goToPwaApp();
        }
      });
    } else {
      this.showButton = true;
      console.log("Has not already installed:",);
      // let el: HTMLElement = this.clickAddToHome.nativeElement;
      // el.click();
      let element: HTMLElement = document.getElementById('click-trigger') as HTMLElement;
      element.click();
    }
  }
  //==============[Add to home screen]====================
  buttonAddToHome() {
    this.addToHomeScreen();
  }
  addToHomeScreen() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          this.showButton = false;
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

  async goToPwaApp() {
    const alert = await this.alertController.create({
      header: 'Continue with installed application !',
      cssClass: 'custom-alert',
      mode: 'ios',
      buttons: [
        {
          text: 'Continue Here',
          cssClass: 'alert-button-cancel',
          handler: () => {
            // N/a
          }
        },
        {
          text: 'Open In App',
          cssClass: 'alert-button-confirm',
          handler: () => {
            window.open(environment.url)
          }
        },
      ],
    });

    await alert.present();
  }
}
