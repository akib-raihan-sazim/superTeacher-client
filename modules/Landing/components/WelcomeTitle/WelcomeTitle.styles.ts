import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  title: {
    color: theme.white,
    fontSize: 48,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },
}));
