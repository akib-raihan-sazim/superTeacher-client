import { Box, Divider, Title } from "@mantine/core";

import CreateFileButton from "../../components/CreateFileButton/CreateFileButton";
import { IClassworkContainerProps } from "./ClassworkContainer.interface";

const ClassworkContainer: React.FC<IClassworkContainerProps> = ({ classroom }) => (
  <Box py="sm" px={{ base: 0, sm: "xl" }}>
    <CreateFileButton classroom={classroom} />
    <Title order={2} c={"white"}>
      Uploaded Resources
    </Title>
    <Divider my="sm" />
  </Box>
);

export default ClassworkContainer;
