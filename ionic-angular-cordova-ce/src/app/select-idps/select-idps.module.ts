import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectIdpsPageRoutingModule } from './select-idps-routing.module';

import { SelectIdpsPage } from './select-idps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectIdpsPageRoutingModule
  ],
  declarations: [SelectIdpsPage]
})
export class SelectIdpsPageModule {}
