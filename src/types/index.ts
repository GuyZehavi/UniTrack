export interface Assignment {
  id: number;
  isCompleted: boolean;
  course: string;
  title: string;
  completeBy: string;
}

export enum Screens {
  ASSIGNMENTS = "assignments",
  COURSES = "courses",
}
