import axios from '../services/Axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Cat = () => {
  const faker = require('faker');
  const [isLoading, setLoading] = useState(true);
  const [catURL, setCatURL] = useState('');
  const [catName, setCatName] = useState('');

  useEffect(() => {
    axios
      .get('images/search?limit=1&mime_types=jpg%2Cpng')
      .then((response) => response.data)
      .then((data) => {
        setCatURL(data[0].url);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [isLoading]);
  return (
    <View style={styles.container}>
      <Text>Placeholder</Text>
      <View style={styles.imageContainer}>
        {isLoading ? null : (
          <Image style={styles.tinyLogo} source={{ uri: catURL }} />
        )}
      </View>
      {isLoading ? null : (
        <Text>This cat is named {faker.name.firstName()}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text>Press Button Get Cat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  imageContainer: {
    margin: 'auto',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 250,
    height: 250,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: 20,
    padding: 10,
  },
});
