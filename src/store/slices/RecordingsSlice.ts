import { createSlice } from "@reduxjs/toolkit";
import type { Recording } from "../../types";
import { createEntityReducers, type EntityState } from "../reducers";

const initialState: EntityState<Recording> = {
  items: [],
};

const reducers = createEntityReducers<Recording>();

const recordingsSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {
    addRecording: reducers.addItem,
    deleteRecording: reducers.deleteItem,
    toggleRecording: reducers.toggleItem,
  },
});

export const { addRecording, deleteRecording, toggleRecording } =
  recordingsSlice.actions;
export default recordingsSlice.reducer;
