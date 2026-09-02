import { useState } from "react";
import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/state";
import { Task } from "../types/index";
import { createTask } from "../utils/tasks";
import { addTask } from "../store/slices/tasksSlice";

const TaskList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.tasks.items);

  const onAddTaskPress = () => {
    if (!input.trim()) return; // Check if input is only whitespace

    const newTask: Task = createTask(Date.now(), input); // PLACEHOLDERS

    dispatch(addTask(newTask));
    setInput("");
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Instert Task"
      />
      <Pressable onPress={onAddTaskPress}>
        <Text> Add Task </Text>
      </Pressable>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.course}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
