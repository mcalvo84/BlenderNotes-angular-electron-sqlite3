import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
declare let electron: any;
// const { ipcRenderer } = require('electron');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

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
  getPostSuscription: Subscription = new Subscription();

  constructor(private readonly _ipc: IpcService, private ref: ChangeDetectorRef) {
    this.getPostSuscription = this._ipc.listOfPostsEmiter.subscribe(result => {
      this.list = result;
      this.ref.detectChanges();
    })
    this._ipc.send('postsGetPosts');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.getPostSuscription.unsubscribe();
  }

  showDialog(dialog, id) {
    this.actionId[dialog] = id;
    this.display[dialog] = true;

    // this.actionId = Object.assign({}, this.actionId);
    // this.display = Object.assign({}, this.display);

   // this.ref.detectChanges()

  }

  onHide(dialog) {
    this.actionId[dialog] = 0;
    this.display[dialog] = false;

    // this.actionId = Object.assign({}, this.actionId);
    // this.display = Object.assign({}, this.display);

  //  this.ref.detectChanges()
  }

}
