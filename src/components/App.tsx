import { useState } from "react";
import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/state";
import TaskList from "./TaskList";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}> UniTrack </Text>
            </View>

            <TaskList />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#05d1f5",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d9ff00",
    userSelect: "none",
  },
});
