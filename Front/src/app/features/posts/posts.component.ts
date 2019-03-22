import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  public list: {}[] = [];

  constructor(
    public postsService: PostsService,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.ipc.send('postsGetPosts')
    this.ipc.on('postsGetPostsResultSent', (evt, result) => {
      //console.log('postsGetPostsResultSent1', result);
      this.list = result;
      this.ref.detectChanges();
    });
  }

}
