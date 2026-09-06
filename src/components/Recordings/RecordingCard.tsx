import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch } from "../../hooks/hooks";
import { Recording } from "../../types/index";
import { BaseCard } from "../common";
import {
  deleteRecording,
  toggleRecording,
} from "../../store/slices/RecordingsSlice";

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
        <Text style={[styles.badgeText, styles.typeBadgeText]}>
          🎓 {recording.lessonType}
        </Text>
      </View>

      <View style={[styles.badge, styles.durationBadge]}>
        <Text style={[styles.badgeText, styles.durationBadgeText]}>
          🕒 {recording.duration} Hours
        </Text>
      </View>

      <View style={[styles.badge, styles.completeByBadge]}>
        <Text style={[styles.badgeText, styles.completeByBadgeText]}>
          ⏱️ Complete By: {recording.completeBy}
        </Text>
      </View>

      {recording.lessonDate ? (
        <View style={[styles.badge, styles.lessonDateBadge]}>
          <Text style={[styles.badgeText, styles.lessonDateBadgeText]}>
            📅 Original Lesson Date: {recording.lessonDate}
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
    fontWeight: "500",
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
    backgroundColor: "#4B3C2B",
  },
  completeByBadgeText: {
    color: "#F5C96A",
  },
  lessonDateBadge: {
    backgroundColor: "#352758",
  },
  lessonDateBadgeText: {
    color: "#C4B5FD",
  },
});

export default RecordingCard;
