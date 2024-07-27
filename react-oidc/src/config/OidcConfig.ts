export interface ExampleOidcConfig {
    name: string;
    path: string;
    description: string;

    // oidc
    authority: string;
    authorizeUrl?: string,
    tokenUrl?: string,
    client_id: string;
    client_secret?: string;
    scope: string;
    redirect_uri: string;
    executeLogout?: boolean;

    supportLoginParams: boolean
}

const autorityTU: string = "https://mimoto-test.pie.azuma-health.tech";
const autorityRU: string = "https://mimoto-ref.pie.azuma-health.tech";
const scope: string =
    "urn:telematik:alter urn:telematik:display_name urn:telematik:email urn:telematik:geschlecht urn:telematik:geburtsdatum urn:telematik:given_name urn:telematik:versicherter openid";
const baseHostUrl = process.env.REACT_APP_HOST_URL;

export const exampleConfigs: ExampleOidcConfig[] = [
    {
        name: "(RU) Live: OIDC PKCE - Layout 1",
        path: "oidc-live-ru",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-ru`,
        authority: autorityRU,
        client_id: "df80c822-415d-47e3-81c5-0ebb45ed0734",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "(RU) Live: OIDC PKCE - Layout 2",
        path: "oidc-live-layout-2-ru",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-layout-2-ru`,
        authority: autorityRU,
        client_id: "c28f085a-f1bf-4102-9e60-fe3703361dd4",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "(RU) Live: OIDC PKCE - Web-App (mock Authenticator)",
        path: "oidc-live-web-app-ru",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-web-app-ru`,
        authority: autorityRU,
        client_id: "5181bcde-6418-449e-ae7a-24cb16fd5433",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "(TU) Live: OIDC PKCE - Layout 1",
        path: "oidc-live",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live`,
        authority: autorityTU,
        client_id: "43e0b7b9-57b8-4e37-a2c2-636bd42b8267",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "(TU) Live: OIDC PKCE - Layout 2",
        path: "oidc-live-layout-2",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-layout-2`,
        authority: autorityTU,
        client_id: "7fbc18c4-d561-4eae-9b12-0488becc177e",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "(TU) Live: OIDC PKCE - Web-App (mock Authenticator)",
        path: "oidc-live-web-app",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-web-app`,
        authority: autorityTU,
        client_id: "7c29aee2-36e4-47b9-8eae-37bddbe0195e",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "(TU) Simulation: OIDC PKCE",
        path: "oidc-pkce",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-pkce`,
        authority: autorityTU,
        client_id: "09e9fb25-ce31-46df-887d-4b257a3d6f54",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "(TU) Simulation: OIDC PKCE min scopes",
        path: "oidc-min-scopes",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-min-scopes`,
        authority: autorityTU,
        client_id: "776b3865-4511-4d98-b315-7ce5b1cc6387",
        scope: "openid",
        supportLoginParams: true
    },
    {
        name: "(TU) Simulation: OIDC via Keycloak",
        path: "oidc-keycloak",
        description: "OIDC flow via Keycloak",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-keycloak`,
        authority: "https://ne-mimoto-examples-keycloak.azurewebsites.net/realms/mimoto-eid",
        client_id: "4b613c97-6de8-4b26-b1d7-b81a990f3b2a",
        scope: scope,
        executeLogout: true,
        supportLoginParams: false
    },
];
