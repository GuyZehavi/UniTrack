export enum LessonType {
  LECTURE = "lec",
  RECITATION = "rec",
}

export interface Task {
  id: number;
  isCompleted: boolean;
  course: string;
  title: string;
  completeBy: string;
}

export interface RecordingTask extends Task {
  isLectureOrRecitation: LessonType;
  lessonDate?: string;
  duration: number;
}

export enum Screens {
  TASKS = "tasks",
  COURSES = "courses",
}
