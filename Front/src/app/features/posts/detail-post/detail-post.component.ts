import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { StateService } from 'src/app/core/state.service';
import { PostsService } from 'src/app/core/api/posts.service';
declare let electron: any;

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit, OnDestroy {

  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['', 'detailPost'];
  id = 0;
  items: MenuItem[];
  home: MenuItem;

  constructor(
    private postsService: PostsService,
    public stateService: StateService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    // Layout settings
    this.stateService.data.display = 'detail';
    this.stateService.emitChange('display');

    // Detect state changes
    this.stateSuscription =
    this.stateService.changeEmitter.subscribe(element => {
      if (this.stateItems.indexOf(element)) {
        this.buildBreadcrumbs();
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

  private buildBreadcrumbs() {
    if (this.stateService.data.detailPost.original === '') {
      this.stateService.data.detailPost.original =
        'https://www.google.com/search?q=' +
        this.stateService.data.detailPost.original;
    }
    this.items = [
      {label: this.stateService.data.detailPost.title},
      {label: '', url: this.stateService.data.detailPost.original, icon: 'pi pi-external-link'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
