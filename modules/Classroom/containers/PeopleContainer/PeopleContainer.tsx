import { useGetClassroomStudentsQuery } from "@/shared/redux/rtk-apis/enrollments/enrollments.api";
import { IEnrollment } from "@/shared/redux/rtk-apis/enrollments/enrollments.types";

import PeopleLayout from "../../components/PeopleLayout/PeopleLayout";
import { IPeopleContainerProps } from "./PeopleContainer.interface";

const PeopleContainer: React.FC<IPeopleContainerProps> = ({ classroom }) => {
  const { data: enrollments } = useGetClassroomStudentsQuery(classroom.id);

  const students =
    enrollments?.map((enrollment: IEnrollment) => ({
      id: enrollment.student.id,
      firstName: enrollment.student.user.firstName,
      lastName: enrollment.student.user.lastName,
      email: enrollment.student.user.email,
      userId: enrollment.student.user.id,
    })) || [];

  return <PeopleLayout students={students} classroom={classroom} />;
};

export default PeopleContainer;
