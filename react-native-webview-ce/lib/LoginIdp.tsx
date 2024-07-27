import {ActivityIndicator, Linking, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {
  executeAuthRequest,
  executeCodeExchange,
  TokenResponse,
} from './helpers/Api';
import {decodeToken} from './helpers/Token';
import {Button} from '@rneui/themed';
import {Text} from '@rneui/base';
import {CommonActions} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {ShouldStartLoadRequest} from 'react-native-webview/src/WebViewTypes';
import {getCurrentData} from './data/Data.ts';

enum Stage {
  None,
  AuthRequest,
  WaitingForCode,
  CodeExchangeRequest,
}

export function LoginIdp({route, navigation}) {
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
        getCurrentData().pkceClient.reset(); // ensure we always use new state/pkce values

        const url = executeAuthRequest(getCurrentData().pkceClient);
        if (url) {
          console.log('Auth request successful');
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

      try {
        const result = await executeCodeExchange(
          getCurrentData().pkceClient,
          deepLink,
        );
        if (result) {
          console.log('Code exchange successful');
          handleTokenReceived(result);
        } else {
          setError('Could not authorize. Please try again later...');
        }
      } catch (e) {
        console.log(e);
        setError('Could not authorize. Please try again later...');
      }
    };

    if (deepLink && stage === Stage.WaitingForCode) {
      exchangeCodes();
    }
  }, [handleTokenReceived, navigation, deepLink, stage]);

  const handleShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    const {url} = event;
    if (!url) {
      return false;
    }

    if (url.startsWith(getCurrentData().metadata.mimoto_endpoint)) {
      return true;
    }

    console.log('Opening IDP');
    Linking.openURL(url);
    setStage(Stage.WaitingForCode);
    return false;
  };
  return (
    <>
      {stage !== Stage.None && stage !== Stage.AuthRequest && (
        <View style={styles.container}>
          {error && <Text>{error}</Text>}

          <ActivityIndicator size={'large'} />

          <Button onPress={() => navigation.replace('Home')}>
            Cancel Login
          </Button>
        </View>
      )}

      {stage === Stage.AuthRequest && (
        <View style={styles.containerWeb}>
          {authUrl && (
            <WebView
              source={{uri: authUrl!}}
              onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            />
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerWeb: {
    flex: 1,
  },
});
