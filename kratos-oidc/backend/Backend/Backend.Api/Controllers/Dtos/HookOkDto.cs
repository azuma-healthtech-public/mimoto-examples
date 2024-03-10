using System.Text.Json.Serialization;

namespace Backend.Api.Controllers.Dtos
{
    public class HookOkDto
    {
        [JsonPropertyName("identity")]
        public HookIdentityDto Identity { get; set; }
    }

    public class HookIdentityDto
    {
        [JsonPropertyName("traits")]
        public TraitsDataDto Traits { get; set; }
    }
}
