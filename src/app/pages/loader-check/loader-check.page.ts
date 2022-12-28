import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoaderInjectService } from 'src/app/services/intercept/api-loader-state/loader-subject.service';
import { ApiLoaderState } from 'src/app/services/intercept/api-loader-state/loader.state';
import { LoaderCheckService } from './services/loader-check.services';
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-loader-check',
  templateUrl: './loader-check.page.html',
  styleUrls: ['./loader-check.page.scss'],
})
export class LoaderCheckPage implements OnInit {
  // @Select(ApiLoaderState.getLoaderStatus('posts')) posts$: Observable<boolean>;
  // @Select(ApiLoaderState.getLoaderStatus('comments')) comments$: Observable<boolean>;
  // @Select(ApiLoaderState.getLoaderStatus('photos')) photos$: Observable<boolean>;
  posts$: Observable<boolean>;
  comments$: Observable<boolean>;
  photos$: Observable<boolean>;
  public posts = null;
  public comments = null;
  public photos = null;
  constructor(private store: Store, private loaderCheckServ: LoaderCheckService, private loaderS: LoaderInjectService) { }

  ngOnInit() {
    this.posts$ = this.loaderS.loaderSub$.pipe(map(item => item['posts']))
    this.comments$ = this.loaderS.loaderSub$.pipe(map(item => item['comments']));
    this.photos$ = this.loaderS.loaderSub$.pipe(map(item => item['photos']));
    // Posts call
    setTimeout(() => {
      this.getPost();
    }, 4000);
    // Post comments
    setTimeout(() => {
      this.getPostComment();
    }, 2000);
    // Photos
    setTimeout(() => {
      this.getPostPhotos();
    }, 6000);
  }

  // get post
  getPost() {
    this.loaderCheckServ
      .singlePost(1)
      .subscribe((res: any) => {
        console.log("Post data:", res);
        this.posts = res[0];
      },
        err => {
          console.log(err);

        }
      )
  }

  getPostComment() {
    this.loaderCheckServ
      .singlePostComment(1)
      .subscribe((res: any) => {
        console.log("Post Comments:", res);
        this.comments = res[0];
      },
        err => {
          console.log(err);

        }
      )
  }

  getPostPhotos() {
    this.loaderCheckServ
      .singlePostPhotos(1)
      .subscribe((res: any) => {
        console.log("Post Images:", res);
        this.photos = res[0];
      },
        err => {
          console.log(err);

        }
      )
  }
}
