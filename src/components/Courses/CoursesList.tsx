import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CourseCard from "./CoursesCard";
import { addCourse } from "../../store/slices/coursesSlice";
import { AddButton, BaseList } from "../common";

const CoursesList: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const courses = useAppSelector((state) => state.courses.items);
  const dispatch = useAppDispatch();

  const onAddCoursePress = () => {
    if (!input.trim()) return;
    dispatch(addCourse(input));

    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          placeholderTextColor="#A5A1C8"
          value={input}
          onChangeText={setInput}
        ></TextInput>

        <AddButton text="Add Course" onPress={onAddCoursePress}></AddButton>
      </View>

      <BaseList> />

      <FlatList
        data={courses}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <CourseCard course={item} />}
        contentContainerStyle={styles.listContent}
      ></FlatList>
    </View>
  );
};

export default CoursesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  listContent: {
    gap: 7,
    paddingBottom: 24,
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
});
