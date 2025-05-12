import { cva } from "styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    flexDir: "column",
    alignItems: "center",
    width: "50%",
    paddingTop: "50%",
    height: "0",
    position: "relative",
  },
});

export const canvas = cva({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "75%",
    height: "65%",
    borderRadius: "50%",
    translate: "auto",
    translateX: "-50%",
    translateY: "-50%",
  },
});

export const logo = cva({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "auto",
    translateX: "-50%",
    translateY: "-50%",
    animation: "spin",
  },
});
