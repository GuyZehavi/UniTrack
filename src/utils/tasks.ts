import { Task } from "../types";

export const createTask = (
  id: number,
  course: string,
  overrides?: Partial<Task>,
): Task => {
  return {
    id: id,
    course: course,
    isCompleted: false,
    ...overrides,
  };
};
