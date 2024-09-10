import { Classroom } from "../ClassroomCardList/ClassroomCardList.types";

export interface ClassroomFormModalProps {
  opened: boolean;
  onClose: () => void;
  classroom?: Classroom | null;
}
