import {AuthConfig} from 'angular-oauth2-oidc';

export const clientIdLive = 'b664b9ab-1484-4228-b546-7b173a860f44';
export const clientIdSimulation = 'da7c5825-694a-4918-85f4-e5ad1a9247db';
export const clientId = clientIdSimulation;
export const scopes = 'openid urn:telematik:versicherter urn:telematik:email';
export const redirectUrl =
    'https://mimoto-example-app.azuma-health.tech/app/ce';
export const metadata = {
    issuer: 'https://mimoto-test.pie.azuma-health.tech/',
    authorization_endpoint:
        'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
    exchange_endpoint:
        'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
    idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
};
export const relayingPartyId = 'a536bd28-872c-4a3e-8255-1231f7455fb7';

export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: metadata.issuer,
    redirectUri: redirectUrl,
    clientId,
    responseType: 'code',
    scope: scopes,

    tokenEndpoint: metadata.token_endpoint,
    userinfoEndpoint: undefined,
    loginUrl: metadata.authorization_endpoint,
};
