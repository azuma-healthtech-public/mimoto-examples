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
import 'core-js/stable/atob';
import {executeCodeExchange} from './lib/Api';
import {configMimoto, configMimotoGematik, configMimotoGematikSimulation} from './lib/Constants'; // needed for jwt decode

const defaultAuthState = {
  hasLoggedInOnce: false,
  accessToken: '',
  idToken: '',
  email: '',
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [authState, setAuthState] = useState(defaultAuthState);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const handleAuthorize = useCallback(async (config: AuthConfiguration) => {
    try {
      let newAuthState = await authorize({
        ...config,
        connectionTimeoutSeconds: 5,
        iosPrefersEphemeralSession: true,
        skipCodeExchange: false,

        usePKCE: true,
      });

      if (
        newAuthState.authorizationCode &&
        newAuthState.authorizationCode.length !== 0
      ) {
        // code exchange: this is required if code exchange is disable or not executed in app auth
        newAuthState = await executeCodeExchange(config, newAuthState);
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
    } catch (error: any) {
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
            <>
              <AppSection title="Logged In">{authState.email}</AppSection>
              <AppSection title="Reset">
                <Button
                  onPress={() => setAuthState(defaultAuthState)}
                  title="Reset"
                />
              </AppSection>
            </>
          )}
          {!authState.accessToken && (
            <>
              <AppSection title="Login">
                <Button
                  onPress={() => handleAuthorize(configMimoto)}
                  title="Login with Gesundsheits-ID"
                />
              </AppSection>
              <AppSection title="Login (gematik)">
                <Button
                  onPress={() => handleAuthorize(configMimotoGematik)}
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
