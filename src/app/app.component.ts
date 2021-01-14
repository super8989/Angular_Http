import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'http';
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    // this.fetchPosts();

    this.postsService.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // console.log(postData);

    // Moved to posts.service
    // Send Http request are only sent when you subscribe
    // this.http
    //   .post<{ name: string }>(
    //     'https://angular-http-175a0-default-rtdb.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });

    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPosts();

    this.postsService.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  // Moved to posts.service
  // private fetchPosts() {
  //   this.isFetching = true;

  //   this.http
  //     .get<{ [key: string]: Post }>(
  //       'https://angular-http-175a0-default-rtdb.firebaseio.com/posts.json'
  //     )
  //     .pipe(
  //       // map((responseData: { [key: string]: Post }) => {
  //       map((responseData) => {
  //         // console.log('responseData', responseData);
  //         const postsArray: Post[] = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             postsArray.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return postsArray;
  //       })
  //     )
  //     .subscribe((posts) => {
  //       // console.log('posts', posts);
  //       this.isFetching = false;
  //       this.loadedPosts = posts;
  //     });
  // }
}
