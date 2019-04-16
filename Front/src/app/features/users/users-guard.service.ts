

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {

    constructor(private authService: UsersService, private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (!this.authService.currentUser) {
            //console.log('No estás logueado');
            this.router.navigate(['/users']);
            return false;
        }

        return true;
    }
}
