import { Box, Divider, Title } from "@mantine/core";

import CreateFileButton from "../../components/CreateFileButton/CreateFileButton";

const ClassworkContainer = () => (
  <Box py="sm" px={{ base: 0, sm: "xl" }}>
    <CreateFileButton />
    <Title order={2} c={"white"}>
      Uploaded Resources
    </Title>
    <Divider my="sm" />
  </Box>
);

export default ClassworkContainer;
