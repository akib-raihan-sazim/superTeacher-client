export interface IAssignmentCardProps {
  assignment: {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    fileUrl: string;
  };
  classroomId: number;
}
