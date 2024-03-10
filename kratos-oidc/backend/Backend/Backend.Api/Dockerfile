FROM mcr.microsoft.com/dotnet/aspnet:7.0

COPY Backend.Api/bin/Debug/net7.0/publish App/

WORKDIR /App

ENTRYPOINT ["dotnet", "Backend.Api.dll"]


