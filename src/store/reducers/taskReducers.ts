import { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

export interface TasksState {
  items: Task[];
}

const addTask = (state: TasksState, action: PayloadAction<Task>): void => {
  state.items.push(action.payload);
};

const deleteTask = (state: TasksState, action: PayloadAction<number>): void => {
  const index = state.items.findIndex((task) => task.id === action.payload);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};

const toggleTask = (state: TasksState, action: PayloadAction<number>): void => {
  const task = state.items.find((t) => t.id === action.payload);
  if (task) {
    task.isCompleted = !task.isCompleted;
  }
};

export const tasksReducers = { addTask, deleteTask, toggleTask };
