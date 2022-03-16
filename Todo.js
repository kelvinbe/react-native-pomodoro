import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Button,
} from "react-native";

function AddTodo({ submitHandler, click }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  const clearInputField = (val) => {
    setText("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new task..."
        onChangeText={changeHandler}
        clearButtonMode="always"
        value={text}
      />

      <Button
        onPress={() => {
          submitHandler(text), clearInputField(text);
        }}
        title="add task"
        color="coral"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default AddTodo;
