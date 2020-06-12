import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Alert, Platform, StyleSheet, Text, TouchableOpacity, View, Button, Modal, TextInput } from 'react-native';
import GLOBALVARIABLES from '../globals/variables'
import GLOBALFUNCTIONS from '../globals/functions'
import { Feather } from '@expo/vector-icons'; 
import GLOBALSTYLES from './styles/styles'

export default function HomeScreen() {
  const [amountOfServants, setAmountOfServants] = React.useState(0);
  const [totalSalary, setTotalSalary] = React.useState(0);
  const [treasury, setTreasury] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newTreasury, setNewTreasury]= React.useState(0)
  const [keepName, setKeepName] = React.useState("")

  React.useEffect(() => {
    fetchAPIData()
  },[]);
  
  return (
    <View style={GLOBALSTYLES.container}>   
      <View>
          <Modal
            style={GLOBALSTYLES.mainMenuModal}
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closedd.');
            }}>
            <View style={GLOBALSTYLES.modalStyle}>
              <Text style={GLOBALSTYLES.text}>
                Hur mycket koppar vill du lagra i skattkammaren? 
              </Text>
              <View>
                <TextInput
                  style={GLOBALSTYLES.textInput}
                  onChangeText={text => setNewTreasury(text)}
                  value={newTreasury}
                  keyboardType={'numeric'}
                />

                <Text style={GLOBALSTYLES.text}>
                  Sätta in {newTreasury}
                </Text>

                <Button
                  style={GLOBALSTYLES.headerText}
                  title="Bekräfta"
                  onPress={() => {
                    Alert.alert(
                      "Lagra i skattkammaren?",
                      "",
                      [
                        {
                          text: "Cancel",
                          onPress: () =>{ 
                            console.log("Cancel pressed")
                            setNewTreasury(0)
                          },
                          style: "cancel"
                        },
                        { text: "OK", 
                        onPress: () => { 

                          let currenTreasury = GLOBALVARIABLES.treasury
                          let updatedTreasury = currenTreasury + parseInt(newTreasury, 10)
                          GLOBALFUNCTIONS.updateTreasury(GLOBALVARIABLES.keepId, updatedTreasury)
                          setNewTreasury(0)
                          setModalVisible(!modalVisible)

                        }}
                      ],
                      { cancelable: false }
                    );
                  }}
                />
                <Button
                  style={GLOBALSTYLES.headerText}
                  title="Avbryt"
                  onPress={() => {
                      setNewTreasury(0)
                      setModalVisible(!modalVisible)
                    }
                  }
                />
              </View>
            </View>
          </Modal>
        </View>   
      
      <View style={GLOBALSTYLES.imageContainer}>
        <Image
          source={require('../assets/images/vidbacka.png')}
          style={GLOBALSTYLES.image}
        />
      </View>

      <View style={GLOBALSTYLES.textContainer}>
        <Text style={GLOBALSTYLES.text}>
          Välkomna hem till {GLOBALVARIABLES.keepName} {GLOBALVARIABLES.keepId}
        </Text>
      </View>

      <View style={GLOBALSTYLES.textContainer}>
        <Text style={GLOBALSTYLES.text}>
          Stadskassan innehåller {treasury} koppar
        </Text>
      </View>

      <View style={GLOBALSTYLES.textContainer}>
        <Text style={GLOBALSTYLES.text}>
          Daglig lön: {totalSalary} koppar
        </Text>
      </View>

      <View style={GLOBALSTYLES.textContainer}>
        <Text style={GLOBALSTYLES.text}>
          Antal tjänare: {amountOfServants} stycken
        </Text>
      </View>   

      <View style={GLOBALSTYLES.refreshButton}>
        <Feather name="refresh-ccw" size={24} color="black" onPress={() => {
          fetchAPIData()
        }}/>
      </View>

      <View style={GLOBALSTYLES.addToTreasuryButton}>
          <Button
            style={GLOBALSTYLES.headerText}
            title="Skattkammaren"
            onPress={() => {
                setModalVisible(true);
              }
            }
          />
      </View>

      <View style={GLOBALSTYLES.newDayButton}>
          <Button
            style={GLOBALSTYLES.headerText}
            title="Ny dag"
            onPress={() => {
              Alert.alert(
                "Ny dag",
                "Om du accepterar nu kommer den dagliga lönen att betalas ut till alla tjänare, och dagens resurser insamlas",
                [
                  {
                    text: "Avbryt",
                    onPress: () =>{ 
                      console.log("Cancel pressed")
                    },
                    style: "cancel"
                  },
                  { text: "Kör!", 
                  onPress: () => { 
                    GLOBALVARIABLES.treasury -= GLOBALVARIABLES.totalSalary
                    if(GLOBALVARIABLES.treasury < 0) {
                      Alert.alert(
                        "Slut på koppar!",
                        "Åh nej.. slut på koppar i skattkammaren. Det löser sig säkert.. Säkert.",
                        [
                          {
                            text: "Avbryt",
                            onPress: () =>{ 
                              console.log("Cancel pressed")
                            },
                            style: "cancel"
                          },
                          { text: "R.I.P. :(", 
                          onPress: () => {
                            GLOBALVARIABLES.treasury += GLOBALVARIABLES.totalSalary
                            setTreasury(GLOBALVARIABLES.treasury)
                          }}
                        ],
                        { cancelable: true }
                      )
                    } else {
                      GLOBALFUNCTIONS.gatherAllResources()
                      fetchAPIData()
                      setTreasury(GLOBALVARIABLES.treasury) 
                    }
                  }}
                ],
                { cancelable: true }
              );
              }
            }
          />
      </View>

    </View>
    
  );

  async function fetchAPIData() {
    await GLOBALFUNCTIONS.fetchFunctions()
    await GLOBALFUNCTIONS.fetchResources()
    await GLOBALFUNCTIONS.fetchServants()
    await GLOBALFUNCTIONS.fetchKeep()
    await setTreasury(GLOBALVARIABLES.treasury)
    await setAmountOfServants(GLOBALVARIABLES.totalAmountOfServants)
    await setTotalSalary(GLOBALVARIABLES.totalSalary)
    await setTreasury(GLOBALVARIABLES.treasury)
  }
}