import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AccordionModule} from 'primeng/accordion';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';;
import {SelectButtonModule} from 'primeng/selectbutton';
import {ListboxModule} from 'primeng/listbox';
import {EditorModule} from 'primeng/editor';
import {MenuItem} from 'primeng/api';
import {ContextMenuModule} from 'primeng/contextmenu';
import { Error404Component } from './error/error404.component';
import { Error500Component } from './error/error500.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    TabViewModule,
    DropdownModule,
    MenubarModule,
    InputTextModule,
    DialogModule,
    CardModule,
    BreadcrumbModule,
    CheckboxModule,
    SelectButtonModule,
    ListboxModule,
    MultiSelectModule,
    EditorModule,
    InputSwitchModule,
    AccordionModule,
    ScrollPanelModule,
    ContextMenuModule,
    PipesModule
  ],
  declarations: [
    Error404Component,
    Error500Component,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    TabViewModule,
    DropdownModule,
    MenubarModule,
    InputTextModule,
    DialogModule,
    CardModule,
    BreadcrumbModule,
    CheckboxModule,
    SelectButtonModule,
    ListboxModule,
    MultiSelectModule,
    EditorModule,
    InputSwitchModule,
    AccordionModule,
    ScrollPanelModule,
    ContextMenuModule,
    PipesModule
  ]
})
export class SharedModule { }
