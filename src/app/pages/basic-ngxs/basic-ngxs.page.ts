import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PostService } from './ngxs/basic-ngrx.service';
import { PostsAction } from './ngxs/basic-ngxs.action';
import { PostState } from './ngxs/basic-ngxs.state';

@Component({
  selector: 'app-basic-ngxs',
  templateUrl: './basic-ngxs.page.html',
  styleUrls: ['./basic-ngxs.page.scss'],
})
export class BasicNgxsPage implements OnInit {
  @Select(PostState.getPosts) allPosts$: Observable<any>;
  constructor(private store: Store, private postServ: PostService) { }

  ngOnInit() {

    this.store.dispatch(new PostsAction.GetPosts());

    this.allPosts$.subscribe((returnData) => {
      console.log(returnData);
    })

    this.postServ.getValue().subscribe((res: any) => {
      console.log(res);
    })
  }

}
