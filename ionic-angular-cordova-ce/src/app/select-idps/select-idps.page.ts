import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {Idp, MimotoService} from '../services/mimoto.service';

@Component({
    selector: 'app-select-idps',
    templateUrl: './select-idps.page.html',
    styleUrls: ['./select-idps.page.scss'],
})
export class SelectIdpsPage implements OnInit {
    idps = [];

    constructor(
        private mimotoService: MimotoService,
        private loadingCtrl: LoadingController,
        private router: Router) {
    }

    ngOnInit() {
        this.loadIdps();
    }

    async loadIdps() {
        const loading = await this.loadingCtrl.create({
            message: 'Loading..',
            spinner: 'bubbles',
        });
        await loading.present();

        try {
            const result = await this.mimotoService.getAvailableIdps();
            this.idps.push(...result);

        } catch (err) {
            console.log(err); // FIXME: error handling

        } finally {
            await loading.dismiss();
        }
    }

    loginWithProvider(idp: Idp) {
        const navigationExtras: NavigationExtras = {
            state: {
                provider: idp.issuer
            }
        };
        this.router.navigate(['/login-idp'], navigationExtras);
    }
}
