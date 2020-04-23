import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buddies',
  template: `
    <div *ngFor="let post of posts">
      <p>{{ post.name }}</p>
      <p>{{ post.username }}</p>
      <p>{{ post.text }}</p>
      <p>{{ post.created_at | date }}</p>
      <hr>
    </div>

    <form [formGroup]="form" (submit)="submit()">
      <textarea formControlName="text"></textarea>
      <button type="submit">Create Post</button>
    </form>
  `,
  styles: []
})
export class BuddiesComponent implements OnInit {

  posts: Post[];

  form = this.fb.group({
    text: []
  });

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getFriendsPosts().subscribe(posts => this.posts = posts);
  }

  submit(): void {
    const { text } = this.form.value;

    this.postsService.createPost(text).subscribe(() => {
      this.postsService.getFriendsPosts().subscribe(posts => this.posts = posts);
    });
  }
}
