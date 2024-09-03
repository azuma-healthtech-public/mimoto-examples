export const scopes = 'openid urn:telematik:versicherter urn:telematik:email';
export const redirectUrl =
  'https://mimoto-example-app.azuma-health.tech/app/ce';

export const metadataTU = {
  title: '(TU): Using gematik Authenticator',
  exchangeViaRedirectUrl: true,

  clientId: 'f439cd4c-5b76-467d-8640-8f7dcb77367a', // gematik Authenticator TU
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};
export const metadataTUMock = {
  title: '(TU): Using mock Authenticator',
  exchangeViaRedirectUrl: false,

  clientId: 'b1d1ae60-f2f3-40ab-9391-d9ba5f5d5988', // Mock Authenticator TU
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};
export const metadataTUSimulation = {
  title: '(TU-Simulation): Using mock Authenticator',
  exchangeViaRedirectUrl: true,

  clientId: 'a65c4641-76a5-4ecc-bce5-70bf2d1e6281', // Mock Authenticator TU
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};

export const metadataRU = {
  title: '(RU): Using gematik Authenticator',
  exchangeViaRedirectUrl: true,

  clientId: '61754f05-7124-4896-ad68-8d14d477a08e',
  authorization_endpoint:
    'https://mimoto-ref.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-ref.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-ref.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-ref.pie.azuma-health.tech/api/v1/idps',
  relayingPartyId: 'c36eb4fa-0f55-46f2-8e69-e52ff6013022',
};

export interface Metadata {
  title: string;
  exchangeViaRedirectUrl: boolean;

  clientId: string;
  authorization_endpoint: string;
  token_endpoint: string;
  exchange_endpoint: string;
  idp_list_endpoint: string;
  relayingPartyId: string;
}

export const metadata: Metadata[] = [
  metadataRU,
  metadataTU,
  metadataTUMock,
  metadataTUSimulation,
];
