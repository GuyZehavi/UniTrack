import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface CosmicBackgroundProps {
  children?: React.ReactNode;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  children,
}: CosmicBackgroundProps) => {
  const pulseAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 2800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnimation]);

  // סקייל מוחשי אך מעודן (6% התרחבות)
  const pulseScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  // עלייה ברורה של הקשת למעלה בזמן הנשיפה
  const pulseTranslateY = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  });

  // זוהר עשיר שנפתח ונסגר
  const glowOpacity = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  return (
    <View style={styles.background}>
      {/* תמונת רקע בסיסית */}
      <Image
        source={require("../../../assets/cosmic-bg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* שכבת הקשת המונפשת - גם סקייל, גם תנועה אנכית וגם זוהר מלא */}
      <AnimatedImage
        source={require("../../../assets/cosmic-bg.jpg")}
        style={[
          styles.backgroundImage,
          {
            opacity: glowOpacity,
            transform: [{ translateY: pulseTranslateY }, { scale: pulseScale }],
          },
        ]}
        resizeMode="cover"
      />

      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

export default CosmicBackground;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#080712",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});
