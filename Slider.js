<script src="http://localhost:8097"></script>
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Button
} from "react-native";
import React, {useState} from "react";

const { width } = Dimensions.get("window");
const height = width * 0.6; //60%
import pomo from './assets/pomo.png'
import pommo from './assets/pommo.jpg'


const images = [
  pomo,
  pommo
];

export default function Slider({navigation}) {

  const onPress = () => {
    navigation.navigate('Jipange')

}

  const [active, setActive] = useState(0)
  console.log('Active', active)
  const Change = ({nativeEvent}) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if(slide !== active){
      setActive(slide)
    }
  }
  return (
    <View>
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Change}
        style={styles.scroll}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.image}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {
          images.map((i,k) => (

<Text key={k} style={k == active ? styles.pagingActiveText : styles.pagingText}>⬤</Text>

           )) }
      </View>
     
    </View>
    { active === 1 && <View style={{margin: 20}}>
     <Button title="Get Started" onPress={onPress} />
</View> }
</View>
    
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 150, width, height, justifyContent: 'center', textAlign: 'center'},
  scroll: { width, height },
  image: { width: 411, height: 300, resizeMode: "contain" },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    marginLeft: 160,
    bottom: 0,
    
  },
  pagingText: {
    color: "#888",
    margin: 3,
    fontSize: (width / 30)

  },
  pagingActiveText: {
    color: "#fff",
    margin: 3,
    fontSize: (width / 30)
  },
});
