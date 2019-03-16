import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [SharedModule],
  declarations: []
})
export class CoreModule { }
