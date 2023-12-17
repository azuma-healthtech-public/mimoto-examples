import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginIdpPage } from './login-idp.page';

const routes: Routes = [
  {
    path: '',
    component: LoginIdpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginIdpPageRoutingModule {}
