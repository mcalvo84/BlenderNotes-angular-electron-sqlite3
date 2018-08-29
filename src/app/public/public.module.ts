import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicComponent } from '../public/public.component';
import { NoteComponent } from './note/note.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PublicComponent
  ],
  declarations: [NoteComponent, HomeComponent]
})
export class PublicModule { }
