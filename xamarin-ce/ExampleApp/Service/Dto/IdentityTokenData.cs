using System.Text.Json.Serialization;

namespace ExampleApp.Service.Dto
{
    public class IdentityTokenData
    {
        [JsonPropertyName("urn:telematik:claims:email")]
        public string Email { get; set; }
        [JsonPropertyName("urn:telematik:claims:id")]
        public string Kvnr { get; set; }

        [JsonPropertyName("ext-mimoto-original-iss")]
        public string MimotoSubIss { get; set; }
        [JsonPropertyName("ext-mimoto-original-sub-unique")]
        public string MimotoSubUnique { get; set; }
    }
}
