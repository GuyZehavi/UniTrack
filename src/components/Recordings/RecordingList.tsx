import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import AddButton from "../common/AddButton";
import { BaseList } from "../common";
import RecordingCard from "./RecordingCard";
import RecordingModal from "./RecordingModal";
import { Sortings } from "../../types";
import {
  selectSortedByCourseRecordings,
  selectSortedByDateRecordings,
} from "../../store/slices/RecordingsSlice";
import SortBar from "../common/SortBar";

const RecordingList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState<Sortings>(Sortings.DATE);

  const recordings = useAppSelector(
    sorting === Sortings.DATE
      ? selectSortedByDateRecordings
      : selectSortedByCourseRecordings,
  );

  const onAddPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButtonWrapper}>
        <AddButton text="Add Recording" onPress={onAddPress} />
      </View>

      <SortBar currentSort={sorting} onSortChange={setSorting} />

      <BaseList
        data={recordings}
        renderItem={(item) => <RecordingCard recording={item} />}
        emptyMessage="No Recordings Yet"
      />

      <RecordingModal visible={isModalOpen} onClose={closeModal} />
    </View>
  );
};

export default RecordingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButtonWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
});
