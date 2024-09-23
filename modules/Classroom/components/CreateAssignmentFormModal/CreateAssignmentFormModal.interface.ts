import { AssignmentsResponseDto } from "@/shared/redux/rtk-apis/assignments/assignments.interface";

export interface IAssignmentFormModalProps {
  opened: boolean;
  onClose: () => void;
  classroomId: number;
  assignment?: AssignmentsResponseDto;
}
