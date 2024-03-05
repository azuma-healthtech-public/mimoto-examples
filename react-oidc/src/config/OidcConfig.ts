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

const autority: string = "https://mimoto-test.pie.azuma-health.tech";
const scope: string =
    "urn:telematik:alter urn:telematik:display_name urn:telematik:email urn:telematik:geschlecht urn:telematik:geburtsdatum urn:telematik:given_name urn:telematik:versicherter openid";
const baseHostUrl = process.env.REACT_APP_HOST_URL;

export const exampleConfigs: ExampleOidcConfig[] = [
    {
        name: "Live: OIDC PKCE - Layout 1",
        path: "oidc-live",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live`,
        authority: autority,
        client_id: "43e0b7b9-57b8-4e37-a2c2-636bd42b8267",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "Live: OIDC PKCE - Layout 2",
        path: "oidc-live-layout-2",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-layout-2`,
        authority: autority,
        client_id: "7fbc18c4-d561-4eae-9b12-0488becc177e",
        scope: scope,
        supportLoginParams: true
    }, {
        name: "Live: OIDC PKCE - Web-App",
        path: "oidc-live-layout-web-app",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-live-web-app`,
        authority: autority,
        client_id: "7c29aee2-36e4-47b9-8eae-37bddbe0195e",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "Simulation: OIDC no PKCE (NOT RECOMMENDED)",
        path: "oidc-no-pkce",
        description: "OIDC flow without using PKCE (NOT RECOMMENDED)",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-no-pkce`,
        authority: autority,
        client_id: "5b290635-fe7e-425e-9611-1bd15e34f22e",
        client_secret: "6zqWcl6JKaKasd123yYmFouKKUOUPFfkNppU",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "Simulation: OIDC PKCE",
        path: "oidc-pkce",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-pkce`,
        authority: autority,
        client_id: "09e9fb25-ce31-46df-887d-4b257a3d6f54",
        scope: scope,
        supportLoginParams: true
    },
    {
        name: "Simulation: OIDC PKCE min scopes",
        path: "oidc-min-scopes",
        description: "OIDC flow using PKCE",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-min-scopes`,
        authority: autority,
        client_id: "776b3865-4511-4d98-b315-7ce5b1cc6387",
        scope: "openid",
        supportLoginParams: true
    },
    {
        name: "Simulation: OIDC via Keycloak",
        path: "oidc-keycloak",
        description: "OIDC flow via Keycloak",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-keycloak`,
        authority: "https://ne-mimoto-examples-keycloak.azurewebsites.net/realms/mimoto-eid",
        client_id: "4b613c97-6de8-4b26-b1d7-b81a990f3b2a",
        scope: scope,
        executeLogout: true,
        supportLoginParams: false
    },
    {
        name: "Local: OIDC via dotnet-server-mvc-oidc",
        path: "oidc-dotnet-server-mvc-oidc",
        description: "OIDC flow via dotnet-server-mvc-oidc example (needs to be started locally)",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-dotnet-server-mvc-oidc`,
        authority: "https://localhost:44313",
        client_id: "6231564A5-E7FE-42CB-B10D-61EF6A8F3654",
        scope: "openid",
        executeLogout: true,
        supportLoginParams: false
    },
    {
        name: "Local: OIDC via laravel-passport-oidc",
        path: "oidc-laravel-passport-oidc",
        description: "OIDC flow via laravel-passport-oidc example (needs to be started locally)",
        redirect_uri: `${baseHostUrl}/oidc/signin/oidc-laravel-passport-oidc`,
        authority: "http://localhost:8000",
        authorizeUrl: "http://localhost:8000/oauth/authorize",
        tokenUrl: "http://localhost:8000/oauth/token",
        client_id: "7",
        scope: "openid",
        executeLogout: true,
        supportLoginParams: false
    },
];
