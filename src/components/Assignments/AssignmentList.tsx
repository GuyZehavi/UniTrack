import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import AssignmentCard from "./AssignmentCard";
import AssignmentModal from "./AssignmentModal";
import AddButton from "../common/AddButton";
import { BaseList } from "../common";
import { Sortings } from "../../types";
import {
  selectSortedByCourseAssignments,
  selectSortedByDateAssignments,
} from "../../store/slices/assignmentsSlice";
import SortBar from "../common/SortBar";

const AssignmentList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sortings>(Sortings.DATE);

  const assignments = useAppSelector(
    sorting === Sortings.DATE
      ? selectSortedByDateAssignments
      : selectSortedByCourseAssignments,
  );

  const onAddPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <AddButton text="Add Assignment" onPress={onAddPress} />

      <SortBar currentSort={sorting} onSortChange={setSorting} />

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
});
