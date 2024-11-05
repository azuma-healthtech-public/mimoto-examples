namespace ExampleApp.Service
{
    public static class MimotoConstants
    {
        public const string Scopes = "openid urn:telematik:versicherter urn:telematik:email";
        public const string RedirectUrl = "https://mimoto-example-app.azuma-health.tech/app/ce";

        // This is the client id from azuma demo relying party
        public const string Client = "d7f80859-e218-4892-891f-ca07a3b72368";

        // This is the client id from azuma simulation relying party
        // public const string Client = "02421f96-067b-43e6-8875-a13afe5dde58";

        public const string RelayingPartyId = "a536bd28-872c-4a3e-8255-1231f7455fb7";

        public const string MimotoBaseUrl = "https://mimoto-test.pie.azuma-health.tech";
        public static string MimotoAuthority = $"{MimotoBaseUrl}/";
        public static string MimotoAuthUrl = $"{MimotoBaseUrl}/connect/auth";
        public static string MimotoTokenUrl = $"{MimotoBaseUrl}/connect/token";
        public static string MimotoExchangeUrl = $"{MimotoBaseUrl}/oidcf/exchange/mobile";
        public static string MimotoIdpListUrl = $"{MimotoBaseUrl}/api/v1/idps";
    }
}