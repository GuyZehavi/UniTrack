import { useState, type JSX } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import type { RootState } from "../../store/state";
import { Task } from "../../types/index";
import { createTask } from "../../utils/tasks";
import { addTask, deleteTask, toggleTask } from "../../store/slices/tasksSlice";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tasks = useAppSelector((state) => state.tasks.items);

  const onAddTaskPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.addTaskButton,
          pressed && styles.addTaskButtonPressed,
        ]}
        onPress={onAddTaskPress}
      >
        <Text style={styles.addTaskButtonText}> Add Task </Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContent}
      ></FlatList>

      <TaskModal visible={isModalOpen} onClose={closeModal}></TaskModal>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTaskButton: {
    backgroundColor: "#65D6E8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#65D6E8",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    alignSelf: "center",
    marginBottom: 30,
  },
  addTaskButtonPressed: {
    opacity: 0.8,
  },
  addTaskButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#100B2E",
    userSelect: "none",
  },
  listContent: {
    gap: 7,
    paddingBottom: 24,
  },
});
