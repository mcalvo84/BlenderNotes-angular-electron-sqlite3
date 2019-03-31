import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
declare let electron: any;

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit, OnDestroy, OnChanges {

  // @Input() id = 13;

  public ipc = electron.ipcRenderer;
  post: any = {};
  getPostSuscription: Subscription = new Subscription();
  id = 0;
  items: MenuItem[];
  home: MenuItem;
  
  constructor(
    private readonly _ipc: IpcService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.getPostSuscription = this._ipc.detailPostEmiter.subscribe(result => {
      this.post = result;
      
      this.post.original = (this.post.original == '') ? 'https://www.google.com/search?q=' + this.post.original : this.post.original;

      this.items = [
        {label: this.post.title},
        {label:'', url: this.post.original, icon: 'pi pi-external-link'}
      ];
      this.home = {icon: 'pi pi-home', routerLink: '/'};

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
