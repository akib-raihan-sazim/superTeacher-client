import { useState } from "react";

import { Button, Box } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";

import ClassroomFormModal from "../ClassroomFormModal/ClassroomFomModal";
import { useStyles } from "./CreateClassroomButton.styles";

const CreateClassroomButton: React.FC = () => {
  const { classes } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box className={classes.container}>
      <Button
        color="white"
        leftIcon={<FaPlus size={14} />}
        className={classes.button}
        classNames={{ leftIcon: classes.icon }}
        onClick={handleOpenModal}
      >
        Create a classroom
      </Button>
      <ClassroomFormModal opened={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default CreateClassroomButton;
