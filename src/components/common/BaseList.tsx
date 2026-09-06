import { FlatList, StyleSheet, View, Text } from "react-native";

interface HasId {
  id: number | string;
}

interface BaseListProps<T extends HasId> {
  data: T[];
  renderItem: (item: T) => React.ReactElement | null;
  emptyMessage?: string;
}

const BaseList = <T extends HasId>(props: BaseListProps<T>) => {
  const { data, renderItem, emptyMessage } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderItem(item)}
      contentContainerStyle={[
        styles.listContent,
        data.length === 0 && styles.emptyListContent,
      ]}
      ListEmptyComponent={
        emptyMessage ? (
          <View style={styles.emptyContainer}>
            <Text
              style={styles.emptyText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {emptyMessage}
            </Text>
          </View>
        ) : null
      }
    ></FlatList>
  );
};

export default BaseList;

const styles = StyleSheet.create({
  listContent: {
    gap: 7,
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#9E96C2",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
