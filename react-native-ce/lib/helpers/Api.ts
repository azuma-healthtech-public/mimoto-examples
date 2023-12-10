import PKCE from './js-pkce/PKCE';
import {InMemoryStorage} from './InMemoryStorage';
import {
  clientId,
  clientIdSimulation,
  metadata,
  redirectUrl,
  relayingPartyId,
  scopes,
} from '../Constants';
import uuid from 'react-native-uuid';
import {URL} from 'react-native-url-polyfill';

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

export interface Idp {
  organizationName: string;
  issuer: string;
}

export const executeLoadIdps = async () => {
  const response = await fetch(
    `${metadata.idp_list_endpoint}?relayingPartyId=${relayingPartyId}`,
  );
  return (await response.json()) as Idp[];
};

export const executeAuthRequest = async (pkce: PKCE, issuer: string) => {
  const result = pkce.authorizeUrl({
    provider: issuer,
    state: uuid.v4().toString(),
  });

  const response = await fetch(result, {redirect: 'manual'}); // avoid automatic redirects

  // DEMO ONLY: only added to support simulation
  if (clientId === clientIdSimulation) {
    return response.url;
  }

  return response.status === 200 ? response.url : null;
};

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
      clientId: clientId,
    }),
  });
  if (response.status !== 200) {
    return null;
  }

  const responseJson = await response.json();
  return responseJson.redirectUrl;
};
const executeCodeExchangeMimotoCodeState = async (deepLink: string) => {
  const url = new URL(deepLink);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  // internal mimoto exchange
  let response = await fetch(metadata.exchange_endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      state: state,
      clientId: clientId,
    }),
  });
  if (response.status !== 200) {
    return null;
  }
  const responseJson = await response.json();
  return responseJson.redirectUrl;
};

export const executeCodeExchange = async (pkce: PKCE, deepLink: string) => {
  // Internal mimoto code exchange
  // Using code + state
  //const externalCodeResponse = await executeCodeExchangeMimotoCodeState(
  //  deepLink,
  //);
  // Or full deep link
  const externalCodeResponse = await executeCodeExchangeMimotoDeepLink(
    deepLink,
  );
  if (!externalCodeResponse) {
    return null;
  }

  console.log('Internal mimoto exchange successful');

  return (await pkce.exchangeForAccessToken(
    externalCodeResponse,
  )) as TokenResponse;
};
