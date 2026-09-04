import { PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "../../types";

export interface AssignmentsState {
  items: Assignment[];
}

const addAssignment = (state: AssignmentsState, action: PayloadAction<Assignment>) => {
  state.items.push(action.payload);
};

const deleteAssignment = (state: AssignmentsState, action: PayloadAction<number>) => {
  const index = state.items.findIndex((assignment) => assignment.id === action.payload);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

const toggleAssignment = (state: AssignmentsState, action: PayloadAction<number>) => {
  const assignment = state.items.find((item) => item.id === action.payload);
  if (assignment) {
    assignment.isCompleted = !assignment.isCompleted;
  }
};

export const assignmentsReducers = {
  addAssignment,
  deleteAssignment,
  toggleAssignment,
};
