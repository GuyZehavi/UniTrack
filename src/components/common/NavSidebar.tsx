import { memo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Screens } from "../../types";

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
            <Text style={styles.drawerTitle} numberOfLines={1}>
              UniTrack
            </Text>
            <Text style={styles.drawerSubtitle} numberOfLines={1}>
              Menu
            </Text>
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
                  <Text style={styles.menuItemIcon} numberOfLines={1}>
                    {icon}
                  </Text>
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
    alignItems: "flex-start",
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
    minHeight: 48,
  },
  menuItemActive: {
    backgroundColor: "#4DD0E120",
    borderWidth: 1,
    borderColor: "#4DD0E1",
  },
  menuItemIcon: {
    fontSize: 20,
    width: 24,
    textAlign: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#A5A1C8",
    flex: 1,
    minWidth: 0,
  },
  menuItemTextActive: {
    color: "#4DD0E1",
    fontWeight: "bold",
  },
});
