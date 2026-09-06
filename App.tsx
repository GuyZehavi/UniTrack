import { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/state";
import AssignmentsScreen from "./src/components/Assignments";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import CoursesScreen from "./src/components/Courses";
import { Screens } from "./src/types";
import RecordingsScreen from "./src/components/Recordings/RecordingsScreen";
import HomeScreen from "./src/components/Home/HomeScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.HOME);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screens.ASSIGNMENTS:
        return <AssignmentsScreen />;
      case Screens.COURSES:
        return <CoursesScreen />;
      case Screens.RECORDINGS:
        return <RecordingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const TABS = [
    { screen: Screens.HOME, label: "Home" },
    { screen: Screens.ASSIGNMENTS, label: "Assignments" },
    { screen: Screens.RECORDINGS, label: "Recordings" },
    { screen: Screens.COURSES, label: "Courses" },
  ];

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.tabBar}>
            {TABS.map(({ screen, label }) => {
              const isActive = currentScreen === screen;
              return (
                <Pressable
                  key={screen}
                  style={[styles.tabButton, isActive && styles.activeTabButton]}
                  onPress={() => setCurrentScreen(screen)}
                >
                  <Text
                    style={[styles.tabText, isActive && styles.activeTabText]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
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
