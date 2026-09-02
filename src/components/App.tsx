import { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/state";
import TaskList from "./TaskList";

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>Task List</Text>
        <TaskList />
      </View>
    </Provider>
  );
}
