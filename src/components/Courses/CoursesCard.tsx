import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks";
import { deleteCourse } from "../../store/slices/coursesSlice";
import type { Course } from "../../types";
import { colors, glassSurface, typography } from "../../theme";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.courseName} numberOfLines={1} ellipsizeMode="tail">
          {course.name}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={() => dispatch(deleteCourse(course.id))}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...glassSurface,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  cardBody: {
    flex: 1,
    gap: 6,
    minWidth: 0,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    fontFamily: typography.semibold,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(247, 37, 133, 0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: colors.magenta,
    fontSize: 14,
    fontFamily: typography.bold,
    userSelect: "none",
  },
});

export default CourseCard;
