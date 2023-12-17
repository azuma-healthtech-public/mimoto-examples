import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeExchangePageRoutingModule } from './code-exchange-routing.module';

import { CodeExchangePage } from './code-exchange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeExchangePageRoutingModule
  ],
  declarations: [CodeExchangePage]
})
export class CodeExchangePageModule {}
