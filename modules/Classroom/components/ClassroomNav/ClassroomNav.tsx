import { Tabs, Title } from "@mantine/core";

import ClassworkContainer from "../../containers/ClassworkContainer/ClassworkContainer";
import PeopleContainer from "../../containers/PeopleContainer/PeopleContainer";
import StreamContainer from "../../containers/StreamContainer/StreamContainer";
import { IClassroomNavProps } from "./ClassroomNav.interface";
import { useStyles } from "./ClassroomNav.styles";

const ClassroomNav: React.FC<IClassroomNavProps> = ({ classroom }) => {
  const { classes } = useStyles();

  return (
    <Tabs defaultValue="stream" mx={"auto"} maw={"97%"}>
      <Tabs.List grow className={classes.tabsList} mx={{ base: 0, xs: "xs", sm: "md", md: "xl" }}>
        <Tabs.Tab value="stream" className={classes.tab}>
          <Title order={5} className={classes.tabTitle}>
            Stream
          </Title>
        </Tabs.Tab>
        <Tabs.Tab value="classwork" className={classes.tab}>
          <Title order={5} className={classes.tabTitle}>
            Classwork
          </Title>
        </Tabs.Tab>
        <Tabs.Tab value="people" className={classes.tab}>
          <Title order={5} className={classes.tabTitle}>
            People
          </Title>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="stream">
        <StreamContainer classroom={classroom} />
      </Tabs.Panel>
      <Tabs.Panel value="classwork">
        <ClassworkContainer classroom={classroom} />
      </Tabs.Panel>
      <Tabs.Panel value="people">
        <PeopleContainer classroom={classroom} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ClassroomNav;
