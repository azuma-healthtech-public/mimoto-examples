import PKCE from '../helpers/js-pkce/PKCE.ts';
import {Metadata, metadataTU, redirectUrl, scopes} from './Constants.ts';
import {InMemoryStorage} from '../helpers/InMemoryStorage.ts';

export interface CurrentData {
  pkceClient: PKCE;
  metadata: Metadata;
}

const currentData = {
  current: {
    pkceClient: createPkceClient(metadataTU),
    metadata: metadataTU,
  },
};

function createPkceClient(metadata: Metadata): PKCE {
  return new PKCE({
    client_id: metadata.clientId,
    redirect_uri: metadata.redirectUri ?? redirectUrl,
    authorization_endpoint: metadata.authorization_endpoint,
    token_endpoint: metadata.token_endpoint,
    requested_scopes: scopes,
    storage: new InMemoryStorage(),
  });
}

export function selectDemo(metadata: Metadata) {
  currentData.current = {
    pkceClient: createPkceClient(metadata),
    metadata: metadata,
  };
}

export function getCurrentData(): CurrentData {
  return currentData!.current!;
}
