import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {Card} from '@rneui/base';

export function Welcome({route, navigation}) {
  const {user} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>React-Native CE example</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Card>
            <Card.Title>Login successfull</Card.Title>
            <Card.Divider />
            <Text>Email from ID-Token:</Text>
            <Text>{user?.email}</Text>
          </Card>

          <View style={{paddingVertical: 30}}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
