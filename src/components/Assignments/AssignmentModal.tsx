import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addAssignment } from "../../store/slices/assignmentsSlice";
import { createAssignment } from "../../utils/assignments";
import { Assignment } from "../../types";
import CourseEntry from "../Courses/CourseEntry";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/dates";
import { scheduleAssignmentReminder } from "../../notifications/notification";
import { Ionicons } from "@expo/vector-icons";
import { colors, typography } from "../../theme";

interface AssignmentModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  course?: string;
  date?: string;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
  visible,
  onClose,
}) => {
  const [title, setTitle] = useState<string>("");
  const [completeBy, setCompleteBy] = useState<Date | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.items);

  const onDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCompleteBy(selectedDate);
      // Remove date error if it shows
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: undefined }));
      }
    }
  };

  const handleSave = async () => {
    const currentErrors: FormErrors = {};

    if (!title.trim()) {
      currentErrors.title = "Must set title";
    }
    if (!selectedCourse.trim()) {
      currentErrors.course = "Must choose course";
    }
    if (!completeBy) {
      currentErrors.date = "Must set complete by date";
    }
    // If any error exists, stop without saving
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    const notificationId = await scheduleAssignmentReminder(
      title.trim(),
      selectedCourse.trim(),
      completeBy!,
    );

    const newAssignment: Assignment = {
      ...createAssignment(
        Date.now(),
        currentCourse.trim(),
        title.trim(),
        formatDate(completeBy!),
      ),
      notificationId: notificationId || undefined,
    };

    dispatch(addAssignment(newAssignment));
    close();
  };

  const close = () => {
    onClose();
    setTitle("");
    setSelectedCourse("");
    setErrors({});
    setCompleteBy(null);
  };

  const currentCourse = selectedCourse;

  const getTodayStart = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={close}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle} numberOfLines={1}>
            New Assignment
          </Text>

          <View style={styles.form}>
            {/* Assignment title */}
            <View>
              {errors.title && (
                <Text style={styles.errorText}>* {errors.title}</Text>
              )}
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="Assignment Title"
                placeholderTextColor={colors.muted}
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: undefined }));
                  }
                }}
              />
            </View>

            {/* Choose course */}
            <View>
              {errors.course && (
                <Text style={styles.errorText}>* {errors.course}</Text>
              )}
              <Text style={styles.sectionLabel}>Choose Course:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.coursesRow}
              >
                {courses.map((c) => {
                  return (
                    <CourseEntry
                      key={c.id}
                      course={c}
                      isSelected={c.name === selectedCourse}
                      onPress={() => {
                        setSelectedCourse(c.name);
                        if (errors.course) {
                          setErrors((prev) => ({ ...prev, course: undefined }));
                        }
                      }}
                    />
                  );
                })}
              </ScrollView>
            </View>

            {/* Pick date */}
            <View>
              {errors.date && (
                <Text style={styles.errorText}>* {errors.date}</Text>
              )}
              <Pressable
                style={({ pressed }) => [
                  styles.datePickerButton,
                  errors.date && styles.inputError,
                  pressed && styles.datePickerButtonPressed,
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons
                  name="calendar-outline"
                  size={17}
                  color={colors.muted}
                />
                <Text
                  style={styles.datePickerButtonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {completeBy
                    ? `Complete By: ${formatDate(completeBy)}`
                    : "Choose Complete By Date"}
                </Text>
              </Pressable>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={completeBy || new Date()}
              mode="date"
              display="default"
              minimumDate={getTodayStart()}
              onValueChange={onDateChange}
              onDismiss={() => {
                setCompleteBy(new Date());
                setShowDatePicker(false);
              }}
            />
          )}

          {/* Cancel & Save buttons */}
          <View style={styles.buttonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={close}
            >
              <Text style={styles.cancelButtonText} numberOfLines={1}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText} numberOfLines={1}>
                Save Assignment
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "rgba(18, 14, 28, 0.78)",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 20,
    gap: 16,
    elevation: 5,
    boxShadow: "#05031680",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    fontFamily: typography.bold,
    textAlign: "center",
    userSelect: "none",
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    fontFamily: typography.regular,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 6,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6B6294",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  cancelButtonText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
    userSelect: "none",
    flexShrink: 1,
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.amberSurface,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.5)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  saveButtonText: {
    color: colors.amber,
    fontFamily: typography.bold,
    fontSize: 15,
    fontWeight: "600",
    userSelect: "none",
    flexShrink: 1,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  coursesRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
    userSelect: "none",
  },
  datePickerButton: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerButtonPressed: {
    opacity: 0.8,
    borderColor: "rgba(245, 158, 11, 0.5)",
  },
  datePickerButtonText: {
    color: colors.text,
    fontFamily: typography.regular,
    fontSize: 15,
    fontWeight: "500",
    userSelect: "none",
    flexShrink: 1,
    textAlign: "center",
  },
  inputError: {
    borderColor: "#FF5C8A",
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "left",
  },
});

export default AssignmentModal;
