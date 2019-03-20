import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

// It keeps this format because the tabs use routes
const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
})
export class HomeRoutingModule {}
