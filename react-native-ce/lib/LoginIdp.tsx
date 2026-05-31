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
  const {issuer, deepLink} = route.params || {};

  console.log(`LoginIdp rendered. Stage: ${stage}, deepLink: ${deepLink}`);

  const handleTokenReceived = useCallback(
    (result: TokenResponse) => {
      console.log('LoginIdp: handleTokenReceived called.');
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
      console.log(`LoginIdp: Starting auth. Issuer: ${issuer}`);
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

    if (stage !== Stage.None || deepLink) {
      console.log(`LoginIdp: Skipping startAuth. Stage is ${stage}, deepLink is ${!!deepLink}`);
      return;
    }

    console.log(`LoginIdp: Calling startAuth now.`);
    startAuth();
  }, [handleTokenReceived, issuer, stage, deepLink]);

  // Stage.CodeExchangeRequest
  React.useEffect(() => {
    const exchangeCodes = async () => {
      setStage(Stage.CodeExchangeRequest);
      console.log(`LoginIdp: Starting code exchange with deepLink: ${deepLink}`);

      try {
        const result = await executeCodeExchange(
          getCurrentData().pkceClient,
          deepLink,
        );
        if (result) {
          console.log('LoginIdp: Code exchange successful', result);
          handleTokenReceived(result);
        } else {
          console.log('LoginIdp: Code exchange failed (result is null or undefined)');
          setError('Could not authorize. Please try again later...');
        }
      } catch (e) {
        console.log('LoginIdp: Error during exchangeCodes:', e);
        setError('Could not authorize. Please try again later...');
      }
    };

    if (deepLink && (stage === Stage.AuthRequest || stage === Stage.None)) {
      console.log(`LoginIdp: Calling exchangeCodes. deepLink is present, stage is ${stage}.`);
      exchangeCodes();
    } else {
      console.log(`LoginIdp: Skipping exchangeCodes. deepLink: ${!!deepLink}, stage: ${stage}`);
    }
  }, [handleTokenReceived, navigation, deepLink, stage]);

  return (
    <View style={styles.container}>
      {error ? <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>{error}</Text> : <ActivityIndicator size={'large'} />}

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
