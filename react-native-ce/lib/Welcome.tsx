import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/themed';
import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {Card, ListItem} from '@rneui/base';

export function Welcome({route, navigation}) {
  const {user} = route.params;
  const [expanded, setExpanded] = React.useState(false);
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
            <ListItem.Accordion
              content={
                <ListItem.Content>
                  <ListItem.Title>All claims</ListItem.Title>
                </ListItem.Content>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}>
              <Text>birthdate: {user.claims.birthday}</Text>
              <Text>
                urn:telematik:claims:id:{' '}
                {user.claims['urn:telematik:claims:id']}
              </Text>
              <Text>
                urn:telematik:claims:organization:{' '}
                {user.claims['urn:telematik:claims:organization']}
              </Text>
              <Text>
                urn:telematik:claims:geschlecht:{' '}
                {user.claims['urn:telematik:claims:geschlecht']}
              </Text>
              <Text>
                urn:telematik:claims:display_name:{' '}
                {user.claims['urn:telematik:claims:display_name']}
              </Text>
              <Text>
                urn:telematik:claims:given_name:{' '}
                {user.claims['urn:telematik:claims:given_name']}
              </Text>
              <Text>
                urn:telematik:claims:profession:{' '}
                {user.claims['urn:telematik:claims:profession']}
              </Text>
              <Text>acr: {user.claims.acr}</Text>
              <Text>
                urn:telematik:claims:email:{' '}
                {user.claims['urn:telematik:claims:email']}
              </Text>
              <Text>
                urn:telematik:claims:alter:{' '}
                {user.claims['urn:telematik:claims:alter']}
              </Text>
              <Text>as: {user.claims.as}</Text>
              <Text>sub: {user.claims.sub}</Text>
              <Text>
                ext-mimoto-original-iss:{' '}
                {user.claims['ext-mimoto-original-iss']}
              </Text>
              <Text>
                ext-mimoto-original-sub-unique:{' '}
                {user.claims['ext-mimoto-original-sub-unique']}
              </Text>
            </ListItem.Accordion>
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
