import { View, Text } from 'react-native'
import React from 'react'
import Slider from '../Slider';
import Pomodoro from '../Pomodoro';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';





export default function SliderScreen() {



const Stack = createStackNavigator();



  return (
  
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'black',
        },

      }}
    >
      <Stack.Screen name="Home" component={Slider} />
      <Stack.Screen name="Jipange" component={Pomodoro} options={{headerLeft: (props) => null }} />

    </Stack.Navigator>
  )
}