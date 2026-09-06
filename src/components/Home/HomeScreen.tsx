import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks";

const HomeScreen: React.FC = () => {
  const assignments = useAppSelector((state) => state.assignments.items);
  const recordings = useAppSelector((state) => state.recordings.items);
  const courses = useAppSelector((state) => state.courses.items);

  const totalTasks =
    assignments.filter((a) => !a.isCompleted).length +
    recordings.filter((r) => !r.isCompleted).length;

  const totalDuration = recordings
    .filter((r) => !r.isCompleted)
    .reduce((sum, recording) => sum + (recording.duration || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks Amount: {totalTasks}</Text>
      <Text style={styles.text}>Courses Amount: {courses.length}</Text>
      <Text style={styles.text}>
        Total Recording Hours To Complete: {totalDuration}
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
  },
  text: {
    color: "#F5F3FF",
    fontSize: 16,
  },
});
