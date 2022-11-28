import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I_Products } from './folder.interface';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private url = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) { }

  // get allProducts
  getAllProducts(): Observable<I_Products[]> {
    return this.http.get(this.url) as Observable<I_Products[]>;
  }
}
