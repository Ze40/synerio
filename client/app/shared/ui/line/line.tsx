import { memo, useEffect, useState } from "react";

interface LineProps {
  length: number;
  orientation?: "horizontal" | "vertical";
  weigth: number; // возможно, опечатка? Скорее всего должно быть "weight"
  color: string;
}

const Line = memo(({ length, orientation = "horizontal", weigth, color }: LineProps) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (orientation === "horizontal") {
      setStyle({
        width: `${length}px`,
        height: `${weigth}px`,
        backgroundColor: color,
      });
    } else {
      setStyle({
        height: `${length}px`,
        width: `${weigth}px`,
        backgroundColor: color,
      });
    }
  }, [length, orientation, weigth, color]);

  return <div style={style} />;
});

export default Line;
