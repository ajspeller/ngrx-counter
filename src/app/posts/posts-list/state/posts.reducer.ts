import { createReducer, on } from '@ngrx/store';
import { addPost, deletePost, updatePost } from './posts.actions';
import { initialPostsState } from './posts.state';

const _postsReducer = createReducer(
  initialPostsState,
  on(addPost, (state, action) => {
    const post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return { ...state, posts: [...state.posts, post] };
  }),
  on(updatePost, (state, action) => {
    console.log(action.post);
    const updatedPosts = state.posts.map((post) =>
      action.post.id === post.id ? action.post : post
    );
    console.log(updatedPosts);
    return { ...state, posts: updatedPosts };
  }),
  on(deletePost, (state, action) => ({
    ...state,
    posts: state.posts.filter((post) => post.id !== action.post.id),
  }))
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
