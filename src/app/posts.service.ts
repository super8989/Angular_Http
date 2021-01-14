import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Post } from './post.model';

// OR add this to providers: [] in app.module
@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    //send Http request
    const postData: Post = { title, content };

    this.http
      .post<{ name: string }>(
        'https://angular-http-175a0-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-175a0-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custon-Header': 'Helloooo' }),
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
    // .subscribe((posts) => {});
  }

  deletePosts() {
    return this.http.delete(
      'https://angular-http-175a0-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
