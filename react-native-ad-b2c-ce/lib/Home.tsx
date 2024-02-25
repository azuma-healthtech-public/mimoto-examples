import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@rneui/base';
import {currentDemoSettings, DemoType} from './Constants';

export function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>React-Native CE example</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            onPress={() => {
              currentDemoSettings.demoType = DemoType.LoginWebExchange;
              navigation.navigate('LoginIdpExchange');
            }}
            title="Login with Gesundsheits-ID (WebView Exchange)"
          />
          <View style={{height: 20}} />
          <Button
            onPress={() => {
              currentDemoSettings.demoType = DemoType.LoginWebOnly;
              navigation.navigate('LoginIdpWebOnly');
            }}
            title="Login with Gesundsheits-ID (WebView Only)"
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Built for azuma mimoto</Text>
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  footer: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
