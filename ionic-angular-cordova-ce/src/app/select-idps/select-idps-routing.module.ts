import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SelectIdpsPage} from './select-idps.page';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        component: SelectIdpsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        HttpClientModule],
    exports: [RouterModule],
})
export class SelectIdpsPageRoutingModule {
}
