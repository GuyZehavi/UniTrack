import { Task } from "../types";

export const createTask = (
  id: number,
  course: string,
  title: string,
  overrides?: Partial<Task>,
): Task => {
  return {
    id: id,
    course: course,
    title: title,
    isCompleted: false,
    ...overrides,
  };
};
