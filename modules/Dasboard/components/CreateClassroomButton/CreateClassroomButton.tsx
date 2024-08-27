import React from "react";

import { Button, Box } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";

import { useStyles } from "./CreateClassroomButton.styles";

const CreateClassroomButton: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Button
        color="white"
        leftIcon={<FaPlus size={14} />}
        className={classes.button}
        classNames={{ leftIcon: classes.icon }}
      >
        Create a classroom
      </Button>
    </Box>
  );
};

export default CreateClassroomButton;
