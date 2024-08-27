import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  navbar: {
    height: "100%",
    padding: theme.spacing.md,
    backgroundColor: "#12182d",
    justifyContent: "space-between",
  },
  logo: {
    marginLeft: theme.spacing.xs,
  },
  logoTitle: {
    fontWeight: 400,
    color: "white",
  },
  dashboardLink: {
    marginLeft: theme.spacing.xs,
  },
  dashboardTitle: {
    fontWeight: 400,
    color: "white",
  },
  userButton: {
    borderColor: "white",
    borderRadius: "5px",
  },
}));
