// import GlobalStyles from './GlobalStyles';

import { StyleSheet, Text, View,TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import Pomodoro from './Pomodoro';
import { useState } from 'react';
import SafeViewArea from './SafeViewArea';
import Slider from './Slider';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SliderScreen from './screens/SliderScreen';
import PomoScreen from './screens/PomoScreen';
export default function App() {
const [isClicked, setIsClicked] = useState(false)
const [isLong, setIsLong] = useState(false)
const [isShort, setIsShort] = useState(false)
const [isPomo, setIsPomo] = useState(true)
const [className, setClassName] = useState({flex: 1,backgroundColor: '#D9504A',alignItems: 'center',justifyContent: 'center',
})




// #457CA3
const Stack = createStackNavigator();


const click=(text, value, func, bg) => {
      
  console.log('ChangeInApp', bg)
      if(value === 'pomo' && text === true){
          setClassName({flex: 1,backgroundColor: '#D9504A',alignItems: 'center',justifyContent: 'center'})
      } else if(value === 'short' && text === true){
        setClassName({flex: 1,
          backgroundColor: '#4C9195',
          alignItems: 'center',
          justifyContent: 'center'})
        
      } else if(value === 'long' && text === true) {
        setIsLong(true)
        setIsClicked(true)
        setClassName({flex: 1,
          backgroundColor: '#457CA3',
          alignItems: 'center',
          justifyContent: 'center'})


      }
}
//   console.log('isClicked', isClicked)
// console.log('className', className)
  return (


      <NavigationContainer>
  
    <SliderScreen />

    </NavigationContainer>

    



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9504A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerShort: {
    flex: 1,
    backgroundColor: '#4C9195',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLong:{
  flex: 1,
  backgroundColor: '#457CA3',
  alignItems: 'center',
  justifyContent: 'center',

},


});
