import { View, Text, Pressable, StyleSheet } from "react-native";
import { Sortings } from "../../types";
import { colors, glassSurface, typography } from "../../theme";

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
    ...glassSurface,
    flexDirection: "row",
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
    backgroundColor: colors.cyan,
  },
  sortButtonText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.semibold,
    flexShrink: 1,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  sortButtonTextActive: {
    color: "#160D22",
    fontFamily: typography.bold,
  },
});
