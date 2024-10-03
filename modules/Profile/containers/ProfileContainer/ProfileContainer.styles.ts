import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    marginInline: "5%",
  },
  title: {
    color: "#4CAF50",
    marginTop: theme.spacing.md,
  },
  button: {
    border: "1px solid #4CAF50",
    color: "#4CAF50",
  },
  actionIcon: {
    border: "1px solid #4CAF50",
  },
  editIcon: {
    color: "#4CAF50",
  },
  closeIcon: {
    color: "#4CAF50",
  },
}));
