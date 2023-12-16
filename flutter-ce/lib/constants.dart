class MimotoConstants {
  static const clientIdLive = 'b664b9ab-1484-4228-b546-7b173a860f44';
  static const clientIdSimulation = 'da7c5825-694a-4918-85f4-e5ad1a9247db';
  static const clientId = clientIdLive;
  static const scopes = ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'];
  static const redirectUrl = 'https://mimoto-example-app.azuma-health.tech/app/ce';

  static const authorization_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/auth';
  static const token_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/token';
  static const exchange_endpoint = 'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile';
  static const idp_list_endpoint = 'https://mimoto-test.pie.azuma-health.tech//api/v1/idps';

  static const relayingPartyId = 'a536bd28-872c-4a3e-8255-1231f7455fb7';
}
