import { Classroom } from "@/modules/Dasboard/components/ClassroomCardList/ClassroomCardList.types";

import StreamHeader from "../../components/StreamHeader/StreamHeader";

interface StreamContainerProps {
  classroom: Classroom;
}

const StreamContainer: React.FC<StreamContainerProps> = ({ classroom }) => (
  <>
    <StreamHeader classroom={classroom} />
  </>
);

export default StreamContainer;
