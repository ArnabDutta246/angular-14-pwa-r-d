import { Component, OnInit } from '@angular/core';
import { IndexedDbService, I_IndexedDB_INSERT } from 'src/app/services/indexedDB/indexed-db.service';
import { ALL_TABLE_NAME } from 'src/app/services/indexedDB/indexedDB';
export interface I_Products {
  prd_name: string;
  prd_price: number;
  prd_description: string;
  key?: any;
}
@Component({
  selector: 'app-indexed-db',
  templateUrl: './indexed-db.page.html',
  styleUrls: ['./indexed-db.page.scss'],
})
export class IndexedDBPage implements OnInit {
  prd_name: string;
  prd_price: number;
  prd_description: string;
  prd_key: any;
  update: boolean = false;
  allProducts: I_Products[] = [];
  constructor(
    private indexedDB_Serv: IndexedDbService<I_Products>
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  updateItem(item: I_Products) {
    this.prd_name = item.prd_name
    this.prd_price = item.prd_price;
    this.prd_description = item.prd_description;
    this.prd_key = item.key;
    this.update = true;
  }
  submitUpdate() {
    let product: I_Products = {
      key: this.prd_key,
      prd_name: this.prd_name,
      prd_description: this.prd_description,
      prd_price: this.prd_price
    }
    this.updateProducts(product);
  }
  reset() {
    this.update = false;
    this.prd_key = null
    this.prd_name = '';
    this.prd_description = '';
    this.prd_price = null;
    this.getProducts();
  }
  //********************[Add Indexed DB Function]*******************/
  addProducts() {
    if (this.prd_name && this.prd_price && this.prd_description) {
      let insertObj: I_IndexedDB_INSERT<I_Products>[] = [
        {
          'tableName': ALL_TABLE_NAME.PRODUCT,
          'data': { 'prd_name': this.prd_name, 'prd_description': this.prd_description, 'prd_price': this.prd_price }
        }
      ]
      this.indexedDB_Serv
        .insertNewData(insertObj)
        .then((res: boolean) => {
          console.log("Getting success", res);
          this.reset();
        })
        .catch(err => {
          console.log("Getting error", err)
        })
    }
  }
  //********************[Update Indexed DB Function]*******************/
  updateProducts(item: I_Products) {
    if (this.prd_name && this.prd_price && this.prd_description) {
      let insertObj: I_IndexedDB_INSERT<I_Products>[] = [
        {
          'tableName': ALL_TABLE_NAME.PRODUCT,
          'data': { 'prd_name': this.prd_name, 'prd_description': this.prd_description, 'prd_price': this.prd_price, 'key': this.prd_key }
        }
      ]
      this.indexedDB_Serv
        .updateInsertedData(insertObj)
        .then((res: boolean) => {
          console.log("Getting success", res);
          this.reset();
        })
        .catch(err => {
          console.log("Getting error", err)
        })
    }
  }
  //********************[Delete Indexed DB Function]*******************/
  deleteProduct(item: I_Products) {
    let insertObj: I_IndexedDB_INSERT<I_Products> =
    {
      'tableName': ALL_TABLE_NAME.PRODUCT,
      'data': { ...item }
    }

    this.indexedDB_Serv
      .deleteInsertedData(insertObj)
      .then((res: boolean) => {
        console.log("Getting success", res);
        this.reset();
      })
      .catch(err => {
        console.log("Getting error", err)
      })
  }
  //********************[Get All Data Indexed DB Function]*******************/
  getProducts() {
    this.indexedDB_Serv
      .getAllInsertedData(ALL_TABLE_NAME.PRODUCT)
      .then((res: I_Products[]) => {
        this.allProducts = res;
      })
      .catch((err: boolean) => {
        console.log("get product error: ", err)
      })
  }
}
