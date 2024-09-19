import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  titleButton: {
    color: "white",
  },
  collapseTitle: {
    marginTop: theme.spacing.md,
    color: "white",
  },
  errorTitle: {
    margin: theme.spacing.md,
    fontWeight: 400,
    textAlign: "center",
    color: "red",
  },
  noMaterialsTitle: {
    margin: theme.spacing.md,
    fontWeight: 400,
    textAlign: "center",
    color: "white",
  },
}));
