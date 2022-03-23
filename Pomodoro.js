import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, FlatList, SafeAreaView, Animated, Easing   } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import AddTodo from "./Todo";
import TodoItem from "./TodoItem";
import Header from "./Header";
import LottieView from 'lottie-react-native';




export default function Pomodoro() {


  const pomoSeconds = 1500;
  const shortSeconds = 300;
  const longSeconds = 900;
  const [isPlaying, setIsPlaying] = useState(false);
  const [minute, setMinuter] = useState(25);
  const [initialTime, setInitialTime] = useState(pomoSeconds)
  const [duration, setDuration] = useState(pomoSeconds)
  const [click, setClick] = useState(false)
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);

  // const [progress, setProgress] = useState(Animated.Value(0))
  const progress = useRef(new Animated.Value(0)).current;
  const animation = useRef(null);
  const [pressed, setPressed] = useState(false);
  const [key, setKey] = useState(0)
  const [canChange, setCanChange] = useState(false)
  const [anime, setAnime] = useState(require('./assets/eyefocus.json'))
  const [animeColor, setAnimeColor] = useState('#D9504A')
  const [lottieContainer, setLottieContainer] = useState({backgroundColor: '#D9504A',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,})

const [className, setClassName] = useState({flex: 1,backgroundColor: '#D9504A',alignItems: 'center',justifyContent: 'center',
})

  const onPress = () => {
    setIsPlaying((prev) => !prev)
    if(isPlaying){
    animation.current.pause()
    setPressed(false)

    }else if(!isPlaying){
    animation.current.resume()
    setPressed(true)


    }
  }

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    console.log('helooooo')
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  const funRef = useRef(null);
  

  let width = 170
  let height = 170

  const renderTime = (dimension, minute, seconds) => {
    return (
      <View style={styles.timerLayout}>
        <View>
          <Text style={styles.text}>{minute}</Text>
        </View>
        <View>
          <Text style={styles.text}>
            :
          </Text>
        </View>
        <View>
          <Text style={styles.text}>{seconds}</Text>
        </View>
        {/* <View>
          <Text style={styles.textMin}>{dimension}</Text>
        </View> */}
      </View>
    );
  };

  useEffect(() => {
    // animation.play();
    

    if (minute !== 0) {
      funRef.current = setTimeout(() => {
        setMinuter(minute - 1);
      }, 60000);
    } else {
      clearTimeout(funRef.current);
    }
  });


  const switchTimer = (value) => {
    if(value === 'pomo'){
      setKey(prevKey => prevKey +1)
      
      setIsPlaying(false)
      setDuration(pomoSeconds)
      setInitialTime(pomoSeconds)
      setMinuter(25)
      setAnime(require('./assets/eyefocus.json'))
      setAnimeColor('#D9504A')
      setLottieContainer({backgroundColor: '#D9504A',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
        setClassName({backgroundColor: '#D9504A',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,})
      
    }else if(value === 'short'){
      setKey(prevKey => prevKey +1)

      setIsPlaying(false)
      setDuration(shortSeconds)
      setInitialTime(shortSeconds)
      setMinuter(5)
      setAnime(require('./assets/shortBreak.json'))
      setAnimeColor('#4C9195')
      setLottieContainer({backgroundColor: '#4C9195',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
      setClassName({backgroundColor: '#4C9195',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
      
    }else if(value === 'long'){
      setKey(prevKey => prevKey +1)

      setIsPlaying(false)
      setDuration(longSeconds)
      setInitialTime(longSeconds)
      setMinuter(15)
      setAnime(require('./assets/relaxing.json'))
      setAnimeColor('#457CA3')
      setLottieContainer({backgroundColor: '#457CA3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
      setClassName({backgroundColor: '#457CA3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
    }
  }


  const setDurationTime = (value) => {
    if(isPlaying){
      // setKey(prevKey => prevKey +1)
      setIsPlaying(false)
      animation.current.pause()

      Alert.alert('Warning', 'Timer is still running. Are you sure you want to switch', [ 
        {text: 'YES', onPress: () => {
          switchTimer(value)
          setCanChange(true)
        }
        
        },
        {text: 'No', onPress: () => {
        setIsPlaying(true)
        animation.current.resume()

          
        }
        
        }
        
      ])  
    }else if(!isPlaying){
      if(value === 'pomo'){
        setKey(prevKey => prevKey +1)
        setIsPlaying(false)
        setDuration(pomoSeconds)
        setInitialTime(pomoSeconds)
        setMinuter(25)
        setAnime(require('./assets/eyefocus.json'))
        setAnimeColor('#D9504A')
        setLottieContainer({backgroundColor: '#D9504A',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
        setClassName({backgroundColor: '#D9504A',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,})
      }else if(value === 'short'){
        setKey(prevKey => prevKey +1)
        setIsPlaying(false)
        setDuration(shortSeconds)
        setInitialTime(shortSeconds)
        setMinuter(5)
        setAnime(require('./assets/shortBreak.json'))
        setAnimeColor('#4C9195')
        setLottieContainer({
        backgroundColor: '#4C9195',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
        setClassName({backgroundColor: '#4C9195',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})

      }else if(value === 'long'){
        setKey(prevKey => prevKey +1)
        setIsPlaying(false)
        setDuration(longSeconds)
        setInitialTime(longSeconds)
        setMinuter(15)
        setAnime(require('./assets/relaxing.json'))
        setAnimeColor('#457CA3')
        setLottieContainer({
        backgroundColor: '#457CA3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,})
        setClassName({backgroundColor: '#457CA3',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,})

      }
    }
  }



  const timerProps = {
    isPlaying: false,
    // size: 120,
    // strokeWidth: 6
  };

  console.log('canChangeInPomo', canChange)


  return (
    <View style={className}>
    <View style={styles.container}>
      <Header />
      <View style={styles.pomoSquare}>
        <View style={styles.header}>
          <View style>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => setDurationTime('pomo')}
            >
              <Text style={styles.textButtonH}>Pomodoro</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => setDurationTime('short')}
            >
              <Text style={styles.textButtonH}>Short Break</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => setDurationTime('long')}
            >
              <Text style={styles.textButtonH}>Long Break</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timer}>
          <CountdownCircleTimer
            {...timerProps}
            isPlaying={isPlaying}
            key={key}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            initialRemainingTime={initialTime}
            duration={duration}
            colorsTime={[25, 15, 5, 0]}
            onComplete={() => {
              setKey(prevKey => prevKey +1)
              setIsPlaying(false)
              animation.current.pause()
            }}
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;

              return renderTime("minute", minutes, seconds);
            }}
          </CountdownCircleTimer>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress()}
        >
          <Text style={styles.textButton}>{isPlaying ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>


     <View style={lottieContainer}>
        <LottieView
        ref={animation}
          style={{
            width: width,
            height: height,
            backgroundColor: animeColor,
          }}
          source={anime}
          autoPlay={false}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
     
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    backgroundColor: '#D9504A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: 'space-evenly'
    
  },
  layout: {
    flex: 1,backgroundColor: '#D9504A',alignItems: 'center',justifyContent: 'center',
  
  },
  animationContainer: {
    backgroundColor: '#D9504A',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  timerLayout: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  pomoSquare: {
    width: 350,
    height: 350,
    paddingTop: 10,
    paddingBottom: 30,
    borderRadius: 6,
    marginBottom: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  timer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // textTransform: 'capitalize',
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  textButton: {
    textTransform: "capitalize",
    fontSize: 30,
    color: "rgb(217, 85, 80)",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
  },
  buttonHeader: {
    backgroundColor: "#00000026",
    padding: 5,
    width: 100,
    height: 29,
    padding: 5,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textButtonH: {
    textTransform: "capitalize",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  textMin: {
    // textTransform: 'capitalize',
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  content: {
    // padding: 40,
    // backgroundColor: "pink",
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
