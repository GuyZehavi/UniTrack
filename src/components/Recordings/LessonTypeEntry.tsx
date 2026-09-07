import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LessonType } from "../../types";
import { colors, typography } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

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
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={15}
        color="rgba(255, 255, 255, 0.8)"
      />
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
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  selectedChip: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  text: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: typography.regular,
    flexShrink: 1,
  },
  selectedText: {
    color: colors.text,
    fontFamily: typography.bold,
  },
});
