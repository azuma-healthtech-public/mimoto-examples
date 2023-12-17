import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MimotoService} from '../services/mimoto.service';
import {LoadingController, NavController} from '@ionic/angular';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig, clientId, clientIdSimulation} from '../services/constants';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-login-idp',
    templateUrl: './login-idp.page.html',
    styleUrls: ['./login-idp.page.scss'],
})
export class LoginIdpPage implements OnInit {
    provider: string;
    error: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private inAppBrowser: InAppBrowser,
                private mimotoService: MimotoService,
                private loadingCtrl: LoadingController,
                private navController: NavController,
                private oauthService: OAuthService) {

        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.provider = this.router.getCurrentNavigation().extras.state.provider;
            }
        });
    }

    ngOnInit() {
        this.startAuth();
    }

    async startAuth() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading..',
            spinner: 'bubbles',
        });
        await loading.present();

        try {
            console.log(`Starting with login with issuer ${this.provider}`);
            const config: AuthConfig = {
                ...authCodeFlowConfig, openUri: (uri) => {
                    // as we pre-selected provider already, we can start auth process manually
                    // this will return a PAR url, that we can open --> should lead directly to authenticator app

                    // @ts-ignore
                    if (clientId === clientIdSimulation) { // SIMULATION only
                        this.startAuthMimotoSimulation(loading, uri);
                    } else {
                        this.startAuthMimotoPar(loading, uri); // LIVE only
                    }
                }
            };
            this.oauthService.configure(config);
            this.oauthService.initCodeFlow(undefined, {provider: this.provider});
        } catch (err) {
            console.log('Failed logging in provider');
            console.log(err); // FIXME: error handling
            this.error = 'Could not login ...';
            await loading.dismiss();
        }
    }

    async startAuthMimotoPar(loading: HTMLIonLoadingElement, url: string) {
        const result = await this.mimotoService.executeAuthRequestForPar(url);
        if (result) {
            console.log('PAR request executed, opening result');

            const platform = this.inAppBrowser.create(result, '_system', {location: 'yes'});
            platform.show();
        } else {
            console.log('Failed logging in provider');
            this.error = 'Could not login ...';
        }
        await loading.dismiss();
    }

    async startAuthMimotoSimulation(loading: HTMLIonLoadingElement, url: string) {
        const result = await this.mimotoService.executeAuthRequestForPar(url);

        const params = (new URL(result)).searchParams;
        await this.oauthService.tryLoginCodeFlow({customHashFragment: `#${params.toString()}`});

        // FIXME: here you can exchange ID/AT for your own token for evaluation
        //const id = this.oauthService.getIdToken();
        //const at = this.oauthService.getAccessToken();

        await loading.dismiss();
        await this.navController.navigateRoot(['/welcome']);
    }

    async cancel() {
        await this.navController.navigateRoot(['/']);
    }
}
