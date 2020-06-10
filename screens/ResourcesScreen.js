import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState} from 'react';
import { TextInput, Alert, StyleSheet, Button, Text, View, Modal } from 'react-native';
import { RectButton, FlatList} from 'react-native-gesture-handler';
import GLOBALVARIABLES from '../globals/variables'
import GLOBALFUNCTIONS from '../globals/functions'
import GLOBALSTYLES from './styles/styles'

export default function ResourcesScreen() {

    const [newAmountOfResources, setNewAmountOfResources] = React.useState(0);
    const [editedResourcesID, setEditedResourcesID] = React.useState('');
    const [currentResourceEditing, setCurrentResourceEditing] = React.useState('');
    const [resourcesModalVisible, setResourcesModalVisible] = useState(false);
    const [resourcesList, setResourcesList] = React.useState('');

    async function fetchResourcesData() {
      await GLOBALFUNCTIONS.fetchResources()
      await setResourcesList(GLOBALVARIABLES.resources)
    }

    function setUpModal(name, id, boolean) {
      setCurrentResourceEditing(name)
      setEditedResourcesID(id)
      setResourcesModalVisible(boolean)
    }

    React.useEffect(() => {
      fetchResourcesData()
    },[]);

    return (
      <View style={GLOBALSTYLES.container}>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={resourcesModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalStyle}>
              <Text style={GLOBALSTYLES.text}>
                Ändrar resursen "{currentResourceEditing}", med ID {editedResourcesID}
              </Text>
              <Text style={GLOBALSTYLES.text}>
                Vänligen skriv in ett nytt antal nedan:
              </Text>
              <View>
                <TextInput
                  style={GLOBALSTYLES.textInput}
                  onChangeText={text => setNewAmountOfResources(text)}
                  value={newAmountOfResources}
                  keyboardType={'numeric'}
                />
                <Text style={GLOBALSTYLES.text}>
                  Nya antalet "{currentResourceEditing}" blir {newAmountOfResources}
                </Text>
                <Button
                  style={styles.headerText}
                  title="Bekräfta"
                  onPress={() => {
                    Alert.alert(
                      "Skicka till API?",
                      "",
                      [
                        {
                          text: "Avbryt",
                          onPress: () =>  console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => { 
                          console.log("OK Pressed")
                          GLOBALFUNCTIONS.updateResources(editedResourcesID, newAmountOfResources) 
                          fetchResourcesData()
                          setNewAmountOfResources(0)
                          setResourcesModalVisible(!resourcesModalVisible)
                        }}
                      ],
                      { cancelable: false }
                    );
                  }}
                />
                <Button
                  style={styles.headerText}
                  title="Avbryt"
                  onPress={() => {
                      setNewAmountOfResources(0)
                      setResourcesModalVisible(!resourcesModalVisible)
                    }
                  }
                />
              </View>
            </View>
          </Modal>
        </View>

        <FlatList 
          data={ resourcesList }
          renderItem={
            ({ item }) => {
              switch (item.name) {
                case "alltiallo":
                  return(
                    <OptionButton
                      icon="ios-brush"
                      information={item}
                      onPress={() => {
                        setUpModal(item.name, item.id, true)
                      }}
                    />
                  )
                case "stenhuggare":
                  return(
                    <OptionButton
                      icon="ios-hammer"
                      information={item}
                      onPress={() =>{
                        setUpModal(item.name, item.id, true)
                      }}
                    />
                  )

                case "vakt":
                return(
                  <OptionButton
                    icon="ios-body"
                    information={item}
                    onPress={() => {
                      setUpModal(item.name, item.id, true)
                    }}
                  />
                )

                case "skogshuggare":
                return(
                  <OptionButton
                    icon="ios-cloudy"
                    information={item}
                    onPress={() => {
                      setUpModal(item.name, item.id, true)
                    }}
                  />
                )
              
                default:
                  return(
                    <OptionButton
                      icon="ios-help"
                      information={item}
                      onPress={() => {
                        setUpModal(item.name, item.id, true)
                      }}
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
            onPress={() => 
              fetchResourcesData()
            }
          />
        </View>
      </View>      
    );
}

function OptionButton({ icon, information, onPress}) {
  return (
    <RectButton style={styles.option} onPress={onPress}>
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
  modalStyle: {
    marginTop: 150
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  openButton: {
    alignSelf: "center",
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: 90,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    width: 100,
    height: 30
  },
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