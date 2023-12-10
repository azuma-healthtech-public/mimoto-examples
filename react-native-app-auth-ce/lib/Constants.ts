import {AuthConfiguration} from 'react-native-app-auth';

export const configMimoto: AuthConfiguration = {
  issuer: 'https://mimoto-test.pie.azuma-health.tech',
  clientId: 'b664b9ab-1484-4228-b546-7b173a860f44',
  redirectUrl: 'https://mimoto-example-app.azuma-health.tech/app/ce',
  scopes: ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    tokenEndpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  },
};

export const configMimotoGematik: AuthConfiguration = {
  issuer: 'https://mimoto-test.pie.azuma-health.tech',
  clientId: 'b664b9ab-1484-4228-b546-7b173a860f44',
  redirectUrl: 'https://mimoto-example-app.azuma-health.tech/app/ce',
  additionalParameters: {provider: 'https://gsi.dev.gematik.solutions'},
  scopes: ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    tokenEndpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  },
  iosCustomBrowser: 'safari',
};


export const configMimotoGematikSimulation: AuthConfiguration = {
  issuer: 'https://mimoto-test.pie.azuma-health.tech',
  //clientId: 'b664b9ab-1484-4228-b546-7b173a860f44',
  clientId: 'da7c5825-694a-4918-85f4-e5ad1a9247db',
  redirectUrl: 'https://mimoto-example-app.azuma-health.tech/app/ce',
  additionalParameters: {provider: 'https://gsi.dev.gematik.solutions'},
  scopes: ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    tokenEndpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  },
  iosCustomBrowser: 'safari',
};
