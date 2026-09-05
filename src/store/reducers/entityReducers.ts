import { PayloadAction } from "@reduxjs/toolkit";

interface Togglable {
  id: number;
  isCompleted: boolean;
}

export interface EntityState<T> {
  items: T[];
}

export const createEntityReducers = <T extends Togglable>() => {
  return {
    addItem: (state: EntityState<T>, action: PayloadAction<T>) => {
      state.items.push(action.payload);
    },
    deleteItem: (state: EntityState<T>, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    toggleItem: (state: EntityState<T>, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.isCompleted = !item.isCompleted;
      }
    },
  };
};
