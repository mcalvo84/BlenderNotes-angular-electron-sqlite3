import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public title = 'my app';
  public ipc = electron.ipcRenderer;
  public list: {}[] = [];

  constructor(
    public postsService: PostsService,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    let me = this;
    me.ipc.send('postsGetPosts')
    me.ipc.on('postsGetPostsResultSent', function (evt, result) {
      console.log('postsGetPostsResultSent1', result);
      me.list = result;
      me.ref.detectChanges()
    });
  }

  onClickPost(id) {
    let me = this;
    me.ipc.send('postsGetPostById', id)
    me.ipc.on('postsGetPostByIdResultSent', function (evt, result) {
      console.log('postsGetPostByIdResultSent', result);
      me.list = result;
      me.ref.detectChanges()
    });
  }

  onNavigatePostEdit(id) {
    let me = this;
    me.router.navigate(['/post/edit/', id]);
    me.ref.markForCheck(); // detectChanges()
    me.router.navigateByUrl('/post/edit/' + id);
    me.ref.detectChanges()
  }

}
