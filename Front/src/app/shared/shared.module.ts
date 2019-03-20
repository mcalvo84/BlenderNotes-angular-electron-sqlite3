import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import { Error404Component } from './error/error404.component';
import { Error500Component } from './error/error500.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SidebarModule,
    TabViewModule,
    DropdownModule,
    MenubarModule,
    InputTextModule,
    ScrollPanelModule,
    ContextMenuModule,
    PipesModule
  ],
  declarations: [
    Error404Component,
    Error500Component,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    SidebarModule,
    TabViewModule,
    DropdownModule,
    MenubarModule,
    InputTextModule,
    ScrollPanelModule,
    ContextMenuModule,
    PipesModule
  ]
})
export class SharedModule { }
