import axios from '../services/Axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const Cat = () => {
  const [isLoading, setLoading] = useState(true);
  const [cat, setCat] = useState('');

  useEffect(() => {
    axios
      .get('images/search')
      .then((response) => response.data)
      .then((data) => setCat(data[0].url))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);
  return (
    <View>
      <View style={styles.container}>
        {isLoading ? null : (
          <Image style={styles.tinyLogo} source={{ uri: cat }} />
        )}
        <Text>{cat}</Text>
      </View>
      <Button
        style={styles.button}
        title='Press Button Get Cat'
        onPress={() => setLoading(true)}
      />
    </View>
  );
};

export default Cat;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: 300,
    height: 300,
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
  button: {
    margin: 50,
  },
});
