import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
declare let electron: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy, OnChanges {

  @Input() id = 0;

  public ipc = electron.ipcRenderer;
  post: any = {};
  getPostSuscription;

  constructor(
    public postsService: PostsService,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit() {
    this.getPostSuscription = this.ipc.on('postsGetPostByIdResultSent', (evt, result) => {
      console.log('postsGetPostByIdResultSent', result);
      this.post = result[0];
      this.ref.detectChanges();
    });
  }

  ngOnDestroy() {
    this.getPostSuscription.unsubscribe();
  }

  ngOnChanges() {
    this.ipc.send('postsGetPostById', this.id);
  }
}
