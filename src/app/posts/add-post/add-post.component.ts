import { Post } from './../../models/posts.model';
import { AppState } from './../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPost } from '../posts-list/state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.postForm.value);
    const { title, description } = this.postForm.value;
    const post: Post = { title, description };
    this.store.dispatch(addPost({ post }));
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
