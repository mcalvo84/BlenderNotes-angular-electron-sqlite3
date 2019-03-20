import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { DetailPostComponent } from './posts/detail-post/detail-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule'},
  { path: 'posts', component: PostsComponent},
  { path: 'post/detail/:id', component: DetailPostComponent},
  { path: 'post/edit/:id', component: EditPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
