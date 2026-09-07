import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks";
import { Assignment } from "../../types/index";
import {
  deleteAssignment,
  toggleAssignment,
} from "../../store/slices/assignmentsSlice";
import BaseCard from "../common/BaseCard";
import { formatDateString } from "../../utils/dates";
import { cancelAssignmentReminder } from "../../notifications/notification";
import { colors, typography } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    if (!assignment.isCompleted) {
      cancelAssignmentReminder(assignment.notificationId);
    }
    dispatch(toggleAssignment(assignment.id));
  };

  return (
    <BaseCard
      title={assignment.title}
      course={assignment.course}
      isCompleted={assignment.isCompleted}
      onToggle={handleToggle}
      onDelete={() => dispatch(deleteAssignment(assignment.id))}
    >
      <View style={[styles.badge, styles.dateBadge]}>
        <Text
          style={[styles.badgeText, styles.dateBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Ionicons name="time-outline" size={13} color={colors.amber} />
          {formatDateString(assignment.completeBy)}
        </Text>
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: typography.regular,
    userSelect: "none",
  },
  dateBadge: {
    backgroundColor: "rgba(255, 183, 3, 0.14)",
  },
  dateBadgeText: {
    color: colors.amber,
  },
});

export default AssignmentCard;
