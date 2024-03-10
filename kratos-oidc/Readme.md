# Example for ory kratos

This example is using
- ory kratos
- react native for mobile app
- asp.net core for custom backend service for kratos webhooks during registration and login

General idea is
- integrate mimoto as generic oidc provider
- intercept registration/login calls via webhook and create required flow based on the possibility to interrupt flow / parse result


## Start locally

1. start kratos
docker-compose -f quickstart.yml up --build --force-recreate

2. start backend

3. start react-native app on device
  npm i
  npm start