import { View, Text, Pressable, StyleSheet } from "react-native";
import { Sortings } from "../../types";
import { colors, typography } from "../../theme";
import { Ionicons } from "@expo/vector-icons";

interface SortBarProps {
  currentSort: Sortings;
  onSortChange: (sort: Sortings) => void;
}

const SortBar: React.FC<SortBarProps> = ({ currentSort, onSortChange }) => {
  return (
    <View style={styles.sortContainer}>
      <Pressable
        style={[
          styles.sortButton,
          currentSort === Sortings.DATE && styles.sortButtonActive,
        ]}
        onPress={() => onSortChange(Sortings.DATE)}
      >
        <Text
          style={[
            styles.sortButtonText,
            currentSort === Sortings.DATE && styles.sortButtonTextActive,
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={15}
            color={currentSort === Sortings.DATE ? colors.text : colors.muted}
          />
          Sort by Date
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.sortButton,
          currentSort === Sortings.COURSE && styles.sortButtonActive,
        ]}
        onPress={() => onSortChange(Sortings.COURSE)}
      >
        <Text
          style={[
            styles.sortButtonText,
            currentSort === Sortings.COURSE && styles.sortButtonTextActive,
          ]}
        >
          <Ionicons
            name="book-outline"
            size={15}
            color={currentSort === Sortings.COURSE ? colors.text : colors.muted}
          />
          Sort by Course
        </Text>
      </Pressable>
    </View>
  );
};

export default SortBar;

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 22,
    padding: 4,
    marginBottom: 12,
    gap: 4,
    alignItems: "stretch",
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 8,
  },
  sortButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  sortButtonText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.regular,
    flexShrink: 1,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  sortButtonTextActive: {
    color: colors.text,
    fontFamily: typography.bold,
  },
});
