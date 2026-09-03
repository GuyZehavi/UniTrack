import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/state";
import TasksScreen from "./Tasks";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CoursesScreen from "./Courses";
import { Screens } from "../types";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.TASKS);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.tabBar}>
            <Pressable
              style={[
                styles.tabButton,
                currentScreen === Screens.TASKS && styles.activeTabButton,
              ]}
              onPress={() => setCurrentScreen(Screens.TASKS)}
            >
              <Text
                style={[
                  styles.tabText,
                  currentScreen === Screens.TASKS && styles.activeTabText,
                ]}
              >
                Tasks
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabButton,
                currentScreen === Screens.COURSES && styles.activeTabButton,
              ]}
              onPress={() => setCurrentScreen(Screens.COURSES)}
            >
              <Text
                style={[
                  styles.tabText,
                  currentScreen === Screens.COURSES && styles.activeTabText,
                ]}
              >
                Courses
              </Text>
            </Pressable>
          </View>

          <View style={styles.contentContainer}>
            {currentScreen === Screens.TASKS ? (
              <TasksScreen />
            ) : (
              <CoursesScreen />
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#100B2E",
    alignItems: "center",
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1D1645",
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    width: "90%",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: "#4DD0E1",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#A5A1C8",
    userSelect: "none",
  },
  activeTabText: {
    color: "#100B2E",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});
