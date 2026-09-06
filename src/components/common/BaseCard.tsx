import { Pressable, StyleSheet, Text, View } from "react-native";

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
        {isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      <View style={styles.cardBody}>
        <Text style={[styles.taskTitle, isCompleted && styles.completedText]}>
          {title}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Course: {course}</Text>
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
  taskTitle: {
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
    flexWrap: "wrap",
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

export default BaseCard;
