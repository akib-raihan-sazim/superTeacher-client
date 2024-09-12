import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  noMessagesBox: {
    height: "30vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  noMessagesText: {
    fontSize: 25,
    fontWeight: 500,
    color: "#000435",
  },
}));

export default useStyles;
