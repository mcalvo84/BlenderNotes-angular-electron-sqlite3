import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { Feed } from 'src/app/core/models/feed';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feeds;
  feedReady = false;

  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit() {
    this.feedService.getFeedContent('https://www.blendernation.com/feed/')
    .subscribe((resp: Feed) => {
      console.log(resp)
      this.feedReady = true;
      this.feeds = resp; //this.feedService.extractFeeds(resp);
    })
  }

}
