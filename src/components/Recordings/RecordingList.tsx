import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks/hooks";
import AddButton from "../common/AddButton";
import { BaseList } from "../common";
import RecordingCard from "./RecordingCard";
import RecordingModal from "./RecordingModal";

const RecordingList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const recordings = useAppSelector((state) => state.recordings.items);

  const onAddPress = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <AddButton text="Add Recording" onPress={onAddPress} />

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
});
