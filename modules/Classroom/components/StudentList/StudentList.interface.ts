export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentListProps {
  students: Student[];
}
