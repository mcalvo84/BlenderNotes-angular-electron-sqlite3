import { Component, OnInit } from '@angular/core';

// import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tab = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(
      (fragment: any) => {
        this.tab = (fragment) ? fragment : '';
      }, (error) => {console.error(error);}
    );
  }

}
