import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks";
import { Recording } from "../../types/index";
import { BaseCard } from "../common";
import {
  deleteRecording,
  toggleRecording,
} from "../../store/slices/RecordingsSlice";
import { formatDateString } from "../../utils/dates";
import { colors, typography } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface RecordingCardProps {
  recording: Recording;
}

const RecordingCard: React.FC<RecordingCardProps> = ({ recording }) => {
  const dispatch = useAppDispatch();

  return (
    <BaseCard
      title={recording.title}
      course={recording.course}
      isCompleted={recording.isCompleted}
      onToggle={() => dispatch(toggleRecording(recording.id))}
      onDelete={() => dispatch(deleteRecording(recording.id))}
    >
      <View style={[styles.badge, styles.typeBadge]}>
        <Text
          style={[styles.badgeText, styles.typeBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Ionicons name="school-outline" size={13} color={colors.text} />
          {recording.lessonType}
        </Text>
      </View>

      <View style={[styles.badge, styles.durationBadge]}>
        <Text
          style={[styles.badgeText, styles.durationBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Ionicons name="time-outline" size={13} color={colors.text} />
          {recording.duration} Hours
        </Text>
      </View>

      <View style={[styles.badge, styles.completeByBadge]}>
        <Text
          style={[styles.badgeText, styles.completeByBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          <Ionicons name="calendar-outline" size={13} color={colors.amber} />
          Complete By: {formatDateString(recording.completeBy)}
        </Text>
      </View>

      {recording.lessonDate ? (
        <View style={[styles.badge, styles.lessonDateBadge]}>
          <Text
            style={[styles.badgeText, styles.lessonDateBadgeText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            <Ionicons name="calendar-outline" size={13} color={colors.text} />
            Original Lesson Date: {formatDateString(recording.lessonDate)}
          </Text>
        </View>
      ) : null}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: typography.regular,
    userSelect: "none",
  },
  typeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  typeBadgeText: {
    color: colors.muted,
  },
  durationBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  durationBadgeText: {
    color: colors.muted,
  },
  completeByBadge: {
    backgroundColor: colors.amberSurface,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  completeByBadgeText: {
    color: colors.amber,
  },
  lessonDateBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  lessonDateBadgeText: {
    color: colors.muted,
  },
});

export default RecordingCard;
