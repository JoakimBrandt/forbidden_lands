import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'
import flLogo from './assets/flLogo.png'

export default function App() {
  return (
    <View style={styles.container}>

      <Image source={flLogo} style={styles.flLogo}/>
      <Image source={logo} style={styles.logo}/>

      <TouchableOpacity
        onPress={() => alert('Hello, world!')} style={styles.button}>
        <Text style={styles.buttonText}>Testa här</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300, 
    height: 95,
    marginBottom: 10
  },
  flLogo: {
    width: 185, 
    height: 47,
    marginBottom: 10
  },
  title: {
    color: 'black',
    fontSize: 25,
    marginHorizontal: 15
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
