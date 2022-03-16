import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, FlatList  } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import AddTodo from "./Todo";
import TodoItem from "./TodoItem";

export default function Pomodoro({ isClicked }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [minute, setMinuter] = useState(10);
  const [click, setClick] = useState(false)
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);

  const funRef = useRef(null);
  const hourSeconds = 1000;
  const renderTime = (dimension, time) => {
    return (
      <View>
        <View>
          <Text style={styles.text}>{time}</Text>
        </View>
        <View>
          <Text style={styles.textMin}>{dimension}</Text>
        </View>
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
    <View>
      <View style={styles.pomoSquare}>
        <View style={styles.header}>
          <View style>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "pomo")}
            >
              <Text style={styles.textButtonH}>Pomodoro</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "short")}
            >
              <Text style={styles.textButtonH}>Short Break</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonHeader}
              onPress={() => isClicked(true, "long")}
            >
              <Text style={styles.textButtonH}>Long Break</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.timer}>
          <CountdownCircleTimer
            {...timerProps}
            isPlaying={isPlaying}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            initialRemainingTime={hourSeconds}
            duration={hourSeconds}
            colorsTime={[10, 6, 2, 0]}
            // children={children
          >
            {({ remainingTime }) => {
              const hours = Math.floor(remainingTime / 3600);
              const minutes = Math.floor((remainingTime % 3600) / 60);
              const seconds = remainingTime % 60;

              return renderTime("minute", minutes);
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
      <View style={styles.content}>
        <AddTodo  submitHandler={submitHandler} click={click}/>
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <TodoItem item={item} pressHandler={pressHandler}  />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pomoSquare: {
    width: 350,
    height: 350,
    paddingTop: 20,
    paddingBottom: 30,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  timer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // textTransform: 'capitalize',
    fontSize: 60,
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
    backgroundColor: "white",
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
    color: "rgb(217, 85, 80)",
    textAlign: "center",
  },
  textMin: {
    // textTransform: 'capitalize',
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  content: {
    padding: 40,
    // backgroundColor: "pink",
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
