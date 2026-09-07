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
    backgroundColor: colors.amber,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.amber,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontFamily: typography.semibold,
    fontSize: 15,
    lineHeight: 20,
    color: "#160D22",
    userSelect: "none",
    flexShrink: 1,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
