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
