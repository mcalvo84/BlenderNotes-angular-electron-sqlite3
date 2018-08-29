import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Basics
import { Routes, RouterModule } from '@angular/router';
import { ModuleRouting } from './app.routing';

// Libraries
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { NoteComponent } from './public/note/note.component';
import { HomeComponent } from './public/home/home.component';

// Routes
const appRoutes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'note', component: NoteComponent },
    { path: 'note/:id', component: NoteComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    NoteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // forRoot() will change on child modules or Shared module
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
