import {StyleSheet, View} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Card} from '@rneui/themed';
import {selectDemo} from './data/Data.ts';
import {metadataRU, metadataTU, metadataTUMockL1, metadataTUMockL2} from './data/Constants.ts';

export function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>React-Native Webview CE example</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Card>
            <Card.Title>(RU): Using gematik Authenticator</Card.Title>
            <Card.Divider />
            <Button
              onPress={() => {
                selectDemo(metadataRU);
                navigation.navigate('LoginIdp');
              }}
              title="Login with Gesundsheits-ID"
            />
          </Card>
          <Card>
            <Card.Title>(TU): Using gematik Authenticator</Card.Title>
            <Card.Divider />
            <Button
              onPress={() => {
                selectDemo(metadataTU);
                navigation.navigate('LoginIdp');
              }}
              title="Login with Gesundsheits-ID"
            />
          </Card>
          <Card>
            <Card.Title>(TU): Using mock Authenticator</Card.Title>
            <Card.Divider />
            <Button
              onPress={() => {
                selectDemo(metadataTUMockL1);
                navigation.navigate('LoginIdp');
              }}
              title="Login (Layout 1)"
            />
            <Card.Divider />
            <Button
              onPress={() => {
                selectDemo(metadataTUMockL2);
                navigation.navigate('LoginIdp');
              }}
              title="Login (Layout 2)"
            />
          </Card>
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
