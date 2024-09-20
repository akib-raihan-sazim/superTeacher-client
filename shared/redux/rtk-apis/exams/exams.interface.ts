export interface CreateExamDto {
  title: string;
  instruction: string;
  date: Date;
}

export interface ExamResponseDto {
  id: number;
  title: string;
  instruction: string;
  date: string;
  classroomId: number;
}

export interface UpdateExamDto {
  title?: string;
  instruction?: string;
  date?: string;
}
