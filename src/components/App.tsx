import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/state";
import AssignmentsScreen from "./Assignments";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CoursesScreen from "./Courses";
import { Screens } from "../types";
import RecordingsScreen from "./Recordings/RecordingsScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>(
    Screens.ASSIGNMENTS,
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case Screens.ASSIGNMENTS:
        return <AssignmentsScreen />;
      case Screens.COURSES:
        return <CoursesScreen />;
      case Screens.RECORDINGS:
        return <RecordingsScreen />;
      default:
        return <AssignmentsScreen />;
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.tabBar}>
            <Pressable
              style={[
                styles.tabButton,
                currentScreen === Screens.ASSIGNMENTS && styles.activeTabButton,
              ]}
              onPress={() => setCurrentScreen(Screens.ASSIGNMENTS)}
            >
              <Text
                style={[
                  styles.tabText,
                  currentScreen === Screens.ASSIGNMENTS && styles.activeTabText,
                ]}
              >
                Assignments
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

            <Pressable
              style={[
                styles.tabButton,
                currentScreen === Screens.RECORDINGS && styles.activeTabButton,
              ]}
              onPress={() => setCurrentScreen(Screens.RECORDINGS)}
            >
              <Text
                style={[
                  styles.tabText,
                  currentScreen === Screens.RECORDINGS && styles.activeTabText,
                ]}
              >
                Recordings
              </Text>
            </Pressable>
          </View>

          <View style={styles.contentContainer}>{renderScreen()}</View>
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
