export const scopes = 'openid urn:telematik:versicherter urn:telematik:email';
export const redirectUrl =
  'https://mimoto-example-app.azuma-health.tech/app/ce';

export const metadataTU = {
  clientId: 'f439cd4c-5b76-467d-8640-8f7dcb77367a', // gematik Authenticator TU
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};

export const metadataTUMock = {
  clientId: 'b1d1ae60-f2f3-40ab-9391-d9ba5f5d5988', // Mock Authenticator TU
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};

export const metadataRU = {
  clientId: '61754f05-7124-4896-ad68-8d14d477a08e',
  authorization_endpoint:
    'https://mimoto-ref.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-ref.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-ref.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-ref.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'c36eb4fa-0f55-46f2-8e69-e52ff6013022',
};

export interface Metadata {
  clientId: string;
  authorization_endpoint: string;
  token_endpoint: string;
  exchange_endpoint: string;
  idp_list_endpoint: string;
  relayingPartyId: string;
}
