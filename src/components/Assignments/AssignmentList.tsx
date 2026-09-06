import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import AssignmentCard from "./AssignmentCard";
import AssignmentModal from "./AssignmentModal";
import AddButton from "../common/AddButton";
import { BaseList } from "../common";

const AssignmentList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const assignments = useAppSelector((state) => state.assignments.items);

  const onAddPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <AddButton text="Add Assignment" onPress={onAddPress} />

      <BaseList
        data={assignments}
        renderItem={(item) => <AssignmentCard assignment={item} />}
        emptyMessage="No Assignments Yet"
      />

      <AssignmentModal visible={isModalOpen} onClose={closeModal} />
    </View>
  );
};

export default AssignmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 7,
    paddingBottom: 24,
  },
});
