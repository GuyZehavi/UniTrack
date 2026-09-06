import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { Recording } from "../../types";
import { createEntityReducers, type EntityState } from "../reducers";
import type { RootState } from "../state";
import { parseDate } from "../../utils/dates";

const initialState: EntityState<Recording> = {
  items: [],
};

const reducers = createEntityReducers<Recording>();

const recordingsSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    addRecording: reducers.addItem,
    deleteRecording: reducers.deleteItem,
    toggleRecording: reducers.toggleItem,
  },
});

export const { addRecording, deleteRecording, toggleRecording } =
  recordingsSlice.actions;

export const selectSortedByDateRecordings = createSelector(
  [(state: RootState) => state.recordings.items],
  (items) => {
    return [...items].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return Number(a.isCompleted) - Number(b.isCompleted);
      } else {
        return (
          parseDate(a.completeBy).getTime() - parseDate(b.completeBy).getTime()
        );
      }
    });
  },
);

export const selectSortedByCourseRecordings = createSelector(
  [(state: RootState) => state.recordings.items],
  (items) => {
    return [...items].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return Number(a.isCompleted) - Number(b.isCompleted);
      } else {
        return Number(a.course) - Number(b.course);
      }
    });
  },
);
export default recordingsSlice.reducer;
