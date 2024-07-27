export const scopes = 'openid urn:telematik:versicherter urn:telematik:email';
export const redirectUrl =
  'https://mimoto-example-app.azuma-health.tech/app/ce';

export const metadataTU = {
  clientId: '0c08de91-2616-4cc5-b964-6bf3c8bdfaed', // gematik Authenticator TU
  mimoto_endpoint: 'https://mimoto-test.pie.azuma-health.tech',
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};

export const metadataTUMockL1 = {
  clientId: '8672e4a0-62a2-42c4-98a3-fff224c6eda5', // Mock Authenticator TU
  mimoto_endpoint: 'https://mimoto-test.pie.azuma-health.tech',
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};
export const metadataTUMockL2 = {
  clientId: '6dee1821-6507-4c3f-b053-c4fdcce9a121', // Mock Authenticator TU
  mimoto_endpoint: 'https://mimoto-test.pie.azuma-health.tech',
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
  relayingPartyId: 'a536bd28-872c-4a3e-8255-1231f7455fb7',
};

export const metadataRU = {
  clientId: '4df1b26f-db9b-4feb-ac20-655d32101bb7',
  mimoto_endpoint: 'https://mimoto-ref.pie.azuma-health.tech',
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
  mimoto_endpoint: string;
  authorization_endpoint: string;
  token_endpoint: string;
  exchange_endpoint: string;
  idp_list_endpoint: string;
  relayingPartyId: string;
}
