export interface IMessage {
  id: number;
  content: string;
  attachmentURL?: string;
  senderId: number;
  classroomId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessageDto {
  content: string;
  attachmentURL?: string;
  classroomId: number;
}
