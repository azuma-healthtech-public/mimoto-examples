import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import React from 'react';
import {CommonActions} from '@react-navigation/native';

export function Welcome({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Text>Welcome</Text>
        <Text>{user?.email}</Text>
      </View>

      <Button
        onPress={() => {
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          navigation.dispatch(resetAction);
        }}>
        Reset
      </Button>
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
