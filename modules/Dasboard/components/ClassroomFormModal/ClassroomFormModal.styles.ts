import { MantineTheme } from "@mantine/core";

export const useClassroomFormModalStyles = (theme: MantineTheme) => ({
  title: {
    color: "#61c177",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    label: {
      color: "#61c177",
    },
  },
  button: {
    background: "#49b359",
  },
  buttonGroup: {
    justifyContent: "flex-end",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.sm,
  },
});
