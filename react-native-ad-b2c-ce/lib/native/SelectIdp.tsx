import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, ListItem} from '@rneui/themed';
import {executeLoadIdps, Idp} from '../helpers/Api';

export function SelectIdp({navigation}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Idp[]>([]);

  React.useEffect(() => {
    const loadIdpList = async () => {
      const responseData = await executeLoadIdps();
      setData(responseData);

      setLoading(false);
    };

    loadIdpList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Title>Select your IDP</Card.Title>
          <Card.Divider />
          {loading && <ActivityIndicator size={'large'} />}
          {!loading && (
            <>
              {data
                .sort((a, b) =>
                  a.organizationName.localeCompare(b.organizationName),
                )
                .map(idp => (
                  <ListItem key={idp.issuer}>
                    <ListItem.Content>
                      <ListItem.Title>
                        <Button
                          onPress={() =>
                            navigation.navigate('LoginIdp', {
                              issuer: idp.issuer,
                            })
                          }>
                          {idp.organizationName}
                        </Button>
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
            </>
          )}
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
