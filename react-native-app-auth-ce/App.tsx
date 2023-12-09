/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import {AppSection} from './AppSection';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob'; // needed for jwt decode

const defaultAuthState = {
  hasLoggedInOnce: false,
  accessToken: '',
  idToken: '',
  email: '',
};

const configMimoto: AuthConfiguration = {
  issuer: 'https://mimoto-test.pie.azuma-health.tech',
  clientId: 'b664b9ab-1484-4228-b546-7b173a860f44',
  redirectUrl: 'https://mimoto-example-app.azuma-health.tech/app/ce',
  scopes: ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    tokenEndpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  },
};

const configMimotoGematikSimulation: AuthConfiguration = {
  issuer: 'https://mimoto-test.pie.azuma-health.tech',
  //clientId: 'b664b9ab-1484-4228-b546-7b173a860f44',
  clientId: 'da7c5825-694a-4918-85f4-e5ad1a9247db',
  redirectUrl: 'https://mimoto-example-app.azuma-health.tech/app/ce',
  additionalParameters: {provider: 'https://gsi.dev.gematik.solutions'},
  scopes: ['openid', 'urn:telematik:versicherter', 'urn:telematik:email'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://mimoto-test.pie.azuma-health.tech/connect/auth',
    tokenEndpoint: 'https://mimoto-test.pie.azuma-health.tech/connect/token',
  },
  iosCustomBrowser: 'safari'
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [authState, setAuthState] = useState(defaultAuthState);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleAuthorize = useCallback(async config => {
    try {
      const newAuthState = await authorize({
        ...config,
        connectionTimeoutSeconds: 5,
        iosPrefersEphemeralSession: true,
        skipCodeExchange: false,

        usePKCE: true
      });

      if( newAuthState.authorizationCode && newAuthState.authorizationCode.length != 0 ){
        // code exchange
        let response = await fetch(
          "https://mimoto-test.pie.azuma-health.tech/connect/token",
          {
            method: 'POST', 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'grant_type': 'authorization_code',
              'client_id': config.clientId,
              'redirect_uri': config.redirectUrl,
              'code': newAuthState.authorizationCode,
              'code_verifier': newAuthState.codeVerifier!
          }).toString()
          }
        );
        let responseJson = await response.json();
        if (responseJson.error) {
          console.error('error ', responseJson.error); // ...
        }
        newAuthState.accessToken = responseJson.access_token;
        newAuthState.idToken = responseJson.id_token;
      }

      const decoded = jwtDecode(newAuthState.idToken);
      setAuthState({
        hasLoggedInOnce: true,
        accessToken: newAuthState.accessToken,
        idToken: newAuthState.idToken,

        // just a very simple way to get some claims
        // @ts-ignore
        email: decoded['urn:telematik:claims:email'],
      });

      // HINT: here you could also exchange mimoto AT/ID for your own AT/ID
    } catch (error) {
      // FIXME: provide proper error handling
      Alert.alert('Failed to log in', error?.message);
    }
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {authState.accessToken && (
            <AppSection title="Logged In">{authState.email}</AppSection>
          )}
          {!authState.accessToken && (
            <>
              <AppSection title="Login">
                <Button
                  onPress={() => handleAuthorize(configMimoto)}
                  title="Login with Gesundsheits-ID"
                />
              </AppSection>
              <AppSection title="Login (gematik, Simulation)">
                <Button
                  onPress={() => handleAuthorize(configMimotoGematikSimulation)}
                  title="Login with Gesundsheits-ID"
                />
              </AppSection>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
