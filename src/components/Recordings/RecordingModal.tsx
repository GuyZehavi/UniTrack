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
import { createRecording } from "../../utils/recordings";
import CourseEntry from "../Courses/CourseEntry";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Recording, LessonType } from "../../types";
import { addRecording } from "../../store/slices/RecordingsSlice";
import LessonTypeEntry from "./LessonTypeEntry";
import DurationPicker from "./DurationPicker";
import { formatDate } from "../../utils/dates";

interface RecordingModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormErrors {
  title?: string;
  course?: string;
  date?: string;
  duration?: string;
  type?: string;
}

type ActivePicker = "completeBy" | "lesson" | null;

const RecordingModal: React.FC<RecordingModalProps> = ({
  visible,
  onClose,
}) => {
  const [title, setTitle] = useState<string>("");
  const [completeBy, setCompleteBy] = useState<Date | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [activePicker, setActivePicker] = useState<ActivePicker>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<LessonType | null>(null);
  const [lessonDate, setLessonDate] = useState<Date | null>(null);

  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.items);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const picker = activePicker;
    setActivePicker(null);
    if (selectedDate) {
      if (picker == "completeBy") {
        setCompleteBy(selectedDate);
        // Remove date error if it shows
        if (errors.date) {
          setErrors((prev) => ({ ...prev, date: undefined }));
        }
      } else if (picker === "lesson") {
        setLessonDate(selectedDate);
      }
    }
  };

  const handleSave = () => {
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
    if (!selectedDuration) {
      currentErrors.duration = "Must set duration";
    }
    if (!selectedType) {
      currentErrors.type = "Must choose lesson type";
    }
    if (Object.keys(currentErrors).length > 0) {
      // If any error exists, stop without saving
      setErrors(currentErrors);
      return;
    }

    let newRecording: Recording;
    if (lessonDate) {
      newRecording = createRecording(
        Date.now(),
        currentCourse.trim(),
        title.trim(),
        formatDate(completeBy!),
        selectedType!,
        selectedDuration,
        formatDate(lessonDate),
      );
    } else {
      newRecording = createRecording(
        Date.now(),
        currentCourse.trim(),
        title.trim(),
        formatDate(completeBy!),
        selectedType!,
        selectedDuration,
      );
    }

    dispatch(addRecording(newRecording));
    close();
  };

  const close = () => {
    onClose();
    setTitle("");
    setSelectedCourse("");
    setActivePicker(null);
    setErrors({});
    setCompleteBy(null);
    setSelectedDuration(0);
    setSelectedType(null);
    setLessonDate(null);
  };

  const currentCourse = selectedCourse;
  const LESSON_TYPES: { type: LessonType; icon: string }[] = [
    { type: LessonType.LECTURE, icon: "🤓" },
    { type: LessonType.RECITATION, icon: "📝" },
    { type: LessonType.LAB, icon: "🔬" },
    { type: LessonType.REVIEW, icon: "💡" },
  ];

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
          <Text style={styles.modalTitle}>New Recording</Text>

          <View style={styles.form}>
            {/* Recording title */}
            <View>
              {errors.title && (
                <Text style={styles.errorText}>* {errors.title}</Text>
              )}
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="Recording Title"
                placeholderTextColor="#A5A1C8"
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

            {/* Choose lesson type */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Choose Lesson Type:</Text>
                {errors.type && (
                  <Text style={styles.errorTextInline}>* {errors.type}</Text>
                )}
              </View>

              <View
                style={[
                  styles.lessonTypesContainer,
                  errors.type && styles.lessonTypesContainerError,
                ]}
              >
                {LESSON_TYPES.map(({ type, icon }) => (
                  <LessonTypeEntry
                    key={type}
                    type={type}
                    icon={icon}
                    isSelected={selectedType === type}
                    onPress={(selected) => {
                      setSelectedType(selected);
                      if (errors.type) {
                        setErrors((prev) => ({ ...prev, type: undefined }));
                      }
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Pick complete by date */}
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
                onPress={() => setActivePicker("completeBy")}
              >
                <Text style={styles.datePickerButtonText}>
                  {completeBy
                    ? `📅 Complete By: ${formatDate(completeBy)}`
                    : "📅 Choose Due Date"}
                </Text>
              </Pressable>
            </View>

            {/* Choose duration */}
            <DurationPicker
              selectedDuration={selectedDuration}
              hasError={!!errors.duration}
              onValueChange={(value) => {
                setSelectedDuration(value);
                if (errors.duration) {
                  setErrors((prev) => ({ ...prev, duration: undefined }));
                }
              }}
            />

            {/* Pick lesson date (optional) */}
            <View>
              <Pressable
                style={({ pressed }) => [
                  styles.datePickerButton,
                  pressed && styles.datePickerButtonPressed,
                ]}
                onPress={() => setActivePicker("lesson")}
              >
                <Text style={styles.datePickerButtonText}>
                  {lessonDate
                    ? `📅 Lesson Date: ${formatDate(lessonDate)}`
                    : "📅 Choose Lesson Date"}
                </Text>
              </Pressable>
            </View>
          </View>

          {activePicker && (
            <DateTimePicker
              value={
                activePicker === "completeBy"
                  ? completeBy || getTodayStart()
                  : lessonDate || new Date()
              }
              mode="date"
              display="default"
              minimumDate={
                activePicker === "completeBy" ? getTodayStart() : undefined
              }
              maximumDate={activePicker === "lesson" ? new Date() : undefined}
              onValueChange={onDateChange}
              onDismiss={() => setActivePicker(null)}
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
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Recording</Text>
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
    backgroundColor: "#08051ACC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#211A45",
    borderRadius: 14,
    padding: 20,
    gap: 16,
    elevation: 5,
    boxShadow: "#05031680",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F5F3FF",
    textAlign: "center",
    userSelect: "none",
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: "#171137",
    borderWidth: 1,
    borderColor: "#514681",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#F5F3FF",
  },
  buttonsRow: {
    flexDirection: "row",
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
  },
  cancelButtonText: {
    color: "#D2CDEE",
    fontSize: 15,
    fontWeight: "600",
    userSelect: "none",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#65D6E8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#100B2E",
    fontSize: 15,
    fontWeight: "600",
    userSelect: "none",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  coursesRow: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  datePickerButton: {
    backgroundColor: "#1D1645",
    borderWidth: 1,
    borderColor: "#2E2469",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerButtonPressed: {
    opacity: 0.8,
    borderColor: "#4DD0E1",
  },
  datePickerButtonText: {
    color: "#E2E8F0",
    fontSize: 15,
    fontWeight: "500",
    userSelect: "none",
  },
  inputError: {
    borderColor: "#FF5C8A",
  },
  errorText: {
    color: "#FF5C8A",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "left",
  },
  sectionContainer: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D2CDEE",
    userSelect: "none",
  },
  errorTextInline: {
    color: "#FF5C8A",
    fontSize: 12,
    fontWeight: "600",
  },
  lessonTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 4,
    borderRadius: 12,
  },
  lessonTypesContainerError: {
    borderWidth: 1,
    borderColor: "#FF5C8A",
    backgroundColor: "#31142B40",
  },
});

export default RecordingModal;
