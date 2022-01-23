import { Post } from './../../../models/posts.model';

export interface PostsState {
  posts: Post[];
}

export const initialPostsState: PostsState = {
  posts: [
    { id: '1', title: 'Title Sample 1', description: 'Description Sample 1' },
    { id: '2', title: 'Title Sample 2', description: 'Description Sample 2' },
    { id: '3', title: 'Title Sample 3', description: 'Description Sample 3' },
  ],
};
