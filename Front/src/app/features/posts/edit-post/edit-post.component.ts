import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, OnChanges, EventEmitter } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { IpcService } from 'src/app/ipc.service';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/core/state.service';
import { PostsService } from 'src/app/core/api/posts.service';
declare let electron: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy, OnChanges {

  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['detailPost'];
  id = 0;

  constructor(
    private postsService: PostsService,
    public stateService: StateService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    // Detect state changes
      console.log('antes de suscribirme');
    this.stateSuscription =
    this.stateService.changeEmitter.subscribe(element => {
      console.log('stateService.changeEmitter.subscribe', element, this.stateItems);
      if (this.stateItems.indexOf(element)) {
        console.log(this.stateService.data.detailPost);
        this.ref.detectChanges();
      }
    });

    // Get detail of post or create new one
    this.id = this.route.snapshot.params.id;
    if (this.id > 0) {
      this.postsService.send('[posts][get][byID]', this.id);
    } else {
      this.ref.detectChanges();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.stateSuscription.unsubscribe();
  }

  ngOnChanges() {
  }
}
