import {kratosMetadata} from '../Constants';

export interface KratosResult {
  status: 'success' | 'error';
  error?: string;
  user?: User;
}

export interface User {
  email: string;
  claims?: any;
}

export const createKratosLoginFlow = async () => {
  const url = `${kratosMetadata.kratos_endpoint}/self-service/login/api?refresh=false`;
  console.log('(1) Kratos (Create): ' + url);
  const response = await fetch(url);
  if (response.status !== 200) {
    throw 'could not create kratos login request';
  }
  return await response.json();
};

export const updateKratosLoginFlowForMimoto = async (flow: any) => {
  const urlStart = `${kratosMetadata.kratos_endpoint}/self-service/login?flow=${flow.id}`;
  console.log('(2) Kratos (Start): ' + urlStart);
  flow.provider = 'mimoto';

  const responseLogin = await fetch(urlStart, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flow),
  });

  // kratos returns 422 with the url for mimoto. Continue from here with call against mimoto
  if (responseLogin.status !== 422) {
    throw 'could not update kratos login request';
  }
  const responseLoginJson = await responseLogin.json();
  return responseLoginJson.redirect_browser_to;
};

export const finalizeProcessInKratos = async (kratosRedirectUrl: string) => {
  console.log('(5b) Kratos (Finalize flow)');
  const kratosResponse = await fetch(kratosRedirectUrl);
  const kratosResponseJson = await kratosResponse.json();
  console.log('Result: KRATOS response status: ' + kratosResponse.status);

  if (kratosResponse.status === 200) {
    // login successful in kratos, continue with session token
    return continueOnSuccess(kratosResponseJson.session_token);
  } else if (kratosResponse.status === 400) {
    return continueOnError(kratosResponseJson);
  } else {
    throw 'unexpected response --> do proper error handling here';
  }
};

export const continueOnSuccess = async (session_token: string) => {
  const kratosUserResponse = await fetch(
    `${kratosMetadata.kratos_endpoint}/sessions/whoami`,
    {
      headers: {'X-Session-Token': `${session_token}`},
    },
  );
  if (kratosUserResponse.status !== 200) {
    throw 'could not retrieve current session from kratos';
  }
  const kratosUserJson = await kratosUserResponse.json();
  const kratosResult: KratosResult = {
    status: 'success',
    user: {email: kratosUserJson.identity.traits.email.toString()},
  };
  return kratosResult;
};

export const continueOnError = (kratosResponseJson: any) => {
  const kratosResult: KratosResult = {
    status: 'error',
    error: 'unknown',
  };

  // get validation error messages and determine what failed --> this can be used to control the follow up process
  for (const node of kratosResponseJson?.ui?.nodes) {
    if (node.group === 'oidc' && node?.attributes?.name === 'traits.email') {
      const ids = node?.messages?.map(x => x.id);
      if (ids.indexOf(4000002) >= 0) {
        kratosResult.error = 'email_missing';
        return kratosResult;
      }
      if (ids.indexOf(9990001) >= 0) {
        kratosResult.error = 'claims_missing';
        return kratosResult;
      }
      if (ids.indexOf(9990002) >= 0) {
        kratosResult.error = 'user_exists';
        return kratosResult;
      }
    }
  }

  return kratosResult;
};
