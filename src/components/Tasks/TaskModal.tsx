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
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addTask } from "../../store/slices/tasksSlice";
import { createTask } from "../../utils/tasks";
import { Task } from "../../types";
import CourseEntry from "./CourseEntry";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.items);

  const handleSave = () => {
    if (!title.trim()) return;

    const newTask: Task = createTask(
      Date.now(),
      currentCourse.trim(),
      title.trim(),
      {
        dueDate: dueDate.trim() || undefined,
      },
    );

    dispatch(addTask(newTask));
    close();
  };

  const close = () => {
    onClose();
    setTitle("");
    setSelectedCourse("");
    setDueDate("");
  };

  const currentCourse = selectedCourse;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={close}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>New Task</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              placeholderTextColor="#A5A1C8"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.sectionLabel}>Choose Course:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.coursesRow}
            >
              {courses.map((c) => {
                return (
                  <CourseEntry
                    key={c}
                    course={c}
                    isSelected={c === selectedCourse}
                    onPress={() => setSelectedCourse(c)}
                  />
                );
              })}
            </ScrollView>

            <TextInput
              style={styles.input}
              placeholder="Due Date (e.g. 12/11/26)"
              placeholderTextColor="#A5A1C8"
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>

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
              <Text style={styles.saveButtonText}>Save Task</Text>
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
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D2CDEE",
    userSelect: "none",
  },
});

export default TaskModal;
