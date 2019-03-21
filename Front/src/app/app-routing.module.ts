import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error500Component } from './shared/error/error500.component';
import { Error404Component } from './shared/error/error404.component';
import { HomeComponent } from './features/home/home.component';
import { PostsComponent } from './features/posts/posts.component';
import { DetailPostComponent } from './features/posts/detail-post/detail-post.component';
import { EditPostComponent } from './features/posts/edit-post/edit-post.component';

const routes: Routes = [
  // { path: '', loadChildren: './features/features.module#FeaturesModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'posts', component: PostsComponent},
  { path: 'post/detail/:id', component: DetailPostComponent},
  { path: 'post/edit/:id', component: EditPostComponent},
  { path: 'error', component: Error500Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
