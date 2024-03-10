using System.Text.Json.Serialization;

namespace Backend.Api.Controllers.Dtos
{
    public class HookDataDto
    {
        [JsonPropertyName("traits")]
        public TraitsDataDto Traits { get; set; }
    }
}
