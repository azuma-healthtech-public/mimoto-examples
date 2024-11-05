using ExampleApp.Service.Dto;
using ExampleApp.Service.Helpers;
using IdentityModel.OidcClient;
using JWT.Builder;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ExampleApp.Service
{
    public class MimotoService
    {
        private readonly OidcClient _oidcClient = new OidcClient(new OidcClientOptions()
        {
            Authority = MimotoConstants.MimotoAuthority,
            LoadProfile = false,
            RedirectUri = MimotoConstants.RedirectUrl,

            ClientId = MimotoConstants.Client,
            Scope = MimotoConstants.Scopes
        });
        private AuthorizeState _oidcAuthorizeState;

        // Keeping a singleton instance in the simpliest way possible. Please integrate this in a proper way in your app
        public static MimotoService Instance { get; } = new MimotoService();

        public LoginState Stage { get; set; }

        public async Task<string> StartAuth(string issuer)
        {
            _oidcAuthorizeState = await _oidcClient.PrepareLoginAsync();

            var url = _oidcAuthorizeState.StartUrl;
            url += $"&provider={issuer}&response_format=json";

            var client = new HttpClient(); // FIXME: proper http client handling
            var result = await client.GetAsync(url);
            if (result.StatusCode != System.Net.HttpStatusCode.OK)
                throw new InvalidOperationException("..."); // FIXME: do proper error handling here

            var data = await result.Content.ReadAsStringAsync();
            var response = JsonHelper.Deserialize<AuthResponseDto>(data);
            return response.Url;
        }

        public async Task<IdentityTokenData> CodeExchangeAndFinishAuth(string deepLinkUrl)
        {
            // (1) Mimoto Code Exchange
            var exchangeDto = new ExchangeDto() { ClientId = MimotoConstants.Client, RedirectUrl = deepLinkUrl };
            var data = new StringContent(JsonHelper.Serialize(exchangeDto), Encoding.UTF8, "application/json");

            var client = new HttpClient(); // FIXME: proper http client handling
            var result = await client.PostAsync(MimotoConstants.MimotoExchangeUrl, data);
            if (result.StatusCode != System.Net.HttpStatusCode.OK)
                throw new InvalidOperationException("..."); // FIXME: do proper error handling here

            var json = await result.Content.ReadAsStringAsync();
            var exchangeResponse = JsonHelper.Deserialize<ExchangeResponseDto>(json);

            // (2) Token
            var loginResult = await _oidcClient.ProcessResponseAsync(exchangeResponse.RedirectUrl, _oidcAuthorizeState);
            var idToken = loginResult.IdentityToken;
            var idTokenData = JwtBuilder.Create().DoNotVerifySignature().Decode(idToken);
            return JsonHelper.Deserialize<IdentityTokenData>(idTokenData);
        }

        public async Task<List<IdpEntityDto>> GetIdpList()
        {
            var client = new HttpClient(); // FIXME: proper http client handling
            var result = await client.GetAsync($"{MimotoConstants.MimotoIdpListUrl}/?relayingPartyId={MimotoConstants.RelayingPartyId}");
            if (result.StatusCode != System.Net.HttpStatusCode.OK)
                throw new InvalidOperationException("..."); // FIXME: do proper error handling here

            var data = await result.Content.ReadAsStringAsync();
            return JsonHelper.Deserialize<List<IdpEntityDto>>(data);
        }
    }
}
