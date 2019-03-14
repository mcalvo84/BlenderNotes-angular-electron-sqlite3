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
  public categoryTypes: {}[] = [];
  display = false;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    let me = this;
    me.ipc.send("postsGetPosts")
    me.ipc.on("postsGetPostsResultSent", function (evt, result) {
      console.log("postsGetPostsResultSent1", result)
      me.list = result;
      me.ref.detectChanges()
    });

    me.ipc.send("catGetCategoryTypes")
    me.ipc.on("catGetCategoryTypesResultSent", function (evt, result) {
      console.log("catGetCategoryTypes", result)
      me.categoryTypes = result;
      me.ref.detectChanges()
    });
  }

  onClose() {
    console.log("onClose");
    this.ipc.send('window-all-closed');
  }
}
