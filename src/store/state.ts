import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "./slices/assignmentsSlice";
import coursesReducer from "./slices/coursesSlice";
import recordingsReducer from "./slices/RecordingsSlice";

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    courses: coursesReducer,
    recordings: recordingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
