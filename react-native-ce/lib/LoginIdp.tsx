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
import {getCurrentData} from './data/Data.ts';

enum Stage {
  None,
  AuthRequest,
  CodeExchangeRequest,
}

export function LoginIdp({route, navigation}) {
  const [stage, setStage] = useState<Stage>(Stage.None);
  const [error, setError] = useState<String>();
  const {issuer, deepLink} = route.params;

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
    const startAuth = async () => {
      console.log('Starting auth');
      try {
        getCurrentData().pkceClient.reset(); // ensure we always use new state/pkce values

        const parUrl = await executeAuthRequest(
          getCurrentData().pkceClient,
          issuer,
        );

        if (parUrl) {
          console.log('Par request successful');
          // valid redirect, open authenticator url
          setStage(Stage.AuthRequest);
          await Linking.openURL(parUrl);
        } else {
          setError('Could not authorize. Please try again later...');
        }
      } catch (e) {
        console.log(e);
        setError('Could not authorize. Please try again later...');
      }
    };

    if (stage !== Stage.None) {
      return;
    }

    startAuth();
  }, [handleTokenReceived, issuer, stage]);

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

    if (deepLink && stage === Stage.AuthRequest) {
      exchangeCodes();
    }
  }, [handleTokenReceived, navigation, deepLink, stage]);

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}

      <ActivityIndicator size={'large'} />

      <Button onPress={() => navigation.replace('Home')}>Cancel Login</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
