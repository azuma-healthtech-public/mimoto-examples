import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {MimotoService} from '../services/mimoto.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
    selector: 'app-code-exchange',
    templateUrl: './code-exchange.page.html',
    styleUrls: ['./code-exchange.page.scss'],
})
export class CodeExchangePage implements OnInit {
    deepLink: string;

    constructor(private route: ActivatedRoute, private router: Router,
                private loadingCtrl: LoadingController, private mimotoService: MimotoService,
                private oauthService: OAuthService,
                private navController: NavController) {
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.deepLink = this.router.getCurrentNavigation().extras.state.deepLink;
            }
        });
    }

    ngOnInit() {
        this.codeExchange();
    }

    async codeExchange() {
        console.log('Starting mimoto code exchange');
        const loading = await this.loadingCtrl.create({
            message: 'Loading..',
            spinner: 'bubbles',
        });
        await loading.present();

        try {
            const mimotoResult = await this.mimotoService.exchangeForMimotoCode(this.deepLink);
            console.log('DONE mimoto code exchange');

            const params = (new URL(mimotoResult.redirectUrl)).searchParams;
            await this.oauthService.tryLoginCodeFlow({customHashFragment: `#${params.toString()}`});
            console.log('DONE internal code exchange');

            // FIXME: here you can exchange ID/AT for your own token
            //const id = this.oauthService.getIdToken();
            //const at = this.oauthService.getAccessToken();

            await this.navController.navigateRoot(['/welcome']);

        } catch (err) {
            console.error(err, 'Could not exchange'); // FIXME: error handling
        } finally {
            await loading.dismiss();
        }
    }
}
