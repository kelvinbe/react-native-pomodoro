import { View, Text } from 'react-native'
import React from 'react'
import Pomodoro from '../Pomodoro';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';





export default function PomoScreen() {

const Stack = createStackNavigator();

  return (
  
    <Stack.Navigator>
      <Stack.Screen name="Jipange" component={Pomodoro} />


    </Stack.Navigator>
  )
}