import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common/common.service';
import { SwService, sw_interface } from '../services/sw/sw.service';
import { UnsubscribeClass } from '../services/unsubscribe/unsubscribe';
import { I_Products } from './folder.interface';
import { FolderService } from './folder.service';
import { takeUntil } from 'rxjs/operators';
import { interval, ReplaySubject, Subject, Unsubscribable } from 'rxjs';
import { AutoUnsub } from '../services/unsubscribe/autoUnsubscribe';
import { CombineSubscriptions, DestroySubscribers } from '../services/unsubscribe/autoUnsubscribeObservable';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

@DestroySubscribers({
  destroyFunc: 'ngOnDestroy',
})

// @AutoUnsub()
export class FolderPage implements OnInit, OnDestroy {
  @CombineSubscriptions()
  private subscriber: Unsubscribable;
  public folder: string;
  public msg: string;
  public products: I_Products[] = [];



  constructor(
    private folderServ: FolderService,
    private swUpdate: SwUpdate,
    private activatedRoute: ActivatedRoute,
    private swService: SwService,
    private common: CommonService
  ) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getServiceWorkerUpdate();

    //===============Get Products=================//
    this.getAllProducts();
    this.getSingleProducts(2)
    const numbers = interval(4000);
    this.subscriber = numbers
      .subscribe(x => console.log('Next: ', x));
    const numbers1 = interval(6000);
    this.subscriber = numbers1
      .subscribe(x => console.log('Next: ', x));
  }


  getAllProducts(): void {
    console.log("Calling get all products....")
    this.subscriber = this.folderServ.getAllProducts()
      .subscribe(
        (res: I_Products[]) => {
          this.products = res['products'];
          console.log("products")
        }
      )
  }
  getSingleProducts(id: number): void {
    console.log("Calling get single products....")
    this.subscriber = this.folderServ.getSingleProducts(id)
      .subscribe(
        (res: I_Products) => {
          let products = res;
          console.log("getSingleProducts")
        }
      )
  }
  ngOnDestroy(): void {
    // console.log("is subscriber:....", this.componentDestroyed$)
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

}
