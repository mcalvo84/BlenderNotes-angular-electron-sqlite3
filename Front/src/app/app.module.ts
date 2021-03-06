import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';



import { PostsComponent } from './features/posts/posts.component';
import { DetailPostComponent } from './features/posts/detail-post/detail-post.component';
import { SummaryPostComponent } from './features/posts/summary-post/summary-post.component';
import { HomeComponent } from './features/home/home.component';
import { FeaturesService } from './features/features.service';
import { FeedsComponent } from './features/feeds/feeds.component';
import { FeedService } from './features/feeds/feed.service';
import { FeedCardComponent } from './features/feeds/feed-card/feed-card.component';
import { UsersComponent } from './features/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    DetailPostComponent,
    SummaryPostComponent,
    FeedsComponent,
    FeedCardComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [FeaturesService, FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
