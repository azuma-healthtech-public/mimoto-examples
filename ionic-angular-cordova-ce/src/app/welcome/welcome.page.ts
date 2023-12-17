import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
    email?: string;

    constructor(private oauthService: OAuthService, private navController: NavController) {
    }

    ngOnInit() {
        const claims = this.oauthService.getIdentityClaims();
        this.email = claims['urn:telematik:claims:email'];
    }

    async reset() {
        await this.navController.navigateRoot(['/']);
    }
}
