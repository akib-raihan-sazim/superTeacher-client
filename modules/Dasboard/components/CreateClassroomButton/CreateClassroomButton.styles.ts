import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  button: {
    backgroundColor: "#13192f",
    border: 0,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: "#13193f",
    },
  },
  icon: {
    marginRight: 15,
  },
}));
