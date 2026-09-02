import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types";
import { tasksReducers, TasksState } from "../reducers";

const initialState: TasksState = {
  items: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: tasksReducers,
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
