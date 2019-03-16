import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private ref: ChangeDetectorRef) { }

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

}
