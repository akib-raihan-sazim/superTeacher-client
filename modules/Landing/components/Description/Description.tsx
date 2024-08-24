import { Text } from "@mantine/core";

import useStyles from "./Description.styles";

export function Description() {
  const { classes } = useStyles();
  return (
    <Text className={classes.description} size="xl">
      Where learning and teaching come together!
    </Text>
  );
}
