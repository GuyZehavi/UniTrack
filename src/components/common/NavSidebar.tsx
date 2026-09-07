import { memo } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Screens } from "../../types";
import { colors, typography } from "../../theme";

interface NavSidebarProps {
  isOpen: boolean;
  slideAnimation: SharedValue<number>;
  backdropAnimation: SharedValue<number>;
  drawerWidth: number;
  currentScreen: Screens;
  navItems: { screen: Screens; label: string; icon: string }[];
  onClose: () => void;
  onSelect: (screen: Screens) => void;
}

export const NavSidebar = memo(
  ({
    isOpen,
    slideAnimation,
    backdropAnimation,
    drawerWidth,
    currentScreen,
    navItems,
    onClose,
    onSelect,
  }: NavSidebarProps) => {
    const drawerAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: slideAnimation.value }],
      };
    });

    const backdropAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: backdropAnimation.value,
      };
    });

    return (
      <View
        pointerEvents={isOpen ? "auto" : "none"}
        style={StyleSheet.absoluteFill}
      >
        <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
          <Pressable
            style={styles.backdropPressable}
            onPress={() => onClose()}
          />
        </Animated.View>

        <Animated.View
          style={[styles.drawer, { width: drawerWidth }, drawerAnimatedStyle]}
        >
          <View style={styles.drawerHeader}>
            <Image
              source={require("../../../assets/logo-mark.png")}
              style={styles.drawerLogo}
              resizeMode="contain"
            />
            <View style={styles.drawerHeaderTextContainer}>
              <Text style={styles.drawerTitle} numberOfLines={1}>
                UniTrack
              </Text>
              <Text style={styles.drawerSubtitle} numberOfLines={1}>
                Menu
              </Text>
            </View>
          </View>

          <View style={styles.menuItems}>
            {navItems.map(({ screen, label, icon }) => {
              const isActive = currentScreen === screen;
              return (
                <Pressable
                  key={screen}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => onSelect(screen)}
                >
                  <Ionicons
                    name={icon as keyof typeof Ionicons.glyphMap}
                    size={21}
                    color={isActive ? colors.amber : "rgba(255, 255, 255, 0.8)"}
                    style={styles.menuItemIcon}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      isActive && styles.menuItemTextActive,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
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
    backgroundColor: colors.glassStrong,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    zIndex: 20,
  },
  drawerHeader: {
    marginBottom: 30,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  drawerLogo: {
    width: 44,
    height: 44,
  },
  drawerHeaderTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  drawerTitle: {
    fontSize: 22,
    fontFamily: typography.bold,
    color: colors.text,
    letterSpacing: -0.6,
  },
  drawerSubtitle: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: typography.regular,
    marginTop: 2,
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
    minHeight: 48,
  },
  menuItemActive: {
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.5)",
  },
  menuItemIcon: {
    width: 24,
    textAlign: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: typography.semibold,
    color: colors.muted,
    flex: 1,
    minWidth: 0,
  },
  menuItemTextActive: {
    color: colors.amber,
    fontFamily: typography.bold,
  },
});
