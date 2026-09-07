import { useCallback, useRef, useState } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/state";
import { Screens } from "./src/types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import AssignmentsScreen from "./src/components/Assignments";
import CoursesScreen from "./src/components/Courses";
import RecordingsScreen from "./src/components/Recordings/RecordingsScreen";
import HomeScreen from "./src/components/Home/HomeScreen";
import { NavSidebar } from "./src/components/common/NavSidebar";
import CosmicBackground from "./src/components/common/CosmicBackground";
import {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PersistGate } from "redux-persist/integration/react";

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

  const slideAnimation = useSharedValue(-DRAWER_WIDTH);
  const backdropAnimation = useSharedValue(0);

  const openSideBar = useCallback(() => {
    setIsOpen(true);
    slideAnimation.value = withSpring(0, {
      damping: 18,
      stiffness: 140,
      mass: 0.8,
    });
    backdropAnimation.value = withTiming(1, {
      duration: 180,
    });
  }, [slideAnimation, backdropAnimation]);

  const closeSideBar = useCallback(
    (callback?: () => void) => {
      const DURATION = 170;

      slideAnimation.value = withTiming(-DRAWER_WIDTH, {
        duration: DURATION,
        easing: Easing.ease,
      });

      backdropAnimation.value = withTiming(0, {
        duration: DURATION,
        easing: Easing.ease,
      });

      setTimeout(() => {
        setIsOpen(false);
        if (callback) {
          callback();
        }
      }, DURATION);
    },
    [slideAnimation, backdropAnimation],
  );

  const selectScreen = useCallback(
    (screen: Screens) => {
      closeSideBar();
      if (screen !== currentScreen) {
        setTimeout(() => {
          setCurrentScreen(screen);
        }, 50);
      }
    },
    [closeSideBar, currentScreen],
  );

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
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CosmicBackground>
            <SafeAreaView style={styles.screen}>
              <View style={styles.topHeader}>
                <Pressable style={styles.hamburgerButton} onPress={openSideBar}>
                  <Text style={styles.hamburgerIcon}>☰</Text>
                </Pressable>
                <Text style={styles.topHeaderTitle}>{getScreenTitle()}</Text>
                <View style={styles.placeholder} />
              </View>

              <View style={styles.contentContainer}>{renderScreen()}</View>

              <NavSidebar
                isOpen={isOpen}
                slideAnimation={slideAnimation}
                backdropAnimation={backdropAnimation}
                drawerWidth={DRAWER_WIDTH}
                currentScreen={currentScreen}
                navItems={NAV_ITEMS}
                onClose={closeSideBar}
                onSelect={selectScreen}
              />
            </SafeAreaView>
          </CosmicBackground>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
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
    backgroundColor: "rgba(10, 8, 25, 0.45)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  hamburgerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  hamburgerIcon: {
    fontSize: 20,
    color: "#E2E8F0",
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
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
