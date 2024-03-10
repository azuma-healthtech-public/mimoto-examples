using System.Text.Json.Serialization;

namespace Backend.Api.Controllers.Dtos
{
    public class TraitsDataDto
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("health_id_kvnr")]
        public string Kvnr { get; set; }

        [JsonPropertyName("health_id_provider")]
        public string Provider { get; set; }

        [JsonPropertyName("health_id_sub")]
        public string Sub { get; set; }
    }
}
