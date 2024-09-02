import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  title: {
    color: "white",
  },
  desktopTitle: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  mobileTitle: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },
}));
