using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Api.Controllers.Dtos
{
    public class HookCancelDto
    {
        [JsonPropertyName("messages")]
        public List<HookCancelMessageDto> Messages { get; set; }
    }

    public class HookCancelMessageDto
    {
        [JsonPropertyName("instance_ptr")]
        public string Name { get; set; }

        [JsonPropertyName("messages")]
        public List<HookCancelMessageDetailsMessageDto> Messages { get; set; }

    }

    public class HookCancelMessageDetailsMessageDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; } = "validation";
    }
}
