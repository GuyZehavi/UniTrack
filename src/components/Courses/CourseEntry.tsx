import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Course } from "../../types";
import { colors, typography } from "../../theme";

interface CourseEntryProps {
  isSelected: boolean;
  course: Course;
  onPress: () => void;
}

const CourseEntry: React.FC<CourseEntryProps> = ({
  isSelected,
  course,
  onPress,
}) => {
  return (
    <Pressable
      style={[styles.courseChip, isSelected && styles.courseChipSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.courseChipText,
          isSelected && styles.courseChipTextSelected,
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {course.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  courseChip: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  courseChipSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  courseChipText: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: typography.regular,
    userSelect: "none",
    maxWidth: 180,
    flexShrink: 1,
  },
  courseChipTextSelected: {
    color: colors.text,
  },
});

export default CourseEntry;
