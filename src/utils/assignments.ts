import { Assignment } from "../types";

export const createAssignment = (
  id: number,
  course: string,
  title: string,
  completeBy: string,
): Assignment => {
  return {
    id: id,
    course: course,
    title: title,
    isCompleted: false,
    completeBy: completeBy,
  };
};
