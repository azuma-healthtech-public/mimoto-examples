using Backend.Api.Controllers.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;

namespace Backend.Api.Controllers
{
    [Route("api/registration")]
    [ApiController]
    public class RegistrationHooksController : ControllerBase
    {
        private readonly ILogger<RegistrationHooksController> _logger;

        public RegistrationHooksController(ILogger<RegistrationHooksController> logger)
        {
            _logger = logger;
        }


        [HttpPost("after")]
        public IActionResult AfterHook([FromBody] HookDataDto request)
        {
            _logger.LogInformation("registration: AfterHook");

            if (string.IsNullOrEmpty(request.Traits.Email) || string.IsNullOrEmpty(request.Traits.Kvnr))
            {
                return BadRequest(CreateErrorResponse(9990001, "Process interrupted, claims missing"));
            }
            if (request.Traits.Email == "Dorine.Erner@example.com")
            {
                return BadRequest(CreateErrorResponse(9990002, "Process interrupted, user exists"));
            }

            return Ok(new HookOkDto() { Identity = new HookIdentityDto() { Traits = request.Traits } });
        }

        private HookCancelDto CreateErrorResponse(int id, string message)
        {
            return new HookCancelDto()
            {
                Messages = new System.Collections.Generic.List<HookCancelMessageDto>()
                {
                    new HookCancelMessageDto(){
                        Name = "#/traits/email",
                        Messages = new System.Collections.Generic.List<HookCancelMessageDetailsMessageDto>()
                        {
                            new HookCancelMessageDetailsMessageDto()
                            {
                                Id = id,
                                Text = message,
                                Type = "validation"
                            }
                        }
                    }
                }
            };
        }

        // Debug only, to read data sent by kratos
        private async Task<string> GetRequestBody()
        {
            var bodyStream = new StreamReader(Request.Body);
            return await bodyStream.ReadToEndAsync();
        }
    }

}
