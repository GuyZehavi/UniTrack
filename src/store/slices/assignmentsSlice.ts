import { createSlice } from "@reduxjs/toolkit";
import { assignmentsReducers, AssignmentsState } from "../reducers";

const initialState: AssignmentsState = {
  items: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: assignmentsReducers,
});

export const { addAssignment, deleteAssignment, toggleAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
