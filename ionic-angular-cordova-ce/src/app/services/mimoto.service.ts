import {Injectable} from '@angular/core';
import {clientId, metadata, relayingPartyId} from './constants';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
    providedIn: 'root',
})
export class MimotoService {
    constructor(private http: HttpClient, private nativeHttp: HTTP) {
    }

    exchangeForMimotoCode(deepLink: string): Promise<CodeExchangeResponse> {
        return this.http.post<CodeExchangeResponse>(metadata.exchange_endpoint, {
            clientId,
            redirectUrl: deepLink
        }).toPromise();
    }


    async executeAuthRequestForPar(authUrl: string): Promise<string> {
        // add &reponse_format=json to avoid automatic redirects, response in json format:
        // { "url": "..." }
        console.log('Start auth request');
        const response = await fetch(`${authUrl}&response_format=json`);
        const responseJson = await response.json();

        return response.status === 200 ? responseJson.url : null;
    }
    async executeAuthRequestForParSimulation(authUrl: string): Promise<string> {
        // the auth endpoint returns a 302 redirect
        // did not find a way to disable automatic redirect following in HttpClient
        // therefore using native http
        this.nativeHttp.setFollowRedirect(false);

        try {
            const response = await this.nativeHttp.get(authUrl, {}, {});
            return response.status === 302 ? response.headers?.location : null;
        } catch (err) {
            if (err?.status === 302) {
                return err.status === 302 ? err.headers?.location : null;
            }
        }
    }

    getAvailableIdps(): Promise<Idp[]> {
        return this.http.get<Idp[]>(
            `${metadata.idp_list_endpoint}?relayingPartyId=${relayingPartyId}`
        ).toPromise();
    }
}

interface AuthResponse {
    url: string;
}

interface CodeExchangeResponse {
    redirectUrl: string;
}

export interface Idp {
    organizationName: string;
    issuer: string;
}

