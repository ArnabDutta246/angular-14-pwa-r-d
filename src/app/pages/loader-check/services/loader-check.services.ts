import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DbService } from "src/app/services/db/db.service";



@Injectable({
    providedIn: 'root'
})
export class LoaderCheckService {

    constructor(private http: HttpClient, private db: DbService) { }

    singlePost(id: number) {
        let params = new HttpParams()
            .set('id', id)
        return this.http.get('https://jsonplaceholder.typicode.com/posts', { params: { ...params } });
    }
    singlePostComment(id: number) {
        let params = new HttpParams()
            .set('id', id)
        return this.http.get('https://jsonplaceholder.typicode.com/comments', { params: { ...params } });
    }
    singlePostPhotos(id: number) {
        let params = new HttpParams()
            .set('id', id)
        return this.http.get('https://jsonplaceholder.typicode.com/photos', { params: { ...params } });
    }
}