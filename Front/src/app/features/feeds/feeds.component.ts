import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedService } from './feed.service';
import { Feed } from 'src/app/core/models/feed';
import { StateService } from 'src/app/core/state.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feeds;
  feedReady = false;

  constructor(
    private ref: ChangeDetectorRef,
    public feedService: FeedService,
    public stateService: StateService,
  ) { }

  ngOnInit() {
    this.feedService.getFeedContent(this.stateService.data.currentBlogroll)
    .subscribe((resp: Feed) => {
      console.log(resp)
      this.feedReady = true;
      this.feeds = resp; //this.feedService.extractFeeds(resp);
      this.ref.detectChanges();
    })
  }

}
