export interface IClassworkResource {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  classroom: number;
}

export interface CreateResourceDto {
  file: File;
  classroomId: number;
  title: string;
  description: string;
}
