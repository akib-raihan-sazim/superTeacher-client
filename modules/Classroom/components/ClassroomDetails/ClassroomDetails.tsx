import { Paper, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IClassroomDetailsProps } from "./ClassroomDetails.interface";
import { useStyles } from "./ClassroomDetails.styles";

dayjs.extend(utc);

const ClassroomDetails: React.FC<IClassroomDetailsProps> = ({ classroom }) => {
  const { classes } = useStyles();

  return (
    <Paper className={classes.paper}>
      <Stack spacing="xs">
        <Text className={classes.title}>Details</Text>
        <Text className={classes.text}>
          <span className={classes.label}>Subject:</span> {classroom.subject}
        </Text>
        <Text className={classes.text}>
          <span className={classes.label}>Class Time:</span>{" "}
          {dayjs.utc(classroom.classTime).format("hh:mm A")}
        </Text>
        <Text className={classes.text}>
          <span className={classes.label}>Days:</span> {classroom.days.join(", ")}
        </Text>
      </Stack>
    </Paper>
  );
};

export default ClassroomDetails;
