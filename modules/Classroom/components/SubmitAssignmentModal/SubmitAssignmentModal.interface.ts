export interface IAssignmentSubmissionModalProps {
  opened: boolean;
  onClose: () => void;
  assignmentId: number;
  classroomId: number;
  userId: number;
}
