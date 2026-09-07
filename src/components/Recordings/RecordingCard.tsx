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
          🎓 {recording.lessonType}
        </Text>
      </View>

      <View style={[styles.badge, styles.durationBadge]}>
        <Text
          style={[styles.badgeText, styles.durationBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          🕒 {recording.duration} Hours
        </Text>
      </View>

      <View style={[styles.badge, styles.completeByBadge]}>
        <Text
          style={[styles.badgeText, styles.completeByBadgeText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ⏱️ Complete By: {formatDateString(recording.completeBy)}
        </Text>
      </View>

      {recording.lessonDate ? (
        <View style={[styles.badge, styles.lessonDateBadge]}>
          <Text
            style={[styles.badgeText, styles.lessonDateBadgeText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            📅 Original Lesson Date: {formatDateString(recording.lessonDate)}
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
    backgroundColor: "#1F2F52",
  },
  typeBadgeText: {
    color: "#7FB2F0",
  },
  durationBadge: {
    backgroundColor: "#193E3C",
  },
  durationBadgeText: {
    color: "#6EE7B7",
  },
  completeByBadge: {
    backgroundColor: "rgba(255, 183, 3, 0.14)",
  },
  completeByBadgeText: {
    color: colors.amber,
  },
  lessonDateBadge: {
    backgroundColor: "#352758",
  },
  lessonDateBadgeText: {
    color: "#C4B5FD",
  },
});

export default RecordingCard;
