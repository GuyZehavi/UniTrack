import { createSlice } from "@reduxjs/toolkit";
import { coursesReducers, type CoursesState } from "../reducers/courseReducers";

const initialState: CoursesState = {
  items: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: coursesReducers,
});

export const { addCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
