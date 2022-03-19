import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, FlatList, SafeAreaView  } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import AddTodo from "./Todo";
import TodoItem from "./TodoItem";
import Header from "./Header";



export default function Pomodoro({ isClicked }) {


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

  const funRef = useRef(null);
  



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
    if (minute !== 0) {
      funRef.current = setTimeout(() => {
        setMinuter(minute - 1);
      }, 60000);
    } else {
      clearTimeout(funRef.current);
    }
  });

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const switchTimer = (value) => {
    if(value === 'pomo'){
      setIsPlaying(false)
      setDuration(pomoSeconds)
      setInitialTime(pomoSeconds)
      setMinuter(25)
    }else if(value === 'short'){
      setIsPlaying(false)
      setDuration(shortSeconds)
      setInitialTime(shortSeconds)
      setMinuter(5)
    }else if(value === 'long'){
      setIsPlaying(false)
      setDuration(longSeconds)
      setInitialTime(longSeconds)
      setMinuter(15)
    }
  }


  const setDurationTime = (value) => {
    if(isPlaying){
      Alert.alert('Warning', 'Timer is still running. Are you sure you want to switch', [ 
        {text: 'YES', onPress: () => switchTimer(value)}
      ])  
    }else if(!isPlaying){
      if(value === 'pomo'){
        setDuration(pomoSeconds)
        setInitialTime(pomoSeconds)
        setMinuter(25)
      }else if(value === 'short'){
        setDuration(shortSeconds)
        setInitialTime(shortSeconds)
        setMinuter(5)
      }else if(value === 'long'){
        setDuration(longSeconds)
        setInitialTime(longSeconds)
        setMinuter(15)
      }
    }
  }

  const submitHandler = (text) => {

    if(text.length > 2) {
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      }) 
      setClick(true)

    }else{
      Alert.alert('OOPS', 'Tasks must be over 3 chars long', [
        {text: 'OK', onPress: () => console.log('Alert closed')}
      ])
    }
    
  }

  const children = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  const timerProps = {
    isPlaying: false,
    // size: 120,
    // strokeWidth: 6
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.pomoSquare}>
        <View style={styles.header}>
          <View style>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "pomo",setDurationTime('pomo'))}
            >
              <Text style={styles.textButtonH}>Pomodoro</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "short", setDurationTime('short'))}
            >
              <Text style={styles.textButtonH}>Short Break</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "long", setDurationTime('long'))}
            >
              <Text style={styles.textButtonH}>Long Break</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timer}>
          <CountdownCircleTimer
            {...timerProps}
            isPlaying={isPlaying}
            key={0}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            initialRemainingTime={initialTime}
            duration={duration}
            colorsTime={[25, 15, 2, 0]}
            onComplete={() => {
              console.log('ON_COMPLETE BEFORE RETURN')
              return [true, 25]
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
          onPress={() => setIsPlaying((prev) => !prev)}
        >
          <Text style={styles.textButton}>{isPlaying ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
     
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // justifyContent: 'space-evenly'
    
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
