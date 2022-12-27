import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { I_Post } from "./post.interface";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) { }

    fetchPost() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }

    addPost(postsData) {
        return this.http.post('https://jsonplaceholder.typicode.com/posts', postsData);
    }

    deletePost(id: number) {
        return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + id);
    }

    updatePost(payload, id: number) {
        return this.http.put('https://jsonplaceholder.typicode.com/posts/' + id, payload);
    }

    singlePost(id: number): Observable<I_Post> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id) as Observable<I_Post>;
    }
}