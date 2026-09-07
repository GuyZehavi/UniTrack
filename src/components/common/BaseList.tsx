import { FlatList, StyleSheet, View, Text } from "react-native";
import { colors, typography } from "../../theme";

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
    paddingBottom: 110,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    fontFamily: typography.regular,
    textAlign: "center",
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
