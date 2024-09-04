class MimotoConstants {
  // This is the client id from azuma demo relying party
  static const clientId = 'aa1d0d62-fdc4-4023-9098-441bb0c48c1b';

  // This is the client id from azuma simulation relying party
  //static const clientId = 'de98a87b-4b92-4724-9d47-57213ddf7dff';

  static const scopes = ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'];
  static const redirectUrl = 'https://mimoto-example-app.azuma-health.tech/app/ce';

  static const authorization_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/auth';
  static const token_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/token';
  static const exchange_endpoint = 'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile';
  static const idp_list_endpoint = 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps';

  static const relayingPartyId = 'a536bd28-872c-4a3e-8255-1231f7455fb7';
}
