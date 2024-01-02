export const clientIdLive = '8672e4a0-62a2-42c4-98a3-fff224c6eda5';
export const clientIdSimulation = '44e72d2b-7265-4da9-804a-a75b3ea64940';
export const clientId = clientIdLive;
export const scopes = 'openid urn:telematik:versicherter urn:telematik:email';
export const redirectUrl =
  'https://mimoto-example-app.azuma-health.tech/app/ce';
export const metadata = {
  mimoto_endpoint: 'https://mimoto-test.pie.azuma-health.tech',
  authorization_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/auth',
  idp_selection_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/connect/landing',
  token_endpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps',
};
