import type React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import type { Course } from "../../types";

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
      >
        {course.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  courseChip: {
    backgroundColor: "#2A2352",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#514681",
  },
  courseChipSelected: {
    backgroundColor: "#65D6E8",
    borderColor: "#65D6E8",
  },
  courseChipText: {
    fontSize: 13,
    color: "#D2CDEE",
    fontWeight: "500",
    userSelect: "none",
  },
  courseChipTextSelected: {
    color: "#FFFFFF",
  },
});

export default CourseEntry;
