import {
  createKratosLoginFlow,
  finalizeProcessInKratos,
  updateKratosLoginFlowForMimoto,
} from './KratosApi';
import {
  executeCodeExchangeMimotoDeepLink,
  initiateMimotoFlow,
} from './MimotoApi';

export const executeAuthRequest = async (issuer: string) => {
  // (1) create kratos login flow
  const flow = await createKratosLoginFlow();

  // (2) start login with provider mimoto and pre-selected provider
  const mimitoRedirectUrl = await updateKratosLoginFlowForMimoto(flow);

  // (3) kratos returns 422 with the url for mimoto. Continue from here with call against mimoto
  const parUrl = await initiateMimotoFlow(mimitoRedirectUrl, issuer);

  // (4) mimoto returns PAR url, that we need to open in the platform
  return parUrl;
};

export const executeCodeExchange = async (deepLink: string) => {
  // (1) execute code exchange with mimoto
  const kratosRedirectUrl = await executeCodeExchangeMimotoDeepLink(deepLink);

  // (2) finalize kratos
  const result = await finalizeProcessInKratos(kratosRedirectUrl);

  // (3) response can either be success or error, relevent for the follow up flow
  return result;
};
