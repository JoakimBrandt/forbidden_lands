import { Ionicons, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { TextInput, Alert, Button, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import { RectButton, FlatList, ScrollView} from 'react-native-gesture-handler';
import GLOBALVARIABLES from '../globals/variables'
import GLOBALFUNCTIONS from '../globals/functions'
import GLOBALSTYLES from './styles/styles'

export default function ServantsScreen() {

    const [newAmountOfServants, setNewAmountOfServants] = React.useState(0);
    const [editedServantsID, seteditedServantsID] = React.useState('');
    const [currentServantEditing, setCurrentServantEditing] = React.useState('');
    const [updateServantModalVisible, setUpdateServantModalVisible] = useState(false);
    const [createServantModalVisible, setCreateServantModalVisible] = useState(false);
    const [servantsList, setServantsList] = React.useState('');

    const [newServantName, setNewServantName] = React.useState('');
    const [newServantAmount, setNewServantAmount] = React.useState('');
    const [newServantSalary, setNewServantSalary] = React.useState('');
    const [newServantProductionAmount, setNewServantProductionAmount] = React.useState('');
    const [newServantProductionType, setNewServantProductionType] = React.useState('');


    async function fetchServantsData() {
      await GLOBALFUNCTIONS.fetchServants()
      await setServantsList(GLOBALVARIABLES.servants)
    }

    function setupUpdateServantModal(name, id, boolean) {
      setCurrentServantEditing(name)
      seteditedServantsID(id)
      setUpdateServantModalVisible(boolean)
    }

    React.useEffect(() => {
      fetchServantsData()
    },[]);

    return (
      <View style={GLOBALSTYLES.container}>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={updateServantModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalStyle}>
              <Text style={GLOBALSTYLES.text}>
                Ändrar tjänare "{currentServantEditing}", med ID {editedServantsID}
              </Text>
              <Text style={GLOBALSTYLES.text}>
                Vänligen skriv in ett nytt antal nedan:
              </Text>
              <View>
                <TextInput
                  style={GLOBALSTYLES.textInput}
                  onChangeText={text => setNewAmountOfServants(text)}
                  value={newAmountOfServants}
                  keyboardType={'numeric'}
                />
                <Text style={GLOBALSTYLES.text}>
                  Nya antalet "{currentServantEditing}" blir {newAmountOfServants}
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
                          GLOBALFUNCTIONS.updateServants(editedServantsID, newAmountOfServants) 
                          fetchServantsData()
                          setNewAmountOfServants(0)
                          setUpdateServantModalVisible(!updateServantModalVisible)
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
                      setNewAmountOfServants(0)
                      setUpdateServantModalVisible(!updateServantModalVisible)
                    }
                  }
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={false}
            visible={createServantModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View>
                <ScrollView style={GLOBALSTYLES.scrollView}>
                  <Text style={GLOBALSTYLES.text}>
                    Skapar ny tjänare, vänligen fyll i information nedan! {"\n"} {"\n"}
                  </Text>

                  <Text style={GLOBALSTYLES.text}>
                    Namn på tjänaren:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewServantName(text)}
                    value={newAmountOfServants}
                  />

                  <Text style={GLOBALSTYLES.text}>
                    Lön:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewServantSalary(text)}
                    value={newAmountOfServants}
                    keyboardType={'numeric'}
                  />
                  
                  <Text style={GLOBALSTYLES.text}>
                    Antal tjänare:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewServantAmount(text)}
                    value={newAmountOfServants}
                    keyboardType={'numeric'}
                  />

                  <Text style={GLOBALSTYLES.text}>
                    Produktionsmängd:
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewServantProductionAmount(text)}
                    value={newAmountOfServants}
                    keyboardType={'numeric'}
                  />

                  <Text style={GLOBALSTYLES.text}>
                    Produktionssort (vilken typ av resurs tjänaren producerar):
                  </Text>
                  <TextInput
                    style={GLOBALSTYLES.textInput}
                    onChangeText={text => setNewServantProductionType(text)}
                    value={newAmountOfServants}
                  />
                

                  <Text style={GLOBALSTYLES.text}>
                    Namn: {newServantName} {"\n"}
                    Antal: {newServantAmount}{"\n"}
                    Lön: {newServantSalary}{"\n"}
                    Produktionsmängd: {newServantProductionAmount}{"\n"}
                    Produktionstyp: {newServantProductionType}
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

                            let newServant = {
                              name: newServantName,
                              amount: newServantAmount,
                              salary: newServantSalary,
                              production_type: newServantProductionType,
                              production_amount: newServantProductionAmount
                            }
                            GLOBALFUNCTIONS.createServant(newServant)
                            fetchServantsData()
                            setNewServantName('')
                            setNewServantAmount('')
                            setNewServantSalary('')
                            setNewServantProductionAmount('')
                            setNewServantProductionType('')
                            setCreateServantModalVisible(!createServantModalVisible)
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
                        setNewAmountOfServants(0)
                        setCreateServantModalVisible(!createServantModalVisible)
                      }
                    }
                  />
                </ScrollView>
              </View>
          </Modal>
        </View>

        <FlatList 
          data={ servantsList }
          renderItem={
            ({ item }) => {
              return (
                <OptionButton
                  icon="ios-body"
                  information={item}
                  onPress={() => {
                    setupUpdateServantModal(item.name, item.id, true)
                  }}
                />
              )
            }
          }
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.option}>
          <Button
            title="Lägg till tjänare"
            onPress={() => 
              setCreateServantModalVisible(true)
            }
          />
        </View>
      </View>      
    );
}

/*
<View style={styles.option}>
  <Button
    style={styles.headerText}
    title="Uppdatera"
    onPress={() => 
      fetchServantsData()
    }
  />
</View>
*/

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