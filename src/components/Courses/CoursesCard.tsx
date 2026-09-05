import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteCourse } from "../../store/slices/coursesSlice";
import type { Course } from "../../types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Text style={styles.courseName}>{course.name}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#211A45",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#453A76",
    gap: 12,
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F5F3FF",
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#4A213E",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: "#FF8BA7",
    fontSize: 14,
    fontWeight: "bold",
    userSelect: "none",
  },
});

export default CourseCard;
