import { Title } from "@mantine/core";

import useStyles from "./WelcomeTitle.styles";

export function WelcomeTitle() {
  const { classes } = useStyles();
  return <Title className={classes.title}>WELCOME TO SUPERTEACHER</Title>;
}
