import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { DetailPostComponent } from './posts/detail-post/detail-post.component';
import { SummaryPostComponent } from './posts/summary-post/summary-post.component';

import { PostsService } from './posts/posts.service';

@NgModule({
  imports: [
    //CommonModule,
    FeaturesRoutingModule
  ],
  declarations: [
    PostsComponent, EditPostComponent, DetailPostComponent, SummaryPostComponent
  ],
  exports: [
    // CommonModule
  ],
  providers: [
    PostsService
  ]
})
export class FeaturesModule { }
