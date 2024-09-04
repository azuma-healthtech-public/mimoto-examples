package com.mimoto.example.android.appauthce;

public final class Constants {
    // This is the client id from azuma demo relying party
    public static final String ClientId = "b664b9ab-1484-4228-b546-7b173a860f44";

    // This is the client id from azuma simulation relying party
    //public static final String ClientId = "432a3ba0-c4ed-4a6a-972c-5f5dbaccc920";

    public static final String ExchangeUrl = "https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile";
    public static final String AuthorizationUrl = "https://mimoto-test.pie.azuma-health.tech/connect/auth";
    public static final String TokenUrl = "https://mimoto-test.pie.azuma-health.tech/connect/token";
    public static final String RedirectUrl = "https://mimoto-example-app.azuma-health.tech/app/ce";
    public static final String Scopes = "openid urn:telematik:versicherter urn:telematik:email";
}
