export interface ISubmissionsModalProps {
  opened: boolean;
  onClose: () => void;
  assignmentId: number;
  classroomId: number;
  dueDate: Date;
}
