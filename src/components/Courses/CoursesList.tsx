import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import CourseCard from "./CoursesCard";
import { addCourse } from "../../store/slices/coursesSlice";

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
          value={input}
          onChangeText={setInput}
        ></TextInput>

        <Pressable
          style={({ pressed }) => [
            styles.addCourseButton,
            pressed && styles.addCourseButtonPressed,
          ]}
          onPress={onAddCoursePress}
        >
          <Text style={styles.addCourseButtonText}> Add Course </Text>
        </Pressable>
      </View>

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
  addCourseButton: {
    backgroundColor: "#65D6E8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#65D6E8",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
  },
  addCourseButtonPressed: {
    opacity: 0.75,
  },
  addCourseButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#100B2E",
    userSelect: "none",
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
