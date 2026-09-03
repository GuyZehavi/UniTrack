import { useState, type JSX } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import type { RootState } from "../store/state";
import { Task } from "../types/index";
import { createTask } from "../utils/tasks";
import { addTask, deleteTask, toggleTask } from "../store/slices/tasksSlice";
import TaskCard from "./TaskCard";

const TaskList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.items);

  const onAddTaskPress = () => {
    if (!input.trim()) return; // Check if input is only whitespace

    const newTask: Task = createTask(Date.now(), "course", input.trim(), {
      dueDate: "123",
    }); // PLACEHOLDERS

    dispatch(addTask(newTask));
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Insert Task"
          value={input}
          onChangeText={setInput}
        ></TextInput>
        <Pressable
          style={({ pressed }) => [
            styles.addTaskButton,
            pressed && styles.addTaskButtonPressed,
          ]}
          onPress={onAddTaskPress}
        >
          <Text style={styles.addTaskButtonText}> Add Task </Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContent}
      ></FlatList>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#affbfd",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    fontSize: 16,
    color: "#111827",
  },
  addTaskButton: {
    backgroundColor: "#f85050",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskButtonPressed: {
    opacity: 0.8,
  },
  addTaskButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000000",
    userSelect: "none",
  },
  listContent: {
    gap: 7,
    paddingBottom: 24,
  },
});
