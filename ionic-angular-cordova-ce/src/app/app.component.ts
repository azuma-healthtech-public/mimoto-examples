import {Component, NgZone} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {NavigationExtras, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private deeplinks: Deeplinks,
        private router: Router,
        private zone: NgZone,
        private oauthService: OAuthService) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.setupDeeplinks();
        });
    }

    setupDeeplinks() {
        this.deeplinks.route({'/code/ce': 'code/ce'}).subscribe(
            match => {
                console.log('Code exchange deep link received');

                this.zone.run(() => {
                    const navigationExtras: NavigationExtras = {
                        state: {
                            deepLink: match.$link?.url
                        }
                    };
                    this.router.navigate(['/code-exchange'], navigationExtras);
                });
            },
            nomatch => {
                // nomatch.$link - the full link data
                console.error('Got a deeplink that didn\'t match', nomatch);
            }
        );
    }
}
