import { Post } from 'src/app/models/posts.model';
import { AppState } from './../../store/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updatePost } from '../posts-list/state/posts.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { getPostById } from '../posts-list/state/posts.selector';
import { ForwardRefHandling } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  postForm: FormGroup = new FormGroup({});
  postSub: Subscription | undefined;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      const id = params.get('id');
      this.postSub = this.store
        .select(getPostById, { id })
        .subscribe((data) => {
          this.post = data;
          console.log(this.post);
          this.createForm();
        });
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onEditPost() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.postForm.value);
    const { title, description } = this.postForm.value;
    const post: Post = { id: this.post?.id, title, description };
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
  }

  showDescriptionErrors(): string {
    const descControl = this.postForm.get('description');
    if (descControl?.touched && !descControl.valid) {
      if (descControl?.errors?.['required']) {
        return 'Description is required';
      }
      if (descControl?.errors?.['minlength']) {
        return 'Description should be at least 10 characters long';
      }
    }
    return '';
  }
}
