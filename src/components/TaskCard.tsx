import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useAppDispatch } from "../hooks/hooks";
import { Task } from "../types/index";
import { deleteTask, toggleTask } from "../store/slices/tasksSlice";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.checkbox, task.isCompleted && styles.checkboxChecked]}
        onPress={() => dispatch(toggleTask(task.id))}
      >
        {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      <View style={styles.cardBody}>
        <Text
          style={[styles.taskTitle, task.isCompleted && styles.completedText]}
        >
          {task.title || task.course}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{task.course}</Text>
          </View>

          {task.dueDate ? (
            <View style={[styles.badge, styles.dateBadge]}>
              <Text style={[styles.badgeText, styles.dateBadgeText]}>
                🕒 {task.dueDate}
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
        onPress={() => dispatch(deleteTask(task.id))}
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
    backgroundColor: "#edf888",
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000000",
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
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
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: "#EEF2F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
    userSelect: "none",
  },
  dateBadge: {
    backgroundColor: "#FEF3C7",
  },
  dateBadgeText: {
    color: "#B45309",
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
  deleteButtonText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "bold",
    userSelect: "none",
  },
});

export default TaskCard;
