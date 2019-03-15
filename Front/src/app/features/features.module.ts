import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [HomeComponent, PostsComponent, PostDetailComponent]
})
export class FeaturesModule { }
