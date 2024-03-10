using Backend.Api.Controllers.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.Api.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginHooksController : ControllerBase
    {
        private readonly ILogger<LoginHooksController> _logger;

        public LoginHooksController(ILogger<LoginHooksController> logger)
        {
            _logger = logger;
        }

        [HttpPost("after")]
        public IActionResult AfterHook([FromBody] HookDataDto request)
        {
            _logger.LogInformation("login: AfterHook");
            if (string.IsNullOrEmpty(request.Traits.Email) || string.IsNullOrEmpty(request.Traits.Kvnr))
            {
                // Interrupt login as email/kvnr missing
                return BadRequest();
            }

            // TODO: update KVNR ..
            return Ok();
        }
    }
}
