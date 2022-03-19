import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
          JIPANGE
      </Text>
      <Image source={require('./assets/adaptive-icon.png')} style={{width: 30, height: 30}}/>

    </View>
  )
}




const styles = StyleSheet.create({
    container: {
        paddingRight: 12,
        maxWidth: 620,
        margin: 'auto',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text:{
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 10
    }
  });