import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    textAlign: "start",
  },
});

export const inputBox = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    position: "relative",
  },
  variants: {
    variant: {
      border: {
        border: "grayBorder",
        padding: "15px",
        borderRadius: "10px",
      },
    },
    correct: {
      true: {
        borderColor: "correct",
        color: "correct",
      },
      false: {
        borderColor: "error",
        color: "error",
      },
      undefined: {},
    },
  },
});

export const label = cva({
  base: {
    fontSize: "md",
    fontWeight: 400,
    marginLeft: "5px",
  },
});

export const input = cva({
  base: {
    width: "100%",
    outline: "none",
    fontSize: "inherit",
    fontWeight: "inherit",
    color: "inherit",
  },
});

export const error = cva({
  base: {
    color: "error",
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    paddingLeft: "5px",
    paddingTop: "3px",
  },
});
