import { useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/state";
import { Screens } from "./src/types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import AssignmentsScreen from "./src/components/Assignments";
import CoursesScreen from "./src/components/Courses";
import RecordingsScreen from "./src/components/Recordings/RecordingsScreen";
import HomeScreen from "./src/components/Home/HomeScreen";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(width * 0.75, 300);

const NAV_ITEMS = [
  { screen: Screens.HOME, label: "Home", icon: "🏠" },
  { screen: Screens.ASSIGNMENTS, label: "Assignments", icon: "📝" },
  { screen: Screens.RECORDINGS, label: "Recordings", icon: "📹" },
  { screen: Screens.COURSES, label: "Courses", icon: "🎓" },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screens>(Screens.HOME);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const slideAnimation = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openSideBar = useCallback(() => {
    setIsOpen(true);
    Animated.spring(slideAnimation, {
      toValue: 0,
      tension: 65,
      friction: 11,
      useNativeDriver: true,
    }).start();
  }, [slideAnimation]);

  const closeSideBar = useCallback(
    (callback?: () => void) => {
      Animated.timing(slideAnimation, {
        toValue: -DRAWER_WIDTH,
        duration: 160,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsOpen(false);
        if (callback) {
          callback();
        }
      });
    },
    [slideAnimation],
  );

  const selectScreen = (screen: Screens) => {
    closeSideBar(() => setCurrentScreen(screen));
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case Screens.ASSIGNMENTS:
        return "Assignments";
      case Screens.COURSES:
        return "Courses";
      case Screens.RECORDINGS:
        return "Recordings";
      default:
        return "UniTrack";
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.screen}>
          <View style={styles.topHeader}>
            <Pressable style={styles.hamburgerButton} onPress={openSideBar}>
              <Text style={styles.hamburgerIcon}>☰</Text>
            </Pressable>
            <Text style={styles.topHeaderTitle}>{getScreenTitle()}</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.contentContainer}>{renderScreen()}</View>

          {isOpen && (
            <Pressable style={styles.backdrop} onPress={() => closeSideBar()} />
          )}

          <Animated.View
            pointerEvents={isOpen ? "auto" : "none"}
            style={[
              styles.drawer,
              {
                width: DRAWER_WIDTH,
                transform: [{ translateX: slideAnimation }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>UniTrack</Text>
              <Text style={styles.drawerSubtitle}>Menu</Text>
            </View>

            <View style={styles.menuItems}>
              {NAV_ITEMS.map(({ screen, label, icon }) => {
                const isActive = currentScreen === screen;
                return (
                  <Pressable
                    key={screen}
                    style={[styles.menuItem, isActive && styles.menuItemActive]}
                    onPress={() => selectScreen(screen)}
                  >
                    <Text style={styles.menuItemIcon}>{icon}</Text>
                    <Text
                      style={[
                        styles.menuItemText,
                        isActive && styles.menuItemTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Animated.View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#100B2E",
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1D1645",
  },
  hamburgerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#1D1645",
  },
  hamburgerIcon: {
    fontSize: 20,
    color: "#4DD0E1",
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5F3FF",
  },
  placeholder: {
    width: 36,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10,
  },
  backdropPressable: {
    flex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#171137",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRightWidth: 1,
    borderRightColor: "#2E2469",
    zIndex: 20,
  },
  drawerHeader: {
    marginBottom: 30,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2E2469",
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4DD0E1",
  },
  drawerSubtitle: {
    fontSize: 14,
    color: "#A5A1C8",
    marginTop: 4,
  },
  menuItems: {
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: "#4DD0E120",
    borderWidth: 1,
    borderColor: "#4DD0E1",
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A5A1C8",
  },
  menuItemTextActive: {
    color: "#4DD0E1",
    fontWeight: "bold",
  },
});
