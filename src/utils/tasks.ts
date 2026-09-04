import { Task } from "../types";

export const createTask = (
  id: number,
  course: string,
  title: string,
  completeBy: string,
): Task => {
  return {
    id: id,
    course: course,
    title: title,
    isCompleted: false,
    completeBy: completeBy,
  };
};
