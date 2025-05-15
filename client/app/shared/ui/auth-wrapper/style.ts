import { cva } from "~/styled-system/css";

export const wrapper = cva({
  base: {
    flex: "1 1 auto",
    maxWidth: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    textAlign: "center",
    gap: "30px",
    maxHeight: "100%",
  },
});

export const top = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
});

export const link = cva({
  base: {
    fontSize: "md",
    paddingBottom: "3px",
    lineHeight: "1",
    _hover: {
      paddingBottom: "2px",
      borderBottom: "secondaryBorder",
    },
  },
});
