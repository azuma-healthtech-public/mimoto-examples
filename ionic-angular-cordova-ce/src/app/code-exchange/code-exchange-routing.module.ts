import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeExchangePage } from './code-exchange.page';

const routes: Routes = [
  {
    path: '',
    component: CodeExchangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeExchangePageRoutingModule {}
