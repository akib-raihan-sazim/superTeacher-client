import { createStyles } from "@mantine/core";

import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

const useStyles = createStyles((theme, { userType }: { userType: string }) => ({
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    border: `1px solid ${theme.colors.gray[3]}`,
    marginTop: theme.spacing.lg,
  },
  sender: {
    fontWeight: 500,
    color: userType === EUserRole.TEACHER ? "#4CAF50" : "inherit",
  },
  senderHint: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.gray[6],
  },
  time: {
    color: theme.colors.gray[6],
  },
  downloadButton: {
    backgroundColor: "#151d35",
  },
}));

export default useStyles;
