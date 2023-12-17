import {Component, OnInit} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig, clientId, clientIdSimulation, metadata} from '../services/constants';
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
                        browser.close();


                        // @ts-ignore
                        if (clientId === clientIdSimulation) { // SIMULATION only
                            this.handleSimulationAuthCode(evt.url);
                        } else {
                            // open in platform
                            console.log('open in platform');

                            const platform = this.inAppBrowser.create(evt.url, '_system', {location: 'yes'});
                            platform.show();
                        }
                    }
                });

                browser.show();
            }
        };
        this.oauthService.configure(config);
        this.oauthService.initCodeFlow();
    }

    async handleSimulationAuthCode(url: string) {
        const params = (new URL(url)).searchParams;
        await this.oauthService.tryLoginCodeFlow({customHashFragment: `#${params.toString()}`});
        console.log('DONE internal code exchange');

        // FIXME: here you can exchange ID/AT for your own token for evaluation
        //const id = this.oauthService.getIdToken();
        //const at = this.oauthService.getAccessToken();

        await this.navController.navigateRoot(['/welcome']);
    }
}
