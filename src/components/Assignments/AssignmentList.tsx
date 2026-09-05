import { useState } from "react";
import {
  Text,
  View,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { useAppSelector } from "../../hooks/hooks";
import AssignmentCard from "./AssignmentCard";
import AssignmentModal from "./AssignmentModal";
import AddButton from "../common/AddButton";

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
      <AddButton text="Add Assignment" onPress={onAddAssignmentPress}></AddButton>

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
  listContent: {
    gap: 7,
    paddingBottom: 24,
  },
});
