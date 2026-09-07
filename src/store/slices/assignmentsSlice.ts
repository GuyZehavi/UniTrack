import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { Assignment } from "../../types";
import { createEntityReducers, type EntityState } from "../reducers";
import type { RootState } from "../state";
import { parseDate } from "../../utils/dates";

const initialState: EntityState<Assignment> = {
  items: [],
};

const reducers = createEntityReducers<Assignment>();

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: reducers.addItem,
    deleteAssignment: reducers.deleteItem,
    toggleAssignment: reducers.toggleItem,
  },
});

export const { addAssignment, deleteAssignment, toggleAssignment } =
  assignmentsSlice.actions;
export const selectSortedByDateAssignments = createSelector(
  [(state: RootState) => state.assignments.items],
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

export const selectSortedByCourseAssignments = createSelector(
  [(state: RootState) => state.assignments.items],
  (items) => {
    return [...items].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return Number(a.isCompleted) - Number(b.isCompleted);
      }
      return (a.course || "").localeCompare(b.course || "");
    });
  },
);
export default assignmentsSlice.reducer;
