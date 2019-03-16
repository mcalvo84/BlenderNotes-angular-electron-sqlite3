import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error500Component } from './shared/error/error500.component';
import { Error404Component } from './shared/error/error404.component';

const routes: Routes = [
  { path: '', loadChildren: './features/features.module#FeaturesModule' },
  { path: 'error', component: Error500Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
