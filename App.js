// import GlobalStyles from './GlobalStyles';

import { StyleSheet, Text, View,TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import Pomodoro from './Pomodoro';
import { useState } from 'react';
import SafeViewArea from './SafeViewArea';



export default function App() {
const [isClicked, setIsClicked] = useState(false)
const [isLong, setIsLong] = useState(false)
const [isShort, setIsShort] = useState(false)
const [isPomo, setIsPomo] = useState(true)
const [className, setClassName] = useState({flex: 1,backgroundColor: '#D9504A',alignItems: 'center',justifyContent: 'center',
})




// #457CA3


const click=(text, value, func) => {
      
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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      // console.log("Dismissed keyboard");
    }}>
      <SafeAreaView style={SafeViewArea.AndroidSafeArea}>
      <View style={className}>
      <Pomodoro isClicked={click} />
      {/* <Text>Hello</Text> */}
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

}
});
