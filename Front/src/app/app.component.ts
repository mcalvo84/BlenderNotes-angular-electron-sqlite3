import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
declare let electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'my app';
  public ipc = electron.ipcRenderer;
  public list: {}[] = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    let me = this;
    me.ipc.send("postsGetPosts")
    me.ipc.on("postsGetPostsResultSent", function (evt, result) {
      console.log("postsGetPostsResultSent1", result)
      me.list = result;
      me.ref.detectChanges()
    });
  }

  onClickPost(id) {
    let me = this;
    me.ipc.send("postsGetPostById", id)
    me.ipc.on("postsGetPostByIdResultSent", function (evt, result) {
      console.log("postsGetPostByIdResultSent", result)
      me.list = result;
      me.ref.detectChanges()
    });
  }

}
