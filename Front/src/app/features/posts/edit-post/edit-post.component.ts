import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  post: any;

  constructor(
    public postsService: PostsService,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    let me = this;
    me.ipc.send('postsGetPostById', 1)
    me.ipc.on('postsGetPostByIdResultSent', function (evt, result) {
      console.log('postsGetPostByIdResultSent', result);
      me.post = result;
      me.ref.detectChanges()
    });
  }

  onNavigatePosts() {
    let me = this;
    this.router.navigate(['/']);
    me.ref.detectChanges()
  }
}
