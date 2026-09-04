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
import { Assignment } from "../../types/index";
import { createAssignment } from "../../utils/assignments";
import {
  addAssignment,
  deleteAssignment,
  toggleAssignment,
} from "../../store/slices/assignmentsSlice";
import AssignmentCard from "./AssignmentCard";
import AssignmentModal from "./AssignmentModal";

const AssignmentList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const assignments = useAppSelector((state) => state.assignments.items);

  const onAddAssignmentPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.addAssignmentButton,
          pressed && styles.addAssignmentButtonPressed,
        ]}
        onPress={onAddAssignmentPress}
      >
        <Text style={styles.addAssignmentButtonText}> Add Assignment </Text>
      </Pressable>

      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AssignmentCard assignment={item} />}
        contentContainerStyle={styles.listContent}
      ></FlatList>

      <AssignmentModal visible={isModalOpen} onClose={closeModal}></AssignmentModal>
    </View>
  );
};

export default AssignmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addAssignmentButton: {
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
  addAssignmentButtonPressed: {
    opacity: 0.8,
  },
  addAssignmentButtonText: {
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
