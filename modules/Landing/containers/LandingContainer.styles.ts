import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors["navy"],
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing.xl,
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing.md,
  },
}));
