import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Linking} from 'react-native';
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

    getStateFromPath: (path: string, _) => {
      console.log('App.tsx: Received deep link. Path is:', path);
      if (path.toString().indexOf('/code/ce') === 0) {
        const reconstructedUrl = `https://mimoto-example-app.azuma-health.tech/rn-ce${path}`;
        console.log('App.tsx: Received code exchange deep link. Reconstructed URL:', reconstructedUrl);
        return {
          routes: [
            {
              name: 'LoginIdp',
              params: {
                deepLink: reconstructedUrl,
              },
            },
          ],
        };
      } else {
        console.log('App.tsx: Path does not start with /code/ce. Ignoring.');
      }
    },
  };

  useEffect(() => {
    // Log the initial URL in case the app was fully closed
    Linking.getInitialURL().then(url => {
      console.log('App.tsx: Raw initial URL:', url);
    });

    // Log URLs received while the app is in background/foreground
    const subscription = Linking.addEventListener('url', ({url}) => {
      console.log('App.tsx: Raw incoming URL event:', url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
