import type React from "react";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography } from "../../theme";

interface DurationPickerProps {
  selectedDuration: number;
  onValueChange: (value: number) => void;
  hasError?: boolean;
}

const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DurationPicker: React.FC<DurationPickerProps> = ({
  selectedDuration,
  onValueChange,
  hasError = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <View style={styles.dropdownContainer}>
      <Pressable
        style={[styles.dropdownTrigger, hasError && styles.triggerError]}
        onPress={() => setIsDropdownOpen((prev) => !prev)}
      >
        <Text
          style={styles.dropdownTriggerText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedDuration
            ? `${selectedDuration} ${selectedDuration === 1 ? "Hour" : "Hours"}`
            : "Choose Duration (Hours)"}
        </Text>
        <Ionicons
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.muted}
        />
      </Pressable>

      {isDropdownOpen && (
        <View style={styles.dropdownList}>
          <ScrollView nestedScrollEnabled style={styles.scrollList}>
            {HOURS.map((hour) => (
              <Pressable
                key={hour}
                style={[
                  styles.dropdownItem,
                  selectedDuration === hour && styles.selectedDropdownItem,
                ]}
                onPress={() => {
                  onValueChange(hour);
                  setIsDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.itemText,
                    selectedDuration === hour && styles.selectedItemText,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {hour} {hour === 1 ? "Hour" : "Hours"}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DurationPicker;

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
    zIndex: 10,
  },
  dropdownTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  triggerError: {
    borderColor: "#FF5C8A",
  },
  dropdownTriggerText: {
    color: colors.text,
    fontSize: 15,
    flex: 1,
    minWidth: 0,
  },
  arrowIcon: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 10,
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: colors.glassStrong,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    maxHeight: 160,
    overflow: "hidden",
  },
  scrollList: {
    paddingVertical: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  selectedDropdownItem: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  itemText: {
    color: colors.muted,
    fontSize: 14,
    flexShrink: 1,
  },
  selectedItemText: {
    color: colors.text,
    fontFamily: typography.bold,
  },
});
