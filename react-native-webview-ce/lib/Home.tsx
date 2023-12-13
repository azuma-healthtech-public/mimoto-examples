import {View} from 'react-native';
import {Button} from '@rneui/base';

export function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => {
          navigation.navigate('LoginIdp');
        }}
        title="Login with Gesundsheits-ID"
      />
    </View>
  );
}
