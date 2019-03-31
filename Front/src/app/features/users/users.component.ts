import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public usersService: UsersService, public router: Router) { }

  ngOnInit() {
  }
  onSelectUser(user: string) {
    this.usersService.currentUser = user;
    this.router.navigate(['/']);
  }
}
