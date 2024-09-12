import { Box, Container, Grid } from "@mantine/core";

import ClassroomDetails from "../../components/ClassroomDetails/ClassroomDetails";
import MessageList from "../../components/MessageList/MessageList";
import SendMessageForm from "../../components/SendMessageForm/SendMessageForm";
import StreamHeader from "../../components/StreamHeader/StreamHeader";
import { IStreamContainerProps } from "./StreamContainer.interface";
import { useStyles } from "./StreamContainer.styles";

const StreamContainer: React.FC<IStreamContainerProps> = ({ classroom }) => {
  const { classes } = useStyles();

  return (
    <Box>
      <StreamHeader classroom={classroom} />
      <Box className={classes.outerContainer}>
        <Container className={classes.innerContainer}>
          <Grid>
            <Grid.Col span={3} className={classes.detailsColumn}>
              <ClassroomDetails classroom={classroom} />
            </Grid.Col>
            <Grid.Col span={12} className={classes.formColumn}>
              <Box className={classes.formWrapper}>
                <SendMessageForm classroomId={classroom.id} />
                <MessageList classroomId={classroom.id} />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default StreamContainer;
