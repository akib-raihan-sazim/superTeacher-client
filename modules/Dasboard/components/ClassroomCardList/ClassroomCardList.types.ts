export interface Teacher {
  id: number;
  createdAt: string;
  updatedAt: string;
  highestEducationLevel: string;
  majorSubject: string;
  subjectsToTeach: string[];
}

export interface Classroom {
  id: number;
  title: string;
  subject: string;
  classTime: string;
  createdAt: string;
  updatedAt: string;
  days: string[];
  teacher: Teacher;
}

export interface ClassroomListProps {
  classrooms: Classroom[];
}
