import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  hideOnMediumAndUp: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));
