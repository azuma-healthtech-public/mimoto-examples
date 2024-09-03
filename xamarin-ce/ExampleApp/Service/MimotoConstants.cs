namespace ExampleApp.Service
{
    public static class MimotoConstants
    {
        public const string Scopes = "openid urn:telematik:versicherter urn:telematik:email";
        public const string RedirectUrl = "https://mimoto-example-app.azuma-health.tech/app/ce";

        // This is the client id from azuma demo relying party
        // public const string Client = "7252dc87-cf53-4657-8dd5-c4cf35b6fabe";

        // This is the client id from azuma simulation relying party
        public const string Client = "e617971e-1294-4861-be5f-3f926c2913b4";

        public const string RelayingPartyId = "a536bd28-872c-4a3e-8255-1231f7455fb7";

        public const string MimotoBaseUrl = "https://mimoto-test.pie.azuma-health.tech";
        public static string MimotoAuthority = $"{MimotoBaseUrl}/";
        public static string MimotoAuthUrl = $"{MimotoBaseUrl}/connect/auth";
        public static string MimotoTokenUrl = $"{MimotoBaseUrl}/connect/token";
        public static string MimotoExchangeUrl = $"{MimotoBaseUrl}/oidcf/exchange/mobile";
        public static string MimotoIdpListUrl = $"{MimotoBaseUrl}/api/v1/idps";
    }
}