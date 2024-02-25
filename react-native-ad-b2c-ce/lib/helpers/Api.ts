import PKCE from './js-pkce/PKCE';
import {InMemoryStorage} from './InMemoryStorage';
import {
  clientId,
  clientIdMimoto,
  metadata,
  redirectUrl,
  scopes,
} from '../Constants';
import uuid from 'react-native-uuid';

function createPkceClient(): PKCE {
  return new PKCE({
    client_id: clientId,
    redirect_uri: redirectUrl,
    authorization_endpoint: metadata.authorization_endpoint,
    token_endpoint: metadata.token_endpoint,
    requested_scopes: scopes,
    storage: new InMemoryStorage(),
  });
}

export const pkceClient = createPkceClient();

export const executeAuthRequestWeb = (pkce: PKCE) => {
  const url = pkce.authorizeUrl({
    state: uuid.v4().toString(),
  });

  return url;
};

export interface AuthResponse {
  url: string;
}

export interface TokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
}

const executeCodeExchangeMimotoDeepLink = async (deepLink: string) => {
  // internal mimoto exchange
  let response = await fetch(metadata.exchange_endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectUrl: deepLink,
      clientId: clientIdMimoto,
    }),
  });
  if (response.status !== 200) {
    return null;
  }

  const responseJson = await response.json();
  return responseJson.redirectUrl;
};

export const executeCodeExchange = async (pkce: PKCE, deepLink: string) => {
  // mimoto code exchange
  const externalCodeResponse = await executeCodeExchangeMimotoDeepLink(
    deepLink,
  );
  if (!externalCodeResponse) {
    return null;
  }
  console.log('Internal mimoto exchange successful');
  return externalCodeResponse;
};

export const executeCodeExchangeInternal = async (
  pkce: PKCE,
  externalCodeResponse: string,
) => {
  console.log('AD B2C exchange successful');

  // Internal exchange
  return (await pkce.exchangeForAccessToken(
    externalCodeResponse,
  )) as TokenResponse;
};
