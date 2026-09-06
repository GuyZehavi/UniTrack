import type React from "react";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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
        <Text style={styles.dropdownTriggerText}>
          {selectedDuration
            ? `⏱️ ${selectedDuration} ${selectedDuration === 1 ? "Hour" : "Hours"}`
            : "⏱️ Choose Duration (Hours)"}
        </Text>
        <Text style={styles.arrowIcon}>{isDropdownOpen ? "▲" : "▼"}</Text>
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
    backgroundColor: "#171137",
    borderWidth: 1,
    borderColor: "#514681",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  triggerError: {
    borderColor: "#FF5C8A",
  },
  dropdownTriggerText: {
    color: "#F5F3FF",
    fontSize: 15,
  },
  arrowIcon: {
    color: "#A5A1C8",
    fontSize: 12,
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: "#171137",
    borderWidth: 1,
    borderColor: "#514681",
    borderRadius: 10,
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
    backgroundColor: "#352758",
  },
  itemText: {
    color: "#D2CDEE",
    fontSize: 14,
  },
  selectedItemText: {
    color: "#F5F3FF",
    fontWeight: "bold",
  },
});
