import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [
      CommonModule,
        SharedModule,
        HomeRoutingModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
    ]
})
export class HomeModule {}
