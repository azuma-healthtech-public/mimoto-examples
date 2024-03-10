import {ActivityIndicator, Linking, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {executeAuthRequest, executeCodeExchange} from './helpers/Api';
import {Button} from '@rneui/themed';
import {Text} from '@rneui/base';
import {CommonActions} from '@react-navigation/native';
import {User} from './helpers/KratosApi';

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
    (user: User) => {
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
        const parUrl = await executeAuthRequest(issuer);
        if (parUrl) {
          console.log('Result: Par request successful');
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
      console.log('(5) Starting code exchange');

      try {
        const result = await executeCodeExchange(deepLink);
        if (result && result.status === 'success') {
          console.log('Result: Code exchange successful');
          handleTokenReceived(result.user!);
        } else {
          console.log('Result: Code exchange failed');
          setError(
            'Could not authorize. Please try again later: ' + result.error!,
          );
        }
      } catch (e) {
        console.log('Result: Code exchange failed');
        console.log(e);
        setError('Could not authorize. Please try again later...' + e.message);
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
