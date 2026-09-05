import { Recording, LessonType } from "../types";

export const createRecording = (
  id: number,
  course: string,
  title: string,
  completeBy: string,
  lessonType: LessonType,
  duration: number,
  lessonDate?: string,
): Recording => {
  return {
    id: id,
    course: course,
    title: title,
    isCompleted: false,
    completeBy: completeBy,
    lessonType: lessonType,
    duration: duration,
    lessonDate: lessonDate,
  };
};
