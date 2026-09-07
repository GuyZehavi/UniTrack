import { View, Text, Pressable, StyleSheet } from "react-native";
import { Sortings } from "../../types";

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
          📅 Sort by Date
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
          📚 Sort by Course
        </Text>
      </Pressable>
    </View>
  );
};

export default SortBar;

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    backgroundColor: "#1D1645",
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
    gap: 6,
    alignItems: "stretch",
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 8,
  },
  sortButtonActive: {
    backgroundColor: "#4DD0E1",
  },
  sortButtonText: {
    color: "#A5A1C8",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  sortButtonTextActive: {
    color: "#100B2E",
    fontWeight: "700",
  },
});
