export const clientId = '87200292-9281-4cc6-9df8-771fb22f6c4f';
export const clientIdMimoto = 'a4e9a381-cd7a-4f56-92d3-6cebf7676cc7';
export const scopes = 'openid';
export const redirectUrl =
  'https://mimoto-example-app.azuma-health.tech/rn-azure-ad-b2c-ce/app/ce';

export const metadata = {
  mimoto_endpoint: 'https://mimoto-test.pie.azuma-health.tech',
  authorization_endpoint:
    'https://azumaadb2c.b2clogin.com/azumaadb2c.onmicrosoft.com/B2C_1_Mimoto_Signup_SignIn/oauth2/v2.0/authorize',
  token_endpoint:
    'https://azumaadb2c.b2clogin.com/azumaadb2c.onmicrosoft.com/B2C_1_Mimoto_Signup_SignIn/oauth2/v2.0/token',
  exchange_endpoint:
    'https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile',
  idp_list_endpoint: 'https://mimoto-test.pie.azuma-health.tech/api/v1/idps',
};

export enum DemoType {
  LoginWebExchange,
  LoginWebOnly,
}

export const currentDemoSettings: {demoType: DemoType} = {
  demoType: DemoType.LoginWebOnly,
};
