import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, glassSurface, typography } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface BaseCardProps {
  title: string;
  course: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  title,
  course,
  isCompleted,
  onToggle,
  onDelete,
  children,
}) => {
  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
        onPress={onToggle}
      >
        {isCompleted && (
          <Ionicons name="checkmark" size={15} color={colors.text} />
        )}
      </Pressable>

      <View style={styles.cardBody}>
        <Text
          style={[styles.taskTitle, isCompleted && styles.completedText]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text
              style={styles.badgeText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Course: {course}
            </Text>
          </View>
          {children}
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={16} color={colors.danger} />
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
    backgroundColor: colors.amberSurface,
    borderColor: "rgba(245, 158, 11, 0.5)",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: typography.bold,
    userSelect: "none",
  },
  cardBody: {
    flex: 1,
    gap: 6,
    minWidth: 0,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    fontFamily: typography.semibold,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    minWidth: 0,
  },
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
    flexShrink: 1,
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
    color: colors.danger,
    fontSize: 14,
    fontFamily: typography.bold,
    userSelect: "none",
  },
});

export default BaseCard;
