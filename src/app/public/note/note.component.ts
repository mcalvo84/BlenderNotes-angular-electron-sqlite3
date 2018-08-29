import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  note: {id: number, text: string} = {id: null, text: null};

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    console.log('NoteComponent :: ngOnInit');
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.note.id = +params['id'];
          this.note.text = 'Some Text for Note#'+this.note.id;
        } else {
          this.note = {id: 1, text: "Default note"};
        }
      }, (error) => {console.error(error);}
    );
  }

}
