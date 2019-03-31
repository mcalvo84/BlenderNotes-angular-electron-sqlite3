import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  currentUser = null;

  constructor() { }

  public setUser(user: string) {
    this.currentUser = user;
  }
}
