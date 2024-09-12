import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  outerContainer: {
    minHeight: "100vh",
    width: "100%",
    padding: `${theme.spacing.sm} 0`,
  },
  innerContainer: {
    maxWidth: "99%",
  },
  detailsColumn: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  formColumn: {
    [theme.fn.largerThan("md")]: {
      flexBasis: "75%",
      maxWidth: "75%",
    },
  },
  formWrapper: {
    background: "white",
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    padding: theme.spacing.md,
  },
}));
