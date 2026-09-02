enum LessonType {
  LECTURE = "lec",
  RECITATION = "rec",
}

export interface Task {
  id: number;
  isCompleted: boolean;
  course: string;
  dueDate?: string;
  completeBy?: string;
}

export interface RecordingTask extends Task {
  isLectureOrRecitation: LessonType;
  lessonDate?: string;
  duration: number;
}
