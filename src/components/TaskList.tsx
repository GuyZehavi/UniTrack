import { useState } from "react";
import { Text, View, TextInput, Pressable, FlatList } from "react-native";

const TaskList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<string[]>([]);

  const onAddTaskPress = () => {
    setList([...list, input]);
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
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskList;
