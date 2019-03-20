import { Injectable } from '@angular/core';
declare let electron: any;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public ipc = electron.ipcRenderer;
  
  constructor(/* private ref: ChangeDetectorRef, public router: Router */) { }
/* 
  onNavigateHome() {
    let me = this;
    this.router.navigate(['']);
    me.ref.detectChanges()
  }

  onNavigatePosts() {
    let me = this;
    this.router.navigate(['posts']);
    me.ref.detectChanges()
  }

  onNavigatePostDetail(id) {
    let me = this;
    this.router.navigate(['post', 'detail', 0]);
    me.ref.detectChanges()
  }

  onNavigatePostEdit(id) {
    let me = this;
    this.router.navigate(['post', 'edit', 0]);
    me.ref.detectChanges()
  } */
}
