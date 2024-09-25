export interface CreateAssignmentDto {
  file: File;
  title: string;
  description: string;
  dueDate: Date;
}

export interface AssignmentsResponseDto {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  classroomId?: number;
  dueDate: Date;
}
