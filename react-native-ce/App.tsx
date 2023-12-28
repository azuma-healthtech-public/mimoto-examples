import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Home} from './lib/Home';
import {SelectIdp} from './lib/SelectIdp';
import {LoginIdp} from './lib/LoginIdp';
import {Welcome} from './lib/Welcome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const linking = {
    prefixes: ['https://mimoto-example-app.azuma-health.tech/rn-ce'],

    getStateFromPath: (path, _) => {
      console.log('Received deep link');
      if (path.toString().indexOf('/code/ce') === 0) {
        // optional, in case multiple links are supported
        console.log('Received code exchange deep link');
        return {
          routes: [
            {
              name: 'LoginIdp',
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
            name="SelectIdp"
            component={SelectIdp}
            options={{headerTitle: 'Select Identity Provider'}}
          />
          <Stack.Screen
            name="LoginIdp"
            component={LoginIdp}
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
