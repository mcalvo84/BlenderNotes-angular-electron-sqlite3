// https://stackoverflow.com/questions/47353218/multiple-modules-and-routing-in-angular-5
import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
    {path: 'submodule', loadChildren: 'app/submodule/submodule.module#SubModule'},
];

export const ModuleRouting: ModuleWithProviders = RouterModule.forRoot(routes);
