import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedService } from './features/feeds/feed.service';
import { StateService } from './core/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Blender Notes';
  public filtroExclusivoCheck = true;
  private stateItems = ['', 'display'];

  constructor(
    public stateService: StateService,
    private ref: ChangeDetectorRef,
    public feedService: FeedService
  ) {
    // Detect state changes
    this.stateService.changeEmitter.subscribe(element => {
      if (this.stateItems.indexOf(element)) {
        this.ref.detectChanges();
      }
    });
  }

  ngOnInit() { }

  filtroExclusivoCheckOnChange(e) {
    this.filtroExclusivoCheck = e.checked;
  }

}
