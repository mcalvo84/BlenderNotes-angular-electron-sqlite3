import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, EventEmitter } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
declare let electron: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy, OnChanges {

  // @Input() id = 13;

  public ipc = electron.ipcRenderer;
  post: any = {};
  getPostSuscription: Subscription = new Subscription();
  id = 0;

  constructor(
    private readonly _ipc: IpcService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.getPostSuscription = this._ipc.detailPostEmiter.subscribe(result => {
      this.post = result;
      this.ref.detectChanges();
    });
    this.id = this.route.snapshot.params.id;
    if (this.id > 0) {
      this._ipc.send('postsGetPostById', this.id);
    } else {
      this.ref.detectChanges();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.getPostSuscription.unsubscribe();
  }

  ngOnChanges() {
  }
}
