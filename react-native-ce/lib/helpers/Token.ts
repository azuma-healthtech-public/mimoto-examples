import {TokenResponse} from './Api';
import {decode} from 'base-64';

export interface User {
  email: string;
}

export function decodeToken(tokens: TokenResponse): User {
  const decoded = JSON.parse(decode(tokens.id_token!.split('.')[1]));
  return {
    email: decoded['urn:telematik:claims:email'] ?? '',
  };
}
