import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { RectButton, FlatList } from 'react-native-gesture-handler';
import GLOBAL from '../globals/variables'

export default function FunctionsScreen() {

    return (
      <View style={styles.container}>        
        <FlatList 
          data={ GLOBAL.functions }
          renderItem={
            ({ item }) => {
              switch (item.name) {
                case "brunn":
                  return(
                    <OptionButton
                      icon="ios-water"
                      information={item}
                      onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                    />
                  )
                case "stenbrott":
                  return(
                    <OptionButton
                      icon="ios-water"
                      information={item}
                      onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                    />
                  )
                default:
                  return(
                    <OptionButton
                      icon="ios-help"
                      information={item}
                      onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                    />
                  )
              }
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.option}>
          <Button
            style={styles.headerText}
            title="Uppdatera"
            onPress={() => {
                
              }
            }
          />
        </View>
      </View>      
    );
}

function OptionButton({ icon, information, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{information.name}, {information.amount}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fafafa'
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed'
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
    textTransform: 'capitalize'
  },
  headerStyle: {
    paddingBottom: 3
  },
  headerContext: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: 'flex-start',
    padding: 10,
  },
  item: {
    margin: 20,
    color: '#fff'
  },
  header: {
    margin: 10,
    fontSize: 20
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#000"
  }
});