import type React from "react";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface CosmicBackgroundProps {
  children?: React.ReactNode;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  children,
}: CosmicBackgroundProps) => {
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [glowAnimation]);

  const glowOpacity = glowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.03, 0.15],
  });

  return (
    <ImageBackground
      source={require("../../../assets/cosmic-bg.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <Animated.View style={[styles.pulsingGlow, { opacity: glowOpacity }]} />

      <View style={styles.contentContainer}>{children}</View>
    </ImageBackground>
  );
};

export default CosmicBackground;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#030207",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.05 }],
  },
  pulsingGlow: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#FFB703",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});
