import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks";
import { Assignment } from "../../types/index";
import {
  deleteAssignment,
  toggleAssignment,
} from "../../store/slices/assignmentsSlice";
import BaseCard from "../common/BaseCard";

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const dispatch = useAppDispatch();

  return (
    <BaseCard
      title={assignment.title}
      course={assignment.course}
      isCompleted={assignment.isCompleted}
      onToggle={() => dispatch(toggleAssignment(assignment.id))}
      onDelete={() => dispatch(deleteAssignment(assignment.id))}
    >
      <View style={[styles.badge, styles.dateBadge]}>
        <Text style={[styles.badgeText, styles.dateBadgeText]}>
          ⏱️ {assignment.completeBy}
        </Text>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
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
});

export default AssignmentCard;
