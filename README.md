# mimoto-examples
Repository containing mimoto integration examples

## react-oidc
This example uses https://www.npmjs.com/package/react-oidc-context to show simple react integration examples. 

## dotnet-client-mvc-oidc
This example was forked from https://github.com/openiddict/openiddict-samples/tree/dev/samples/Velusia/Velusia.Client and configuration extended for mimoto.

General Idea:
ASP.NET Core MVC application has login via authorization code flow against mimoto (integrated via openiddict).

## dotnet-client-server-mvc-oidc
This example was forked from https://github.com/openiddict/openiddict-samples/tree/dev/samples/Velusia and configuration extended for mimoto.

General Idea:
ASP.NET Core MVC application has login via authorization code flow against ASP.NET Core Authorization Server, which integrates mimoto (via authorization code flow).

## dotnet-server-mvc-oidc
This example was forked from https://github.com/openiddict/openiddict-samples/tree/dev/samples/Velusia/Velusia.Server and configuration extended for mimoto.

General Idea:
ASP.NET Core Authorization Server, which integrates mimoto (via authorization code flow). Can be used from react or android apps.

## rails-rodauth-omniauth-simple
Simple example using omiauth to integrate mimoto (via authorization code flow) and rodauth for auth management.

## laravel-passport-socialite-simple
Simple example using socialite to integrate mimoto (via authorization code flow) and passport for auth management.

## ...
More coming soon.