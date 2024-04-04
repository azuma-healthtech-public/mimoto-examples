class MimotoConstants {
  static const clientId = 'a0d07d18-9529-4acb-ba4a-4eeea0670c37';
  static const scopes = ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'];
  static const redirectUrl = 'https://mimoto-example-app.azuma-health.tech/app/ce';

  static const authorization_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/auth';
  static const token_endpoint = 'https://mimoto-test.pie.azuma-health.tech/connect/token';
  static const exchange_endpoint = 'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile';
  static const idp_list_endpoint = 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps';

  static const relayingPartyId = 'a536bd28-872c-4a3e-8255-1231f7455fb7';

  // this is local fusion auth endpoint
  static const fusion_auth_exchange_endpoint = 'http://192.168.178.50:9011/api/identity-provider/login';

  static const fusion_auth_application_id = '13616ef3-4310-4956-b359-9118062276f1';

  static const fusion_auth_identity_provider_id = '4ad02f68-2a7f-4f7e-b2d9-124106f78e53';
}
