import {mimotoMetadata} from '../Constants';

export interface Idp {
  organizationName: string;
  issuer: string;
}

export const executeLoadIdps = async () => {
  const response = await fetch(
    `${mimotoMetadata.idp_list_endpoint}?relayingPartyId=${mimotoMetadata.relayingPartyId}`,
  );
  return (await response.json()) as Idp[];
};

export const initiateMimotoFlow = async (
  mimitoRedirectUrl: string,
  issuer: string,
) => {
  console.log('(3) Mimoto (Start): ' + mimitoRedirectUrl);
  const parResponse = await fetch(
    `${mimitoRedirectUrl}&provider=${issuer}&response_format=json`,
  );
  if (parResponse.status !== 200) {
    throw 'could not initiate mimoto flow';
  }
  const parResponseJson = await parResponse.json();
  return parResponseJson.url;
};

export const executeCodeExchangeMimotoDeepLink = async (deepLink: string) => {
  console.log('(5a) Mimoto (Code exchange)');
  // internal mimoto exchange
  let response = await fetch(mimotoMetadata.exchange_endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectUrl: deepLink,
      clientId: mimotoMetadata.clientId,
    }),
  });
  if (response.status !== 200) {
    throw 'could not code exchange in mimoto';
  }
  const responseJson = await response.json();

  // FIXME: this is only required to make it work from real device against locally deployed kratos
  // --> not required with normally deployed kratos instance
  const kratosRedirectUrl = responseJson.redirectUrl.replace(
    '127.0.0.1',
    '192.168.178.50',
  );

  return kratosRedirectUrl;
};
