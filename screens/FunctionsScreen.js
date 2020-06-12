import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {useState} from 'react';
import { TextInput, Alert, StyleSheet, Button, Text, View, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { RectButton, FlatList, ScrollView} from 'react-native-gesture-handler';
import GLOBALVARIABLES from '../globals/variables'
import GLOBALFUNCTIONS from '../globals/functions'
import GLOBALSTYLES from './styles/styles'

export default function FunctionsScreen() {

    const [newAmountOfFunctions, setNewAmountOfFunctions] = React.useState(0);
    const [editedFunctionsID, setEditedFunctionsID] = React.useState('');
    const [currentFunctionEditing, setCurrentFunctionEditing] = React.useState('');
    const [functionsList, setFunctionsList] = React.useState('');
    const [updateFunctionsModalVisible, setUpdateFunctionsModalVisible] = useState(false);
    
    const [createFunctionModalVisible, setCreateFunctionModalVisible] = useState(false);
    const [newFunctionName, setNewFunctionName] = React.useState('');
    const [newFunctionAmount, setNewFunctionAmount] = React.useState('');

    async function fetchFunctionsData() {
      await GLOBALFUNCTIONS.fetchFunctions()
      await setFunctionsList(GLOBALVARIABLES.functions)
    }

    function setUpdateModal(name, id, boolean) {
      setCurrentFunctionEditing(name)
      setEditedFunctionsID(id)
      setUpdateFunctionsModalVisible(boolean)
    }

    React.useEffect(() => {
      fetchFunctionsData()
    },[]);

    return (
      <View style={GLOBALSTYLES.container}>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={updateFunctionsModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalStyle}>
              <Text style={GLOBALSTYLES.text}>
                Ändrar funktion "{currentFunctionEditing}", med ID {editedFunctionsID}
              </Text>
              <Text style={GLOBALSTYLES.text}>
                Vänligen skriv in ett nytt antal nedan:
              </Text>
              <View>
                <TextInput
                  style={GLOBALSTYLES.textInput}
                  onChangeText={text => setNewAmountOfFunctions(text)}
                  value={newAmountOfFunctions}
                  keyboardType={'numeric'}
                />
                <Text style={GLOBALSTYLES.text}>
                  Nya antalet "{currentFunctionEditing}" blir {newAmountOfFunctions}
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
                          GLOBALFUNCTIONS.updateFunctions(editedFunctionsID, newAmountOfFunctions) 
                          fetchFunctionsData()
                          setNewAmountOfFunctions(0)
                          setUpdateFunctionsModalVisible(!updateFunctionsModalVisible)
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
                      fetchFunctionsData()
                      setNewAmountOfFunctions(0)
                      setUpdateFunctionsModalVisible(!updateFunctionsModalVisible)
                    }
                  }
                />
              </View>
            </View>
          </Modal>     
          <Modal
            animationType="fade"
            transparent={false}
            visible={createFunctionModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View>
                <ScrollView style={GLOBALSTYLES.scrollView}>
                  <Text style={GLOBALSTYLES.text}>
                    Skapar ny funktion, vänligen fyll i information nedan! {"\n"} {"\n"}
                  </Text>

                  <Text style={GLOBALSTYLES.text}>
                    Namn på funktionen:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewFunctionName(text)}
                    value={newFunctionName}
                  />

                  <Text style={GLOBALSTYLES.text}>
                    Antal:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewFunctionAmount(text)}
                    value={newFunctionAmount}
                    keyboardType={'numeric'}
                  />

                  <Text style={GLOBALSTYLES.text}>
                    Namn: {newFunctionName} {"\n"}
                    Antal: {newFunctionAmount}{"\n"}
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

                            let newFunction = {
                              name: newFunctionName,
                              amount: newFunctionAmount,
                            }

                            GLOBALFUNCTIONS.createFunction(newFunction)
                            fetchFunctionsData()
                            setNewFunctionName('')
                            setNewFunctionAmount('')
                            setCreateFunctionModalVisible(!createFunctionModalVisible)
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
                        setNewFunctionAmount('')
                        setNewFunctionName('')
                        setCreateFunctionModalVisible(!createFunctionModalVisible)
                      }
                    }
                  />
                </ScrollView>
              </View>
          </Modal>
        </View>

        <FlatList 
          data={ functionsList }
          renderItem={
            ({ item }) => {
              return(
                <OptionButton
                  icon="ios-build"
                  information={item}
                  onPress={() => {
                    setUpdateModal(item.name, item.id, true)
                  }}
                />
              )
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.option}>
          <Button
            title="Lägg till funktion"
            onPress={() => 
              setCreateFunctionModalVisible(true)
            }
          />
        </View>

        <View style={styles.option}>
          <Button
            style={styles.headerText}
            title="Uppdatera"
            onPress={() => 
              fetchFunctionsData()
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