import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LessonType } from "../../types";

interface LessonTypeEntryProps {
  type: LessonType;
  isSelected: boolean;
  onPress: (type: LessonType) => void;
  icon: string;
}

const LessonTypeEntry: React.FC<LessonTypeEntryProps> = ({
  type,
  onPress,
  isSelected,
  icon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.chip, isSelected && styles.selectedChip]}
      onPress={() => onPress(type)}
    >
      <Text style={styles.icon} numberOfLines={1}>
        {icon}
      </Text>
      <Text
        style={[styles.text, isSelected && styles.selectedText]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
};

export default LessonTypeEntry;

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171137",
    borderWidth: 1,
    borderColor: "#514681",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  selectedChip: {
    backgroundColor: "#352758",
    borderColor: "#8A79D6",
  },
  icon: {
    fontSize: 14,
  },
  text: {
    color: "#A5A1C8",
    fontSize: 13,
    fontWeight: "500",
    flexShrink: 1,
  },
  selectedText: {
    color: "#F5F3FF",
    fontWeight: "600",
  },
});
