import { useCallback, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
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
import { typography } from "./src/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(width * 0.75, 300);

const NAV_ITEMS = [
  { screen: Screens.HOME, label: "Home", icon: "home-outline" },
  {
    screen: Screens.ASSIGNMENTS,
    label: "Assignments",
    icon: "checkbox-outline",
  },
  { screen: Screens.RECORDINGS, label: "Recordings", icon: "videocam-outline" },
  { screen: Screens.COURSES, label: "Courses", icon: "school-outline" },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });
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

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CosmicBackground>
            <SafeAreaView style={styles.screen}>
              <View style={styles.topHeader}>
                <Pressable style={styles.hamburgerButton} onPress={openSideBar}>
                  <Ionicons
                    name="menu-outline"
                    size={22}
                    color="rgba(255, 255, 255, 0.8)"
                  />
                </Pressable>

                <View style={styles.headerBrandContainer}>
                  <Image
                    source={require("./assets/logo-mark.png")}
                    style={styles.headerLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.topHeaderTitle}>{getScreenTitle()}</Text>
                </View>

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
    paddingVertical: 10,
    backgroundColor: "rgba(12, 10, 20, 0.6)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  hamburgerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  headerBrandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  headerLogo: {
    width: 36,
    height: 36,
  },
  topHeaderTitle: {
    fontSize: 20,
    fontFamily: typography.bold,
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
});
