import {TokenResponse} from './Api';
import {decode} from 'base-64';

export interface User {
  email: string;
}

export function decodeToken(tokens: TokenResponse): User {
  const decoded = JSON.parse(decode(tokens.id_token!.split('.')[1]));
  console.log(tokens.id_token!);
  console.log(decoded);
  return {
    email: decoded.emails ? decoded.emails[0] : '',
  };
}
