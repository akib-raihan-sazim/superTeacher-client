import { useState } from "react";

import { Button, Box, Text } from "@mantine/core";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineSchedule,
  AiOutlineFileText,
  AiOutlineBook,
} from "react-icons/ai";

import MaterialFormModal from "../MaterialFormModal/MaterialFormModal";
import { useStyles } from "./CreateFileButton.styles";

const CreateFileButton = () => {
  const { classes } = useStyles();
  const [openCreateButton, setOpenCreateButton] = useState(false);
  const [openMaterialModal, setOpenMaterialModal] = useState(false);

  return (
    <Box my="xl">
      <Box className={classes.flexContainer}>
        <Button
          size="md"
          radius="md"
          leftIcon={openCreateButton ? <AiOutlineClose /> : <AiOutlinePlus />}
          variant={openCreateButton ? "outline" : "filled"}
          className={openCreateButton ? classes.outlineButton : classes.button}
          onClick={() => setOpenCreateButton(!openCreateButton)}
        >
          <Text fw={400}>{openCreateButton ? "Close" : "Create"}</Text>
        </Button>

        {openCreateButton && (
          <Box className={classes.innerBox}>
            <Button
              size="md"
              radius="md"
              leftIcon={<AiOutlineSchedule />}
              className={classes.button}
            >
              <Text fw={400}>Schedule Exam</Text>
            </Button>
            <Button
              size="md"
              radius="md"
              leftIcon={<AiOutlineFileText />}
              className={classes.button}
            >
              <Text fw={400}>Add Assignment</Text>
            </Button>
            <Button
              size="md"
              radius="md"
              leftIcon={<AiOutlineBook />}
              className={classes.button}
              onClick={() => setOpenMaterialModal(true)}
            >
              <Text fw={400}>Add Material</Text>
            </Button>
          </Box>
        )}
      </Box>

      <MaterialFormModal opened={openMaterialModal} onClose={() => setOpenMaterialModal(false)} />
    </Box>
  );
};

export default CreateFileButton;
