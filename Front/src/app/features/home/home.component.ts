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
  display = {
    edit: false,
    detail: false
  };
  actionId = {
    edit: 0,
    detail: 0
  };

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

  showDialog(dialog, id) {
    console.log(dialog, id);
    this.actionId[dialog] = id;
    this.display[dialog] = true;

    this.actionId = Object.assign({}, this.actionId);
    this.display = Object.assign({}, this.display);

    this.ref.detectChanges()

    console.log(this.display, this.actionId);
  }

  onHide(dialog) {
    console.log("salgo")
    this.actionId[dialog] = 0;
    this.display[dialog] = false;

    this.actionId = Object.assign({}, this.actionId);
    this.display = Object.assign({}, this.display);

    this.ref.detectChanges()
  }

  onNavigatePostEdit(id) {
    let me = this;
    me.router.navigate(['/post/edit/', id]);
    me.ref.markForCheck(); // detectChanges()
    me.router.navigateByUrl('/post/edit/' + id);
    me.ref.detectChanges()
  }

}
