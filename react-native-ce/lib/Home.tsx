import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Card} from '@rneui/themed';
import React from 'react';
import {metadata} from './data/Constants.ts';
import {selectDemo} from './data/Data.ts';

export function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>React-Native CE example</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          {metadata.map(meta => (
            <Card key={meta.title}>
              <Card.Title>{meta.title}</Card.Title>
              <Card.Divider />
              <Button
                onPress={() => {
                  selectDemo(meta);
                  navigation.navigate('SelectIdp');
                }}
                title="Login with Gesundsheits-ID"
              />
            </Card>
          ))}
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>Built for azuma mimoto</Text>
        </View>
      </ScrollView>
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
