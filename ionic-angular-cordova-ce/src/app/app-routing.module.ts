import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'select-idps',
        loadChildren: () => import('./select-idps/select-idps.module').then(m => m.SelectIdpsPageModule)
    },
    {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'login-idp',
        loadChildren: () => import('./login-idp/login-idp.module').then(m => m.LoginIdpPageModule)
    },
    {
        path: 'code-exchange',
        loadChildren: () => import('./code-exchange/code-exchange.module').then(m => m.CodeExchangePageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
