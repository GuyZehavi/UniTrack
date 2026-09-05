import { createSlice } from "@reduxjs/toolkit";
import type { Assignment } from "../../types";
import { createEntityReducers, type EntityState } from "../reducers";

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
export default assignmentsSlice.reducer;
