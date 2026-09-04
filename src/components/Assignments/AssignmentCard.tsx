import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks/hooks";
import { Assignment } from "../../types/index";
import {
  deleteAssignment,
  toggleAssignment,
} from "../../store/slices/assignmentsSlice";

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.card}>
      <Pressable
        style={[
          styles.checkbox,
          assignment.isCompleted && styles.checkboxChecked,
        ]}
        onPress={() => dispatch(toggleAssignment(assignment.id))}
      >
        {assignment.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      <View style={styles.cardBody}>
        <Text
          style={[
            styles.assignmentTitle,
            assignment.isCompleted && styles.completedText,
          ]}
        >
          {assignment.title || assignment.course}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{assignment.course}</Text>
          </View>

          {assignment.completeBy ? (
            <View style={[styles.badge, styles.dateBadge]}>
              <Text style={[styles.badgeText, styles.dateBadgeText]}>
                🕒 {assignment.completeBy}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={() => dispatch(deleteAssignment(assignment.id))}
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
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#7E75A6",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#65D6E8",
    borderColor: "#65D6E8",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    userSelect: "none",
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F5F3FF",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9E96C2",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: "#30285A",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: "#D2CDEE",
    fontWeight: "500",
    userSelect: "none",
  },
  dateBadge: {
    backgroundColor: "#4B3C2B",
  },
  dateBadgeText: {
    color: "#F5C96A",
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

export default AssignmentCard;
