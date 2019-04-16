import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { zip, Subscription } from 'rxjs';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {

  @Input() feed: any;
  addSimplePostSuscription: Subscription = new Subscription();
  addImageSimplePostSuscription: Subscription = new Subscription();

  constructor(
    private readonly _ipc: IpcService,
    private ref: ChangeDetectorRef
  ) {
    this.addSimplePostSuscription = zip(
      this._ipc.addSimplePostEmitter,
      this._ipc.addImageSimplePostEmitter
    ).subscribe((data) => {
      //console.log(data);
      this._ipc.send('updatePostImage', {imgID: data[1], postID: data[0]});
    })

    this.addImageSimplePostSuscription = this._ipc.updatePostImageEmitter.subscribe(result => {
      //console.log(result)
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.addSimplePostSuscription.unsubscribe();
    this.addImageSimplePostSuscription.unsubscribe();
  }

  openLinkInBrowser() {
    window.open(this.feed.link);
  }

  addToPosts(feed) {
      this._ipc.send('addSimplePost', feed),
      this._ipc.send('addImageSimplePost', feed.enclosure.link)
  }
}
