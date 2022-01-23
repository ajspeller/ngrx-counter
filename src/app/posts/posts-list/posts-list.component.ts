import { Post } from 'src/app/models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getPosts } from './state/posts.selector';
import { deletePost } from './state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
  }

  deletePost(post: Post) {
    console.log(post);
    if (confirm('Are you sure you want to delete this post?')) {
      this.store.dispatch(deletePost({ post }));
    }
  }
}
