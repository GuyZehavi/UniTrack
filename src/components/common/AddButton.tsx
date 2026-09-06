import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

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
    backgroundColor: "#65D6E8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#65D6E8",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    alignSelf: "center",
    marginBottom: 30,
    minHeight: 44,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#100B2E",
    userSelect: "none",
    flexShrink: 1,
    textAlign: "center",
  },
});
