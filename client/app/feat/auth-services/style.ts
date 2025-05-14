import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    position: "relative",
    width: "100%",
  },
});

export const service = cva({
  base: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    fontSize: "xl",
    fontWeight: "600",
    padding: "15px 20px",
    width: "50%",
    border: "grayBorder",
    borderWidth: "2px",
    borderRadius: "10px",
    transitionDuration: "0.3s",

    _hover: {
      transitionDuration: "0.3s",
      scale: "1.03",
    },
  },
});

export const serviceIcon = cva({
  base: {
    aspectRatio: "1 / 1",
    width: "32px",
  },
});
