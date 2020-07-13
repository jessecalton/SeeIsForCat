import axios from '../services/Axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const Cat = () => {
  const faker = require('faker');
  const [isLoading, setLoading] = useState(true);
  const [catURL, setCatURL] = useState('');
  const [catName, setCatName] = useState('');

  useEffect(() => {
    axios
      .get('images/search?ormat=json&mime_types=jpg%2Cpng')
      .then((response) => response.data)
      .then((data) => setCatURL(data[0].url))
      .then(() => console.log(catURL))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    return () => setCatURL('');
  }, [isLoading]);

  useEffect(() => {
    setCatName(faker.name.firstName());
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {!isLoading && catURL !== '' ? (
          <Image style={styles.tinyLogo} source={{ uri: catURL }} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <Text>This cat is named {catName}</Text>

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
