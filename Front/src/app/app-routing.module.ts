import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error500Component } from './shared/error/error500.component';
import { Error404Component } from './shared/error/error404.component';
import { HomeComponent } from './features/home/home.component';
import { PostsComponent } from './features/posts/posts.component';
import { DetailPostComponent } from './features/posts/detail-post/detail-post.component';
import { UsersComponent } from './features/users/users.component';
import { UsersGuard } from './features/users/users-guard.service';

const routes: Routes = [
  // { path: '', loadChildren: './features/features.module#FeaturesModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,  canActivate: [UsersGuard]},
  { path: 'posts', component: PostsComponent,  canActivate: [UsersGuard]},
  { path: 'posts/detail/:id', component: DetailPostComponent,  canActivate: [UsersGuard]},
  { path: 'users', component: UsersComponent},
  { path: 'error', component: Error500Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
