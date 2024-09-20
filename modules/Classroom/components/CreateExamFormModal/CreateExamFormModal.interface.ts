import { TExamFormValues } from "./CreateExamFormModal.helpers";

export interface ICreateExamFormModalProps {
  opened: boolean;
  onClose: () => void;
  classroomId?: number;
  examId?: number;
  examData?: TExamFormValues;
  isEditMode?: boolean;
}
