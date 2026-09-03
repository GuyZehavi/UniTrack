import { PayloadAction } from "@reduxjs/toolkit";

export interface CoursesState {
  items: string[];
}

const addCourse = (state: CoursesState, action: PayloadAction<string>) => {
  const trimmed = action.payload.trim();
  if (!trimmed || state.items.includes(trimmed)) return;

  state.items.push(trimmed);
};

const deleteCourse = (state: CoursesState, action: PayloadAction<string>) => {
  const index = state.items.findIndex(
    (course) => course === action.payload.trim(),
  );
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

export const coursesReducers = { addCourse, deleteCourse };
