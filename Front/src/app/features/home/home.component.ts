import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { PostsService } from 'src/app/core/api/posts.service';
import { StateService } from 'src/app/core/state.service';
declare let electron: any;
// const { ipcRenderer } = require('electron');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  private stateSuscription: Subscription = new Subscription();
  private stateItems = ['publishedPostList', 'unpublishedPostList'];
  display = { edit: false,  detail: false };
  actionId = { edit: 0, detail: 0 };
  home: MenuItem;

  constructor(
    private postsService: PostsService,
    private ref: ChangeDetectorRef,
    public stateService: StateService
  ) {
    // Layout settings
    this.stateService.data.display = 'home';
    this.stateService.emitChange('display');

    // Detect state changes
    this.stateSuscription =
    this.stateService.changeEmitter.subscribe(element => {
      if (this.stateItems.indexOf(element)) {
        this.home = {icon: 'pi pi-home', routerLink: '/'};
        this.ref.detectChanges();
      }
    });

    // Get lists of post
    this.postsService.send('[posts][get][list]', [], 1, 4);
    this.postsService.send('[posts][get][list]', [], 0, 4);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
   this.stateSuscription.unsubscribe();
  }

  showDialog(dialog, id) {
    this.actionId[dialog] = id;
    this.display[dialog] = true;
  }

  onHide(dialog) {
    this.actionId[dialog] = 0;
    this.display[dialog] = false;
  }

}
