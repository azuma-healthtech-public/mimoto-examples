using System.Text.Json;
using System.Text.Json.Serialization;

namespace ExampleApp.Service.Helpers
{
    public static class JsonHelper
    {
        private static JsonSerializerOptions CreateOptions()
        {
            var options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,

                ReferenceHandler = ReferenceHandler.IgnoreCycles
            };

            var enumConverter = new JsonStringEnumConverter();
            options.Converters.Add(enumConverter);

            return options;
        }

        static JsonHelper()
        {
            Options = CreateOptions();
        }

        public static JsonSerializerOptions Options { get; }

        public static string Serialize<T>(T value)
        {
            return JsonSerializer.Serialize(value, Options);
        }
        public static T Deserialize<T>(string value)
        {
            return JsonSerializer.Deserialize<T>(value, Options);
        }
    }
}
