import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Home} from './lib/Home';
import {Welcome} from './lib/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LoginWebExchange} from './lib/webview/LoginWebExchange';
import {LoginIdpWebOnly} from './lib/webview/LoginIdpWebOnly';
import {currentDemoSettings, DemoType} from './lib/Constants';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const linking = {
    prefixes: [
      'https://mimoto-example-app.azuma-health.tech/rn-azure-ad-b2c-ce',
    ],

    getStateFromPath: (path, _) => {
      console.log('Received deep link');
      if (path.toString().indexOf('/code/ce') === 0) {
        // optional, in case multiple links are supported
        console.log('Received code exchange deep link');
        console.log(`Current demo: ${currentDemoSettings.demoType}`);
        return {
          routes: [
            {
              name:
                currentDemoSettings.demoType === DemoType.LoginWebExchange
                  ? 'LoginIdpExchange'
                  : 'LoginIdpWebOnly',
              params: {
                deepLink: `https://mimoto-example-app.azuma-health.tech${path}`,
              },
            },
          ],
        };
      }
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerTitle: 'Home'}}
          />
          <Stack.Screen
            name="LoginIdpExchange"
            component={LoginWebExchange}
            options={{headerTitle: 'Logging in with Identity Provider'}}
          />
          <Stack.Screen
            name="LoginIdpWebOnly"
            component={LoginIdpWebOnly}
            options={{headerTitle: 'Logging in with Identity Provider'}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerTitle: 'Welcome'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
