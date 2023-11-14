using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Velusia.Server.Data;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Velusia.Server;

public class Worker : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public Worker(IServiceProvider serviceProvider)
        => _serviceProvider = serviceProvider;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = _serviceProvider.CreateAsyncScope();

        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await context.Database.EnsureCreatedAsync();

        var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

        if (await manager.FindByClientIdAsync("5231564A5-E7FE-42CB-B10D-61EF6A8F3654") == null)
        {
            await manager.CreateAsync(new OpenIddictApplicationDescriptor
            {
                ClientId = "5231564A5-E7FE-42CB-B10D-61EF6A8F3654",
                ConsentType = ConsentTypes.Explicit,
                DisplayName = "Login",
                RedirectUris =
                {
                    new Uri("http://localhost:1234/oidc/signin/oidc-dotnet-server-mvc-oidc"),
                    new Uri("https://zealous-stone-0ec781310.4.azurestaticapps.net//oidc/signin/oidc-dotnet-server-mvc-oidc")
                },
                PostLogoutRedirectUris =
                {
                    new Uri("http://localhost:1234/oidc/signin/oidc-dotnet-server-mvc-oidc"),
                    new Uri("https://zealous-stone-0ec781310.4.azurestaticapps.net//oidc/signin/oidc-dotnet-server-mvc-oidc")
                },
                Permissions =
                {
                    Permissions.Endpoints.Authorization,
                    Permissions.Endpoints.Logout,
                    Permissions.Endpoints.Token,
                    Permissions.GrantTypes.AuthorizationCode,
                    Permissions.ResponseTypes.Code,
                    Permissions.Prefixes.Scope + "openid"
                },
                Requirements =
                {
                    Requirements.Features.ProofKeyForCodeExchange
                }
            });
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
