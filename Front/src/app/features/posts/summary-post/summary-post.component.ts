import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary-post',
  templateUrl: './summary-post.component.html',
  styleUrls: ['./summary-post.component.css']
})
export class SummaryPostComponent implements OnInit {
  @Input() post: any;

  constructor() { }

  ngOnInit() {
  }

}
