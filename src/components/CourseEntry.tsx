import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface CourseEntryProps {
  isSelected: boolean;
  course: string;
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
      >
        {course}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  courseChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  courseChipSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  courseChipText: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
    userSelect: "none",
  },
  courseChipTextSelected: {
    color: "#FFFFFF",
  },
});

export default CourseEntry;
