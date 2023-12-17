import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginIdpPageRoutingModule } from './login-idp-routing.module';

import { LoginIdpPage } from './login-idp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginIdpPageRoutingModule
  ],
  declarations: [LoginIdpPage]
})
export class LoginIdpPageModule {}
