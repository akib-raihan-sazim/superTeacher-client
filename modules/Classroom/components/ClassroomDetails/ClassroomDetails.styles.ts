import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.gray[3]}`,
    boxShadow: theme.shadows.sm,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontWeight: 700,
  },
  text: {
    fontSize: theme.fontSizes.sm,
  },
}));
