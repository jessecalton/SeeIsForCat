import axios from '../services/Axios';
import React, { useState, useCallback } from 'react';
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
  const [isLoading, setLoading] = useState(false);
  const [catURL, setCatURL] = useState('');
  const [catName, setCatName] = useState('');
  const sendRequest = useCallback(async () => {
    if (isLoading) return;
    setLoading(true);
    const response = await axios.get(
      'images/search?ormat=json&mime_types=jpg%2Cpng'
    );
    console.log(response.data[0].url);
    setCatURL(response.data[0].url);
    setCatName(faker.name.firstName());
    setLoading(false);
  }, [isLoading]);

  // set conditions for loading cat picture and cat name
  let image;
  let namePlate;
  if (!isLoading && catURL !== '') {
    image = <Image style={styles.catPicture} source={{ uri: catURL }} />;
    namePlate = <Text>This cat is named {catName}</Text>;
  } else if (isLoading) {
    image = <ActivityIndicator />;
    namePlate = <Text>This cat is named {catName}</Text>;
  } else {
    image = null;
    namePlate = <Text>Press the button to get a cat!</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{image}</View>
      {namePlate}
      <TouchableOpacity style={styles.button} onPress={sendRequest}>
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
    width: 250,
    height: 250,
  },
  catPicture: {
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
