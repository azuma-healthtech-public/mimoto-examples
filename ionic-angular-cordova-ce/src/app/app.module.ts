import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {HTTP} from '@ionic-native/http/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        OAuthModule.forRoot()],
    providers: [{
        provide: RouteReuseStrategy, useClass: IonicRouteStrategy,

    }, Deeplinks, InAppBrowser, HTTP],
    bootstrap: [AppComponent]
})
export class AppModule {
}
