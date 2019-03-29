import { Component, OnInit } from '@angular/core';
import { FeedService } from './features/feeds/feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Blender Notes';
  public filtroExclusivoCheck = true;

  constructor(public feedService: FeedService) { }

  ngOnInit() { }

  filtroExclusivoCheckOnChange(e) {
    this.filtroExclusivoCheck = e.checked;
  }

}
