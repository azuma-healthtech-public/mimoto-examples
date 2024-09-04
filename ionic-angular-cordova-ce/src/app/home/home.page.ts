import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig, clientId, metadata} from '../services/constants';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(private oauthService: OAuthService,
                private navController: NavController,
                private inAppBrowser: InAppBrowser) {
    }

    ngOnInit() {
    }

    login() {
        const config: AuthConfig = {
            ...authCodeFlowConfig, openUri: (uri) => {
                // per default, oauthService opens in external browser --> try to avoid that and open in webview
                const browser = this.inAppBrowser.create(uri, '_blank', {location: 'no', beforeload: 'yes'});
                browser.on('beforeload').subscribe((evt) => {
                    if (evt.url.startsWith(metadata.issuer)) {
                        browser._loadAfterBeforeload(evt.url);
                        console.log('mimoto link - open inapp');
                    } else {
                        // open in platform
                        console.log('open in platform');

                        const platform = this.inAppBrowser.create(evt.url, '_system', {location: 'yes'});
                        platform.show();

                        // for some reason, calling browser.close directly does not actually close browser on IOS
                        setTimeout(() => {
                            browser.close();

                        }, 200);
                    }
                });

                browser.show();
            }
        };
        this.oauthService.configure(config);
        this.oauthService.initCodeFlow();
    }
}
