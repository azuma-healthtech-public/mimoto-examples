import {ActivityIndicator, Linking, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {
  executeAuthRequestWeb,
  executeCodeExchangeInternal,
  pkceClient,
  TokenResponse,
} from '../helpers/Api';
import {decodeToken} from '../helpers/Token';
import {Button} from '@rneui/themed';
import {Text} from '@rneui/base';
import {CommonActions} from '@react-navigation/native';
import {metadata} from '../Constants';
import {WebView} from 'react-native-webview';
import {
  ShouldStartLoadRequest,
  WebViewErrorEvent,
  WebViewNavigationEvent,
} from 'react-native-webview/src/WebViewTypes';

enum Stage {
  None,
  AuthRequest,
  WaitingForCode,
  CodeExchangeRequest,
  CodeExchangeRequestInner,
}

export function LoginIdpWebOnly({route, navigation}) {
  const [stage, setStage] = useState<Stage>(Stage.None);
  const [error, setError] = useState<String>();
  const [authUrl, setAuthUrl] = useState<String>();
  const deepLink = route?.params?.deepLink;

  const handleTokenReceived = useCallback(
    (result: TokenResponse) => {
      const user = decodeToken(result);
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Welcome', params: {user}}],
      });
      navigation.dispatch(resetAction);
    },
    [navigation],
  );

  // Stage.AuthRequest
  React.useEffect(() => {
    const startAuth = () => {
      console.log('Starting auth');
      try {
        pkceClient.reset(); // ensure we always use new state/pkce values

        const url = executeAuthRequestWeb(pkceClient);
        if (url) {
          console.log('Auth request successful: ' + url);
          setAuthUrl(url);
          setStage(Stage.AuthRequest);
        } else {
          setError('Could not authorize. Please try again later...');
        }
      } catch (e) {
        console.log(e);
        setError('Could not authorize. Please try again later...');
      }
    };

    if (stage === Stage.None) {
      startAuth();
    }
  }, [stage]);

  // Stage.CodeExchangeRequest
  React.useEffect(() => {
    const exchangeCodes = async () => {
      setStage(Stage.CodeExchangeRequest);
      console.log('Starting code exchange');

      // we receive a deep link specific to our app, lets continue with the actual signin url (code+state are meant for mimoto, not for our internal flow)
      const link = deepLink.replace(
        'https://mimoto-example-app.azuma-health.tech/code/ce',
        'https://mimoto-test.pie.azuma-health.tech/oidcf/signin',
      );

      setAuthUrl(link);
    };

    if (deepLink && stage === Stage.WaitingForCode) {
      exchangeCodes();
    }
  }, [handleTokenReceived, navigation, deepLink, stage]);

  const handleLoadEnd = (event: WebViewNavigationEvent | WebViewErrorEvent) => {
    console.log('LOADED: ' + event.nativeEvent.url);

    if (stage === Stage.CodeExchangeRequest) {
      if (event.nativeEvent.url.startsWith('https://azumaadb2c.b2clogin.com')) {
        // html displayed in browser instead of flow finalization, display browser
        setStage(Stage.CodeExchangeRequestInner);
      }
    }
  };

  const handleShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    const {url} = event;
    if (!url) {
      return false;
    }

    console.log('LOADING: ' + url);

    // Essentially we need to intercept when
    // (1) we receive the initial IDP PAR response --> this is the URL that needs to be opened in the platform, so
    // that the authenticator app is displayed
    // (2) we receive the final response meant for us to finish our internal flow
    if (
      stage === Stage.CodeExchangeRequest ||
      stage == Stage.CodeExchangeRequestInner
    ) {
      if (
        url.startsWith(
          'https://mimoto-example-app.azuma-health.tech/rn-azure-ad-b2c-ce/app/ce',
        )
      ) {
        console.log('INTERCEPTED - code exchange');
        executeCodeExchangeInternal(pkceClient, url).then(result =>
          handleTokenReceived(result),
        );
        return false;
      }
      return true;
    }

    if (
      url.startsWith(metadata.mimoto_endpoint) ||
      url.startsWith(
        'https://azumaadb2c.b2clogin.com/azumaadb2c.onmicrosoft.com/B2C_1_Mimoto_Signup_SignIn',
      )
    ) {
      return true;
    }

    console.log('INTERCEPTED - IDP open: ' + url);
    Linking.openURL(url);
    setStage(Stage.WaitingForCode);
    return false;
  };
  return (
    <>
      <View style={styles.containerWeb}>
        <WebView
          thirdPartyCookiesEnabled={false}
          sharedCookiesEnabled={false}
          cacheMode={'LOAD_NO_CACHE'}
          source={authUrl ? {uri: authUrl!} : {html: ''}}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onLoadEnd={handleLoadEnd}
          incognito={true}
          domStorageEnabled={false}
        />
      </View>
      {stage === Stage.WaitingForCode ||
        (stage === Stage.CodeExchangeRequest && (
          <View style={styles.containerOverlay}>
            <View style={styles.containerInner}>
              {error && <Text>{error}</Text>}

              <ActivityIndicator size={'large'} />

              <Button onPress={() => navigation.replace('Home')}>
                Cancel Login
              </Button>
            </View>
          </View>
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  containerInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerWeb: {
    flex: 1,
  },
});
