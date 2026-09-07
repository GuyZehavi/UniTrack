import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { colors, typography } from "../../theme";

interface AddButtonProps {
  text: string;
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.addButton,
        pressed && styles.addButtonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.addButtonText} numberOfLines={1} ellipsizeMode="tail">
        {text}
      </Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.amberSurface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontFamily: typography.bold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.amber,
    userSelect: "none",
    flexShrink: 1,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
