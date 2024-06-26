import React from "react";
import {Card, Divider, Spin} from "antd";
import {AuthProvider, useAuth} from "react-oidc-context";
import {ExampleOidcConfig} from "../config/OidcConfig";
import Token from "../components/Token";

export default function Oidc(props: { config: ExampleOidcConfig }) {
    let metadata = undefined;
    if (props.config.tokenUrl && props.config.authorizeUrl) {
        metadata = {
            issuer: props.config.authority,
            token_endpoint: props.config.tokenUrl,
            authorization_endpoint: props.config.authorizeUrl
        };
    }
    return (
        <AuthProvider
            key={props.config.path}
            scope={props.config.scope}
            authority={props.config.authority}
            metadata={metadata}
            client_secret={props.config.client_secret}
            client_id={props.config.client_id}
            redirect_uri={props.config.redirect_uri}
        >
            <OidcInner config={props.config}/>
        </AuthProvider>
    );
}

function OidcInner(props: { config: ExampleOidcConfig }) {
    const auth = useAuth();
    return (
        <Card>
            <h1>{props.config.name}</h1>
            <h3>{props.config.description}</h3>
            <div>authority: {props.config.authority}</div>
            <div>client id: {props.config.client_id}</div>
            <div>redirect uri: {props.config.redirect_uri}</div>

            {auth.error && <div>Something went wrong... {auth?.error?.message}</div>}

            {auth.isLoading ? (
                <Spin/>
            ) : (
                <div>
                    {!auth.isAuthenticated && (
                        <div>
                            <Divider/>
                            Not authenticated yet
                            <Divider/>
                            <button onClick={() => void auth.signinRedirect()}>Log in</button>
                            <br/>
                            <br/>
                            {props.config.supportLoginParams &&
                                <>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    language: "de_DE",
                                                },
                                            })
                                        }
                                    >
                                        Log in (de_DE)
                                    </button>
                                    {" "}
                                    <br/>
                                    <br/>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    language: "en_GB",
                                                },
                                            })
                                        }
                                    >
                                        Log in (en_GB)
                                    </button>
                                    {" "}
                                    <br/>
                                    <br/>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    provider: "https://gsi.dev.gematik.solutions",
                                                },
                                            })
                                        }
                                    >
                                        Log in with gematik
                                    </button>

                                    <br/>
                                    <br/>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    gematik_show_testing_ui: true,
                                                },
                                            })
                                        }> Log in with gematik (With testing UI)
                                    </button>

                                    <br/>
                                    <br/>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    provider: "https://gsi.dev.gematik.solutions",
                                                    gematik_enable_testing: true,
                                                    gematik_login_user: "C420797644",
                                                    gematik_scope_decline_mode: "RemoveClaims",
                                                    gematik_selected_scopes: "urn:telematik:email",
                                                },
                                            })
                                        }> Log in with gematik (Testing example 1)
                                    </button>

                                    <br/>
                                    <br/>
                                    <button
                                        onClick={() =>
                                            void auth.signinRedirect({
                                                extraQueryParams: {
                                                    provider: "https://gsi.dev.gematik.solutions",
                                                    gematik_enable_testing: true,
                                                    gematik_login_user: "C420797644",
                                                    gematik_scope_decline_mode: "AddEmptyClaims",
                                                    gematik_selected_scopes: "urn:telematik:versicherter",
                                                },
                                            })
                                        }> Log in with gematik (Testing example 2)
                                    </button>
                                </>
                            }
                        </div>
                    )}
                    {auth.isAuthenticated && (
                        <div>
                            <Token/>
                            <button onClick={(ev) => {
                                ev.preventDefault();
                                if (props.config.executeLogout === true)
                                    auth.signoutRedirect();
                                else
                                    auth.removeUser()
                            }}>Log out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}
