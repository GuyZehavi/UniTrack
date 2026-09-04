import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "./slices/assignmentsSlice";
import coursesReducer from "./slices/coursesSlice";

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
