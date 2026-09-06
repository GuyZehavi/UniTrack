export interface Assignment {
  id: number;
  isCompleted: boolean;
  course: string;
  title: string;
  completeBy: string;
}

export enum LessonType {
  LECTURE = "Lecture",
  RECITATION = "Recitation",
  LAB = "Lab",
  REVIEW = "Review",
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
  HOME = "home",
}

export interface Course {
  id: number;
  name: string;
  color?: string;
}

export enum Sortings {
  DATE = "date",
  COURSE = "course",
}
