import PKCE from './js-pkce/PKCE';
import uuid from 'react-native-uuid';
import {URL} from 'react-native-url-polyfill';
import ITokenResponse from './js-pkce/ITokenResponse.ts';
import {getCurrentData} from '../data/Data.ts';

export interface Idp {
  organizationName: string;
  issuer: string;
}

export const executeLoadIdps = async () => {
  const response = await fetch(
    `${getCurrentData().metadata.idp_list_endpoint}?relayingPartyId=${
      getCurrentData().metadata.relayingPartyId
    }`,
  );
  return (await response.json()) as Idp[];
};

export const executeAuthRequest = async (pkce: PKCE, issuer: string) => {
  const result = pkce.authorizeUrl({
    provider: issuer,
    state: uuid.v4().toString(),
  });

  // add &response_format=json to avoid automatic redirects, response in json format:
  // { "url": "..." }
  const response = await fetch(`${result}&response_format=json`);
  const responseJson = await response.json();
  return response.status === 200 ? responseJson.url : null;
};

export interface AuthResponse {
  url: string;
}

export interface TokenResponse extends ITokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
}

const executeCodeExchangeMimotoDeepLink = async (deepLink: string) => {
  // internal mimoto exchange
  let response = await fetch(getCurrentData().metadata.exchange_endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectUrl: deepLink,
      clientId: getCurrentData().metadata.clientId,
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
  let response = await fetch(getCurrentData().metadata.exchange_endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      state: state,
      clientId: getCurrentData().metadata.clientId,
    }),
  });
  if (response.status !== 200) {
    return null;
  }
  const responseJson = await response.json();
  return responseJson.redirectUrl;
};

export const executeCodeExchange = async (pkce: PKCE, deepLink: string) => {
  let externalCodeResponse;

  // Internal mimoto code exchange
  if (!getCurrentData().metadata.exchangeViaRedirectUrl) {
    // Using code + state
    externalCodeResponse = await executeCodeExchangeMimotoCodeState(deepLink);
  } else {
    // Or full deep link
    externalCodeResponse = await executeCodeExchangeMimotoDeepLink(deepLink);
  }

  if (!externalCodeResponse) {
    return null;
  }

  console.log(externalCodeResponse);
  console.log('Internal mimoto exchange successful');

  return (await pkce.exchangeForAccessToken(
    externalCodeResponse,
  )) as TokenResponse;
};
