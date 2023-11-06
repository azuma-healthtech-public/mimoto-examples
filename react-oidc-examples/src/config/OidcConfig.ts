export interface ExampleOidcConfig {
  name: string;
  path: string;
  description: string;

  // oidc
  authority: string;
  client_id: string;
  client_secret?: string;
  scope: string;
  redirect_uri: string;
}

const autority: string = "https://mimoto-test.pie.azuma-health.tech";
const scope: string =
  "urn:telematik:alter urn:telematik:display_name urn:telematik:email urn:telematik:geschlecht urn:telematik:geburtsdatum urn:telematik:given_name urn:telematik:versicherter openid";

export const exampleConfigs: ExampleOidcConfig[] = [
  {
    name: "OIDC no PKCE (NOT RECOMMENDED)",
    path: "oidc-no-pkce",
    description: "OIDC flow without using PKCE (NOT RECOMMENDED)",
    redirect_uri: `http://localhost:1234/oidc/signin/oidc-no-pkce`,
    authority: autority,
    client_id: "5b290635-fe7e-425e-9611-1bd15e34f22e",
    client_secret: "6zqWcl6JKaKasd123yYmFouKKUOUPFfkNppU",
    scope: scope,
  },
  {
    name: "OIDC PKCE",
    path: "oidc-pkce",
    description: "OIDC flow using PKCE",
    redirect_uri: `http://localhost:1234/oidc/signin/oidc-pkce`,
    authority: autority,
    client_id: "09e9fb25-ce31-46df-887d-4b257a3d6f54",
    scope: scope,
  },
  {
    name: "OIDC PKCE min scopes",
    path: "oidc-min-scopes",
    description: "OIDC flow using PKCE",
    redirect_uri: `http://localhost:1234/oidc/signin/oidc-min-scopes`,
    authority: autority,
    client_id: "776b3865-4511-4d98-b315-7ce5b1cc6387",
    scope: "openid",
  },
    /*
  {
    name: "OIDC via Keycloak",
    path: "oidc-keycloak",
    description: "OIDC flow via Keycloak",
    redirect_uri: `http://localhost:1234/oidc/signin/oidc-keycloak`,
    authority: "http://localhost:8080/realms/eid-test",
    authority: "your keycloak realm",
    client_id: "4b613c97-6de8-4b26-b1d7-b81a990f3b2a",
    scope: scope,
  },*/
];
