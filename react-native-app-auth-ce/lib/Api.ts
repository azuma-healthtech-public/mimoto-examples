import {AuthConfiguration, AuthorizeResult} from 'react-native-app-auth';

export interface TokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
}

export const executeCodeExchange = async (
  config: AuthConfiguration,
  newAuthState: AuthorizeResult,
) => {
  // code exchange
  let response = await fetch(
    'https://mimoto-test.pie.azuma-health.tech/connect/token',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.clientId,
        redirect_uri: config.redirectUrl,
        code: newAuthState.authorizationCode,
        code_verifier: newAuthState.codeVerifier!,
      }).toString(),
    },
  );
  let responseJson = await response.json();
  if (responseJson.error) {
    throw 'could not exchange';
  }
  newAuthState.accessToken = responseJson.access_token;
  newAuthState.idToken = responseJson.id_token;

  return newAuthState;
};
