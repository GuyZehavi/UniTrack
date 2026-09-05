import { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../types";

export interface CoursesState {
  items: Course[];
}

const addCourse = (state: CoursesState, action: PayloadAction<string>) => {
  const trimmed = action.payload.trim();
  if (!trimmed || state.items.some((course) => course.name === trimmed)) return;

  state.items.push({ id: Date.now(), name: trimmed });
};

const deleteCourse = (state: CoursesState, action: PayloadAction<number>) => {
  const index = state.items.findIndex((course) => course.id === action.payload);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

export const coursesReducers = { addCourse, deleteCourse };
