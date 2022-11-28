import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common/common.service';
import { SwService, sw_interface } from '../services/sw/sw.service';
import { I_Products } from './folder.interface';
import { FolderService } from './folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public currentApplicationVersion = environment.appVersion;
  public msg: string;
  public products: I_Products[] = [];
  constructor(private folderServ: FolderService, private swUpdate: SwUpdate, private activatedRoute: ActivatedRoute, private swService: SwService, private common: CommonService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getServiceWorkerUpdate();

    //===============Get Products=================//
    this.getAllProducts()
  }
  getAllProducts(): void {
    this.folderServ.getAllProducts().subscribe(
      (res: I_Products[]) => {
        this.products = res['products'];
      }
    )
  }

  //========================//
  getApiResponse() {
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
