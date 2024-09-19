import { IClassworkResource } from "@/shared/redux/rtk-apis/classworks/classworks.interface";

export interface IMaterialFormModalProps {
  opened: boolean;
  onClose: () => void;
  classroomId: number;
  resource?: IClassworkResource;
}
