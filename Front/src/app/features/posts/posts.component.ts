import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public ipc = electron.ipcRenderer;
  public list: {}[] = [];

  constructor(
    public postsService: PostsService,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.ipc.send('[posts][get][list]');
    this.ipc.on('[posts][result][list][published]', (evt, result) => {
      this.list = result;
      this.ref.detectChanges();
    });
    this.ipc.on('[posts][result][list][unpublished]', (evt, result) => {
      this.list = result;
      this.ref.detectChanges();
    });
    this.ipc.on('[posts][result][list]', (evt, result) => {
      this.list = result;
      this.ref.detectChanges();
    });
  }

}
