import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons, FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FunctionsScreen from '../screens/FunctionsScreen';
import ServantsScreen from '../screens/ServantsScreen'
import ResourcesScreen from '../screens/ResourcesScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Hem',
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="ios-bonfire" size={20} color="black" />
          } 
        }}
      />
      <BottomTab.Screen
        name="servants"
        component={ServantsScreen}
        options={{
          title: 'Tjänare',
          tabBarIcon: ({ focused }) => {
            return <FontAwesome5 name="people-carry" size={20} color="black" />
          } 
        }}
      />

    <BottomTab.Screen
        name="functions"
        component={FunctionsScreen}
        options={{
          title: 'Funktioner',
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="ios-settings" size={20} color="black" />
          } 
        }}
      />

      <BottomTab.Screen
        name="resources"
        component={ResourcesScreen}
        options={{
          title: 'Resurser',
          tabBarIcon: ({ focused }) => {
            return <MaterialCommunityIcons name="database-settings" size={20} color="black" />
          } 
        }}
      />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'home':
      return 'Hem';
    case 'functions':
      return 'Funktioner';
    case 'servants':
      return 'Tjänare';
    case 'resources':
      return 'Resurser';
  }
}
