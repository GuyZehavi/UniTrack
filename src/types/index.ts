export interface Assignment {
  id: number;
  isCompleted: boolean;
  course: string;
  title: string;
  completeBy: string;
}

export enum LessonType {
  LECTURE = "lec",
  RECITATION = "rec",
}

export interface Recording extends Assignment {
  lessonType: LessonType;
  duration: number;
  lessonDate?: string;
}

export enum Screens {
  ASSIGNMENTS = "assignments",
  COURSES = "courses",
  RECORDINGS = "recordings",
}
