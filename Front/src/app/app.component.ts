import { Component, OnInit } from '@angular/core';
import { FeedService } from './features/feeds/feed.service';
import { Store, Action } from '@ngrx/store';
import { IFeaturesState } from './features/features.reducer';

import { FeaturesActionTypes, FilterModeAndAction, FilterModeOrAction } from "./features/features.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Blender Notes';
  public filtroExclusivoCheck = true;

  constructor(
    private store: Store<{feature: IFeaturesState}>,
    public feedService: FeedService
  ) { 
    this.store.subscribe( state => {
      console.log(JSON.stringify(state));
      this.filtroExclusivoCheck = state.feature.filterMode;
    })
    /* this.store.select('feature', 'filterMode', 'feature.filterMode') .subscribe(filterMode => {
      console.log(filterMode);
      this.filtroExclusivoCheck = filterMode;
    }) */
  }

  ngOnInit() { }

  filtroExclusivoCheckOnChange(e) {
    const action = (e.checked) ? new FilterModeAndAction() : new FilterModeOrAction() 
    this.store.dispatch( action );
  }

}
